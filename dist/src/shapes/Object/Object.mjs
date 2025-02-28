import { defineProperty as _defineProperty, objectSpread2 as _objectSpread2, objectWithoutProperties as _objectWithoutProperties, toPropertyKey as _toPropertyKey } from '../../../_virtual/_rollupPluginBabelHelpers.mjs';
import { cache } from '../../cache.mjs';
import { config } from '../../config.mjs';
import { ALIASING_LIMIT, VERSION, iMatrix, CENTER, LEFT, TOP } from '../../constants.mjs';
import { AnimatableObject } from './AnimatableObject.mjs';
import { Point } from '../../Point.mjs';
import { Shadow } from '../../Shadow.mjs';
import { classRegistry } from '../../ClassRegistry.mjs';
import { runningAnimations } from '../../util/animation/AnimationRegistry.mjs';
import { cloneDeep } from '../../util/internals/cloneDeep.mjs';
import { capValue } from '../../util/misc/capValue.mjs';
import { createCanvasElement, toDataURL } from '../../util/misc/dom.mjs';
import { qrDecompose, invertTransform } from '../../util/misc/matrix.mjs';
import { enlivenObjectEnlivables } from '../../util/misc/objectEnlive.mjs';
import { saveObjectTransform, resetObjectTransform } from '../../util/misc/objectTransforms.mjs';
import { sendObjectToPlane } from '../../util/misc/planeChange.mjs';
import { pick, pickBy } from '../../util/misc/pick.mjs';
import { toFixed } from '../../util/misc/toFixed.mjs';
import { StaticCanvas } from '../../canvas/StaticCanvas.mjs';
import { isTextObject, isSerializableFiller, isFiller } from '../../util/typeAssertions.mjs';
import { stateProperties, cacheProperties, fabricObjectDefaultValues } from './defaultValues.mjs';
import { getDevicePixelRatio, getEnv } from '../../env/index.mjs';
import { log } from '../../util/internals/console.mjs';

const _excluded = ["type"],
  _excluded2 = ["extraParam"];
/**
 * Root object class from which all 2d shape classes inherit from
 * @tutorial {@link http://fabricjs.com/fabric-intro-part-1#objects}
 *
 * @fires added
 * @fires removed
 *
 * @fires selected
 * @fires deselected
 *
 * @fires rotating
 * @fires scaling
 * @fires moving
 * @fires skewing
 * @fires modified
 *
 * @fires mousedown
 * @fires mouseup
 * @fires mouseover
 * @fires mouseout
 * @fires mousewheel
 * @fires mousedblclick
 *
 * @fires dragover
 * @fires dragenter
 * @fires dragleave
 * @fires drop
 */
class FabricObject extends AnimatableObject {
  static getDefaults() {
    return _objectSpread2({}, FabricObject.ownDefaults);
  }

  /**
   * The class type. Used to identify which class this is.
   * This is used for serialization purposes and internally it can be used
   * to identify classes. As a developer you could use `instance of Class`
   * but to avoid importing all the code and blocking tree shaking we try
   * to avoid doing that.
   */

  /**
   * Legacy identifier of the class. Prefer using utils like isType or instanceOf
   * Will be removed in fabric 7 or 8.
   * The setter exists because is very hard to catch all the ways in which a type value
   * could be set in the instance
   * @TODO add sustainable warning message
   * @type string
   * @deprecated
   */
  get type() {
    const name = this.constructor.type;
    if (name === 'FabricObject') {
      return 'object';
    }
    return name.toLowerCase();
  }
  set type(value) {
    log('warn', 'Setting type has no effect', value);
  }

  /**
   * Constructor
   * @param {Object} [options] Options object
   */
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    /**
     * Quick access for the _cacheCanvas rendering context
     * This is part of the objectCaching feature
     * since 1.7.0
     * @type boolean
     * @default undefined
     * @private
     */
    _defineProperty(this, "_cacheContext", null);
    Object.assign(this, this.constructor.getDefaults());
    this.setOptions(options);
  }

  /**
   * Create a the canvas used to keep the cached copy of the object
   * @private
   */
  _createCacheCanvas() {
    this._cacheCanvas = createCanvasElement();
    this._cacheContext = this._cacheCanvas.getContext('2d');
    this._updateCacheCanvas();
    // if canvas gets created, is empty, so dirty.
    this.dirty = true;
  }

  /**
   * Limit the cache dimensions so that X * Y do not cross config.perfLimitSizeTotal
   * and each side do not cross fabric.cacheSideLimit
   * those numbers are configurable so that you can get as much detail as you want
   * making bargain with performances.
   * @param {Object} dims
   * @param {Object} dims.width width of canvas
   * @param {Object} dims.height height of canvas
   * @param {Object} dims.zoomX zoomX zoom value to unscale the canvas before drawing cache
   * @param {Object} dims.zoomY zoomY zoom value to unscale the canvas before drawing cache
   * @return {Object}.width width of canvas
   * @return {Object}.height height of canvas
   * @return {Object}.zoomX zoomX zoom value to unscale the canvas before drawing cache
   * @return {Object}.zoomY zoomY zoom value to unscale the canvas before drawing cache
   */
  _limitCacheSize(dims) {
    const width = dims.width,
      height = dims.height,
      max = config.maxCacheSideLimit,
      min = config.minCacheSideLimit;
    if (width <= max && height <= max && width * height <= config.perfLimitSizeTotal) {
      if (width < min) {
        dims.width = min;
      }
      if (height < min) {
        dims.height = min;
      }
      return dims;
    }
    const ar = width / height,
      [limX, limY] = cache.limitDimsByArea(ar),
      x = capValue(min, limX, max),
      y = capValue(min, limY, max);
    if (width > x) {
      dims.zoomX /= width / x;
      dims.width = x;
      dims.capped = true;
    }
    if (height > y) {
      dims.zoomY /= height / y;
      dims.height = y;
      dims.capped = true;
    }
    return dims;
  }

  /**
   * Return the dimension and the zoom level needed to create a cache canvas
   * big enough to host the object to be cached.
   * @private
   * @return {Object}.x width of object to be cached
   * @return {Object}.y height of object to be cached
   * @return {Object}.width width of canvas
   * @return {Object}.height height of canvas
   * @return {Object}.zoomX zoomX zoom value to unscale the canvas before drawing cache
   * @return {Object}.zoomY zoomY zoom value to unscale the canvas before drawing cache
   */
  _getCacheCanvasDimensions() {
    const objectScale = this.getTotalObjectScaling(),
      // calculate dimensions without skewing
      dim = this._getTransformedDimensions({
        skewX: 0,
        skewY: 0
      }),
      neededX = dim.x * objectScale.x / this.scaleX,
      neededY = dim.y * objectScale.y / this.scaleY;
    return {
      // for sure this ALIASING_LIMIT is slightly creating problem
      // in situation in which the cache canvas gets an upper limit
      // also objectScale contains already scaleX and scaleY
      width: neededX + ALIASING_LIMIT,
      height: neededY + ALIASING_LIMIT,
      zoomX: objectScale.x,
      zoomY: objectScale.y,
      x: neededX,
      y: neededY
    };
  }

  /**
   * Update width and height of the canvas for cache
   * returns true or false if canvas needed resize.
   * @private
   * @return {Boolean} true if the canvas has been resized
   */
  _updateCacheCanvas() {
    const canvas = this._cacheCanvas,
      context = this._cacheContext,
      dims = this._limitCacheSize(this._getCacheCanvasDimensions()),
      minCacheSize = config.minCacheSideLimit,
      width = dims.width,
      height = dims.height,
      zoomX = dims.zoomX,
      zoomY = dims.zoomY,
      dimensionsChanged = width !== this.cacheWidth || height !== this.cacheHeight,
      zoomChanged = this.zoomX !== zoomX || this.zoomY !== zoomY;
    if (!canvas || !context) {
      return false;
    }
    let drawingWidth,
      drawingHeight,
      shouldRedraw = dimensionsChanged || zoomChanged,
      additionalWidth = 0,
      additionalHeight = 0,
      shouldResizeCanvas = false;
    if (dimensionsChanged) {
      const canvasWidth = this._cacheCanvas.width,
        canvasHeight = this._cacheCanvas.height,
        sizeGrowing = width > canvasWidth || height > canvasHeight,
        sizeShrinking = (width < canvasWidth * 0.9 || height < canvasHeight * 0.9) && canvasWidth > minCacheSize && canvasHeight > minCacheSize;
      shouldResizeCanvas = sizeGrowing || sizeShrinking;
      if (sizeGrowing && !dims.capped && (width > minCacheSize || height > minCacheSize)) {
        additionalWidth = width * 0.1;
        additionalHeight = height * 0.1;
      }
    }
    if (isTextObject(this) && this.path) {
      shouldRedraw = true;
      shouldResizeCanvas = true;
      // IMHO in those lines we are using zoomX and zoomY not the this version.
      additionalWidth += this.getHeightOfLine(0) * this.zoomX;
      additionalHeight += this.getHeightOfLine(0) * this.zoomY;
    }
    if (shouldRedraw) {
      if (shouldResizeCanvas) {
        canvas.width = Math.ceil(width + additionalWidth);
        canvas.height = Math.ceil(height + additionalHeight);
      } else {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      drawingWidth = dims.x / 2;
      drawingHeight = dims.y / 2;
      this.cacheTranslationX = Math.round(canvas.width / 2 - drawingWidth) + drawingWidth;
      this.cacheTranslationY = Math.round(canvas.height / 2 - drawingHeight) + drawingHeight;
      this.cacheWidth = width;
      this.cacheHeight = height;
      context.translate(this.cacheTranslationX, this.cacheTranslationY);
      context.scale(zoomX, zoomY);
      this.zoomX = zoomX;
      this.zoomY = zoomY;
      return true;
    }
    return false;
  }

  /**
   * Sets object's properties from options, for class constructor only.
   * Needs to be overridden for different defaults.
   * @protected
   * @param {Object} [options] Options object
   */
  setOptions() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._setOptions(options);
  }

  /**
   * Transforms context when rendering an object
   * @param {CanvasRenderingContext2D} ctx Context
   */
  transform(ctx) {
    const needFullTransform = this.group && !this.group._transformDone || this.group && this.canvas && ctx === this.canvas.contextTop;
    const m = this.calcTransformMatrix(!needFullTransform);
    ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
  }

  /**
   * Returns an object representation of an instance
   * @param {string[]} [propertiesToInclude] Any properties that you might want to additionally include in the output
   * @return {Object} Object representation of an instance
   */
  toObject() {
    let propertiesToInclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const NUM_FRACTION_DIGITS = config.NUM_FRACTION_DIGITS,
      clipPathData = this.clipPath && !this.clipPath.excludeFromExport ? _objectSpread2(_objectSpread2({}, this.clipPath.toObject(propertiesToInclude)), {}, {
        inverted: this.clipPath.inverted,
        absolutePositioned: this.clipPath.absolutePositioned
      }) : null,
      object = _objectSpread2(_objectSpread2({}, pick(this, propertiesToInclude)), {}, {
        type: this.constructor.type,
        version: VERSION,
        originX: this.originX,
        originY: this.originY,
        left: toFixed(this.left, NUM_FRACTION_DIGITS),
        top: toFixed(this.top, NUM_FRACTION_DIGITS),
        width: toFixed(this.width, NUM_FRACTION_DIGITS),
        height: toFixed(this.height, NUM_FRACTION_DIGITS),
        fill: isSerializableFiller(this.fill) ? this.fill.toObject() : this.fill,
        stroke: isSerializableFiller(this.stroke) ? this.stroke.toObject() : this.stroke,
        strokeWidth: toFixed(this.strokeWidth, NUM_FRACTION_DIGITS),
        strokeDashArray: this.strokeDashArray ? this.strokeDashArray.concat() : this.strokeDashArray,
        strokeLineCap: this.strokeLineCap,
        strokeDashOffset: this.strokeDashOffset,
        strokeLineJoin: this.strokeLineJoin,
        strokeUniform: this.strokeUniform,
        strokeMiterLimit: toFixed(this.strokeMiterLimit, NUM_FRACTION_DIGITS),
        scaleX: toFixed(this.scaleX, NUM_FRACTION_DIGITS),
        scaleY: toFixed(this.scaleY, NUM_FRACTION_DIGITS),
        angle: toFixed(this.angle, NUM_FRACTION_DIGITS),
        flipX: this.flipX,
        flipY: this.flipY,
        opacity: toFixed(this.opacity, NUM_FRACTION_DIGITS),
        shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
        visible: this.visible,
        backgroundColor: this.backgroundColor,
        fillRule: this.fillRule,
        paintFirst: this.paintFirst,
        globalCompositeOperation: this.globalCompositeOperation,
        skewX: toFixed(this.skewX, NUM_FRACTION_DIGITS),
        skewY: toFixed(this.skewY, NUM_FRACTION_DIGITS)
      }, clipPathData ? {
        clipPath: clipPathData
      } : null);
    return !this.includeDefaultValues ? this._removeDefaultValues(object) : object;
  }

  /**
   * Returns (dataless) object representation of an instance
   * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
   * @return {Object} Object representation of an instance
   */
  toDatalessObject(propertiesToInclude) {
    // will be overwritten by subclasses
    return this.toObject(propertiesToInclude);
  }

  /**
   * @private
   * @param {Object} object
   */
  _removeDefaultValues(object) {
    // getDefaults() ( get from static ownDefaults ) should win over prototype since anyway they get assigned to instance
    // ownDefault vs prototype is swappable only if you change all the fabric objects consistently.
    const defaults = this.constructor.getDefaults();
    const hasStaticDefaultValues = Object.keys(defaults).length > 0;
    const baseValues = hasStaticDefaultValues ? defaults : Object.getPrototypeOf(this);
    return pickBy(object, (value, key) => {
      if (key === LEFT || key === TOP || key === 'type') {
        return true;
      }
      const baseValue = baseValues[key];
      return value !== baseValue &&
      // basically a check for [] === []
      !(Array.isArray(value) && Array.isArray(baseValue) && value.length === 0 && baseValue.length === 0);
    });
  }

  /**
   * Returns a string representation of an instance
   * @return {String}
   */
  toString() {
    return "#<".concat(this.constructor.type, ">");
  }

  /**
   * Return the object scale factor counting also the group scaling
   * @return {Point}
   */
  getObjectScaling() {
    // if the object is a top level one, on the canvas, we go for simple aritmetic
    // otherwise the complex method with angles will return approximations and decimals
    // and will likely kill the cache when not needed
    // https://github.com/fabricjs/fabric.js/issues/7157
    if (!this.group) {
      return new Point(Math.abs(this.scaleX), Math.abs(this.scaleY));
    }
    // if we are inside a group total zoom calculation is complex, we defer to generic matrices
    const options = qrDecompose(this.calcTransformMatrix());
    return new Point(Math.abs(options.scaleX), Math.abs(options.scaleY));
  }

  /**
   * Return the object scale factor counting also the group scaling, zoom and retina
   * @return {Object} object with scaleX and scaleY properties
   */
  getTotalObjectScaling() {
    const scale = this.getObjectScaling();
    if (this.canvas) {
      const zoom = this.canvas.getZoom();
      const retina = this.getCanvasRetinaScaling();
      return scale.scalarMultiply(zoom * retina);
    }
    return scale;
  }

  /**
   * Return the object opacity counting also the group property
   * @return {Number}
   */
  getObjectOpacity() {
    let opacity = this.opacity;
    if (this.group) {
      opacity *= this.group.getObjectOpacity();
    }
    return opacity;
  }

  /**
   * Makes sure the scale is valid and modifies it if necessary
   * @todo: this is a control action issue, not a geometry one
   * @private
   * @param {Number} value, unconstrained
   * @return {Number} constrained value;
   */
  _constrainScale(value) {
    if (Math.abs(value) < this.minScaleLimit) {
      if (value < 0) {
        return -this.minScaleLimit;
      } else {
        return this.minScaleLimit;
      }
    } else if (value === 0) {
      return 0.0001;
    }
    return value;
  }

  /**
   * Handles setting values on the instance and handling internal side effects
   * @protected
   * @param {String} key
   * @param {*} value
   */
  _set(key, value) {
    const isChanged = this[key] !== value;
    if (key === 'scaleX' || key === 'scaleY') {
      value = this._constrainScale(value);
    }
    if (key === 'scaleX' && value < 0) {
      this.flipX = !this.flipX;
      value *= -1;
    } else if (key === 'scaleY' && value < 0) {
      this.flipY = !this.flipY;
      value *= -1;
      // i don't like this automatic initialization here
    } else if (key === 'shadow' && value && !(value instanceof Shadow)) {
      value = new Shadow(value);
    } else if (key === 'dirty' && this.group && value) {
      // a dirty child makes the parent dirty
      // but a non dirty child will not make the parent non dirty.
      // the parent could be dirty for some other reason
      this.group.set('dirty', value);
    }
    this[key] = value;
    if (isChanged) {
      const groupNeedsUpdate = this.group && this.group.isOnACache();
      if (this.constructor.cacheProperties.includes(key)) {
        this.dirty = true;
        groupNeedsUpdate && this.group.set('dirty', true);
      } else if (groupNeedsUpdate && this.constructor.stateProperties.includes(key)) {
        this.group.set('dirty', true);
      }
    }
    return this;
  }

  /*
   * @private
   * return if the object would be visible in rendering
   * @memberOf FabricObject.prototype
   * @return {Boolean}
   */
  isNotVisible() {
    return this.opacity === 0 || !this.width && !this.height && this.strokeWidth === 0 || !this.visible;
  }

  /**
   * Renders an object on a specified context
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  render(ctx) {
    // do not render if width/height are zeros or object is not visible
    if (this.isNotVisible()) {
      return;
    }
    if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
      return;
    }
    ctx.save();
    this._setupCompositeOperation(ctx);
    this.drawSelectionBackground(ctx);
    this.transform(ctx);
    this._setOpacity(ctx);
    this._setShadow(ctx);
    if (this.shouldCache()) {
      this.renderCache();
      this.drawCacheOnCanvas(ctx);
    } else {
      this._removeCacheCanvas();
      this.drawObject(ctx);
      this.dirty = false;
    }
    ctx.restore();
  }
  drawSelectionBackground(ctx) {
    /* no op */
  }
  renderCache(options) {
    options = options || {};
    if (!this._cacheCanvas || !this._cacheContext) {
      this._createCacheCanvas();
    }
    if (this.isCacheDirty() && this._cacheContext) {
      this.drawObject(this._cacheContext, options.forClipping);
      this.dirty = false;
    }
  }

  /**
   * Remove cacheCanvas and its dimensions from the objects
   */
  _removeCacheCanvas() {
    this._cacheCanvas = undefined;
    this._cacheContext = null;
    this.cacheWidth = 0;
    this.cacheHeight = 0;
  }

  /**
   * return true if the object will draw a stroke
   * Does not consider text styles. This is just a shortcut used at rendering time
   * We want it to be an approximation and be fast.
   * wrote to avoid extra caching, it has to return true when stroke happens,
   * can guess when it will not happen at 100% chance, does not matter if it misses
   * some use case where the stroke is invisible.
   * @since 3.0.0
   * @returns Boolean
   */
  hasStroke() {
    return this.stroke && this.stroke !== 'transparent' && this.strokeWidth !== 0;
  }

  /**
   * return true if the object will draw a fill
   * Does not consider text styles. This is just a shortcut used at rendering time
   * We want it to be an approximation and be fast.
   * wrote to avoid extra caching, it has to return true when fill happens,
   * can guess when it will not happen at 100% chance, does not matter if it misses
   * some use case where the fill is invisible.
   * @since 3.0.0
   * @returns Boolean
   */
  hasFill() {
    return this.fill && this.fill !== 'transparent';
  }

  /**
   * When set to `true`, force the object to have its own cache, even if it is inside a group
   * it may be needed when your object behave in a particular way on the cache and always needs
   * its own isolated canvas to render correctly.
   * Created to be overridden
   * since 1.7.12
   * @returns Boolean
   */
  needsItsOwnCache() {
    if (this.paintFirst === 'stroke' && this.hasFill() && this.hasStroke() && !!this.shadow) {
      return true;
    }
    if (this.clipPath) {
      return true;
    }
    return false;
  }

  /**
   * Decide if the object should cache or not. Create its own cache level
   * objectCaching is a global flag, wins over everything
   * needsItsOwnCache should be used when the object drawing method requires
   * a cache step. None of the fabric classes requires it.
   * Generally you do not cache objects in groups because the group outside is cached.
   * Read as: cache if is needed, or if the feature is enabled but we are not already caching.
   * @return {Boolean}
   */
  shouldCache() {
    this.ownCaching = this.needsItsOwnCache() || this.objectCaching && (!this.group || !this.group.isOnACache());
    return this.ownCaching;
  }

  /**
   * Check if this object will cast a shadow with an offset.
   * used by Group.shouldCache to know if child has a shadow recursively
   * @return {Boolean}
   * @deprecated
   */
  willDrawShadow() {
    return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
  }

  /**
   * Execute the drawing operation for an object clipPath
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {FabricObject} clipPath
   */
  drawClipPathOnCache(ctx, clipPath) {
    ctx.save();
    // DEBUG: uncomment this line, comment the following
    // ctx.globalAlpha = 0.4
    if (clipPath.inverted) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'destination-in';
    }
    //ctx.scale(1 / 2, 1 / 2);
    if (clipPath.absolutePositioned) {
      const m = invertTransform(this.calcTransformMatrix());
      ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }
    clipPath.transform(ctx);
    ctx.scale(1 / clipPath.zoomX, 1 / clipPath.zoomY);
    ctx.drawImage(clipPath._cacheCanvas, -clipPath.cacheTranslationX, -clipPath.cacheTranslationY);
    ctx.restore();
  }

  /**
   * Execute the drawing operation for an object on a specified context
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {boolean} forClipping apply clipping styles
   */
  drawObject(ctx, forClipping) {
    const originalFill = this.fill,
      originalStroke = this.stroke;
    if (forClipping) {
      this.fill = 'black';
      this.stroke = '';
      this._setClippingProperties(ctx);
    } else {
      this._renderBackground(ctx);
    }
    this._render(ctx);
    this._drawClipPath(ctx, this.clipPath);
    this.fill = originalFill;
    this.stroke = originalStroke;
  }

  /**
   * Prepare clipPath state and cache and draw it on instance's cache
   * @param {CanvasRenderingContext2D} ctx
   * @param {FabricObject} clipPath
   */
  _drawClipPath(ctx, clipPath) {
    if (!clipPath) {
      return;
    }
    // needed to setup a couple of variables
    // path canvas gets overridden with this one.
    // TODO find a better solution?
    clipPath._set('canvas', this.canvas);
    clipPath.shouldCache();
    clipPath._transformDone = true;
    clipPath.renderCache({
      forClipping: true
    });
    this.drawClipPathOnCache(ctx, clipPath);
  }

  /**
   * Paint the cached copy of the object on the target context.
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  drawCacheOnCanvas(ctx) {
    ctx.scale(1 / this.zoomX, 1 / this.zoomY);
    ctx.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
  }

  /**
   * Check if cache is dirty
   * @param {Boolean} skipCanvas skip canvas checks because this object is painted
   * on parent canvas.
   */
  isCacheDirty() {
    let skipCanvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (this.isNotVisible()) {
      return false;
    }
    if (this._cacheCanvas && this._cacheContext && !skipCanvas && this._updateCacheCanvas()) {
      // in this case the context is already cleared.
      return true;
    } else {
      if (this.dirty || this.clipPath && this.clipPath.absolutePositioned) {
        if (this._cacheCanvas && this._cacheContext && !skipCanvas) {
          const width = this.cacheWidth / this.zoomX;
          const height = this.cacheHeight / this.zoomY;
          this._cacheContext.clearRect(-width / 2, -height / 2, width, height);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Draws a background for the object big as its untransformed dimensions
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _renderBackground(ctx) {
    if (!this.backgroundColor) {
      return;
    }
    const dim = this._getNonTransformedDimensions();
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(-dim.x / 2, -dim.y / 2, dim.x, dim.y);
    // if there is background color no other shadows
    // should be casted
    this._removeShadow(ctx);
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _setOpacity(ctx) {
    if (this.group && !this.group._transformDone) {
      ctx.globalAlpha = this.getObjectOpacity();
    } else {
      ctx.globalAlpha *= this.opacity;
    }
  }
  _setStrokeStyles(ctx, decl) {
    const stroke = decl.stroke;
    if (stroke) {
      ctx.lineWidth = decl.strokeWidth;
      ctx.lineCap = decl.strokeLineCap;
      ctx.lineDashOffset = decl.strokeDashOffset;
      ctx.lineJoin = decl.strokeLineJoin;
      ctx.miterLimit = decl.strokeMiterLimit;
      if (isFiller(stroke)) {
        if (stroke.gradientUnits === 'percentage' || stroke.gradientTransform || stroke.patternTransform) {
          // need to transform gradient in a pattern.
          // this is a slow process. If you are hitting this codepath, and the object
          // is not using caching, you should consider switching it on.
          // we need a canvas as big as the current object caching canvas.
          this._applyPatternForTransformedGradient(ctx, stroke);
        } else {
          // is a simple gradient or pattern
          ctx.strokeStyle = stroke.toLive(ctx);
          this._applyPatternGradientTransform(ctx, stroke);
        }
      } else {
        // is a color
        ctx.strokeStyle = decl.stroke;
      }
    }
  }
  _setFillStyles(ctx, _ref) {
    let {
      fill
    } = _ref;
    if (fill) {
      if (isFiller(fill)) {
        ctx.fillStyle = fill.toLive(ctx);
        this._applyPatternGradientTransform(ctx, fill);
      } else {
        ctx.fillStyle = fill;
      }
    }
  }
  _setClippingProperties(ctx) {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = '#000000';
  }

  /**
   * @private
   * Sets line dash
   * @param {CanvasRenderingContext2D} ctx Context to set the dash line on
   * @param {Array} dashArray array representing dashes
   */
  _setLineDash(ctx, dashArray) {
    if (!dashArray || dashArray.length === 0) {
      return;
    }
    // Spec requires the concatenation of two copies of the dash array when the number of elements is odd
    if (1 & dashArray.length) {
      dashArray.push(...dashArray);
    }
    ctx.setLineDash(dashArray);
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _setShadow(ctx) {
    if (!this.shadow) {
      return;
    }
    const shadow = this.shadow,
      canvas = this.canvas,
      retinaScaling = this.getCanvasRetinaScaling(),
      [sx,,, sy] = (canvas === null || canvas === void 0 ? void 0 : canvas.viewportTransform) || iMatrix,
      multX = sx * retinaScaling,
      multY = sy * retinaScaling,
      scaling = shadow.nonScaling ? new Point(1, 1) : this.getObjectScaling();
    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur * config.browserShadowBlurConstant * (multX + multY) * (scaling.x + scaling.y) / 4;
    ctx.shadowOffsetX = shadow.offsetX * multX * scaling.x;
    ctx.shadowOffsetY = shadow.offsetY * multY * scaling.y;
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _removeShadow(ctx) {
    if (!this.shadow) {
      return;
    }
    ctx.shadowColor = '';
    ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {TFiller} filler {@link Pattern} or {@link Gradient}
   */
  _applyPatternGradientTransform(ctx, filler) {
    if (!isFiller(filler)) {
      return {
        offsetX: 0,
        offsetY: 0
      };
    }
    const t = filler.gradientTransform || filler.patternTransform;
    const offsetX = -this.width / 2 + filler.offsetX || 0,
      offsetY = -this.height / 2 + filler.offsetY || 0;
    if (filler.gradientUnits === 'percentage') {
      ctx.transform(this.width, 0, 0, this.height, offsetX, offsetY);
    } else {
      ctx.transform(1, 0, 0, 1, offsetX, offsetY);
    }
    if (t) {
      ctx.transform(t[0], t[1], t[2], t[3], t[4], t[5]);
    }
    return {
      offsetX: offsetX,
      offsetY: offsetY
    };
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _renderPaintInOrder(ctx) {
    if (this.paintFirst === 'stroke') {
      this._renderStroke(ctx);
      this._renderFill(ctx);
    } else {
      this._renderFill(ctx);
      this._renderStroke(ctx);
    }
  }

  /**
   * @private
   * function that actually render something on the context.
   * empty here to allow Obects to work on tests to benchmark fabric functionalites
   * not related to rendering
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _render(ctx) {
    // placeholder to be overridden
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _renderFill(ctx) {
    if (!this.fill) {
      return;
    }
    ctx.save();
    this._setFillStyles(ctx, this);
    if (this.fillRule === 'evenodd') {
      ctx.fill('evenodd');
    } else {
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   */
  _renderStroke(ctx) {
    if (!this.stroke || this.strokeWidth === 0) {
      return;
    }
    if (this.shadow && !this.shadow.affectStroke) {
      this._removeShadow(ctx);
    }
    ctx.save();
    if (this.strokeUniform) {
      const scaling = this.getObjectScaling();
      ctx.scale(1 / scaling.x, 1 / scaling.y);
    }
    this._setLineDash(ctx, this.strokeDashArray);
    this._setStrokeStyles(ctx, this);
    ctx.stroke();
    ctx.restore();
  }

  /**
   * This function try to patch the missing gradientTransform on canvas gradients.
   * transforming a context to transform the gradient, is going to transform the stroke too.
   * we want to transform the gradient but not the stroke operation, so we create
   * a transformed gradient on a pattern and then we use the pattern instead of the gradient.
   * this method has drawbacks: is slow, is in low resolution, needs a patch for when the size
   * is limited.
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {Gradient} filler
   */
  _applyPatternForTransformedGradient(ctx, filler) {
    var _pCtx$createPattern;
    const dims = this._limitCacheSize(this._getCacheCanvasDimensions()),
      pCanvas = createCanvasElement(),
      retinaScaling = this.getCanvasRetinaScaling(),
      width = dims.x / this.scaleX / retinaScaling,
      height = dims.y / this.scaleY / retinaScaling;
    // in case width and height are less than 1px, we have to round up.
    // since the pattern is no-repeat, this is fine
    pCanvas.width = Math.ceil(width);
    pCanvas.height = Math.ceil(height);
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) {
      return;
    }
    pCtx.beginPath();
    pCtx.moveTo(0, 0);
    pCtx.lineTo(width, 0);
    pCtx.lineTo(width, height);
    pCtx.lineTo(0, height);
    pCtx.closePath();
    pCtx.translate(width / 2, height / 2);
    pCtx.scale(dims.zoomX / this.scaleX / retinaScaling, dims.zoomY / this.scaleY / retinaScaling);
    this._applyPatternGradientTransform(pCtx, filler);
    pCtx.fillStyle = filler.toLive(ctx);
    pCtx.fill();
    ctx.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2);
    ctx.scale(retinaScaling * this.scaleX / dims.zoomX, retinaScaling * this.scaleY / dims.zoomY);
    ctx.strokeStyle = (_pCtx$createPattern = pCtx.createPattern(pCanvas, 'no-repeat')) !== null && _pCtx$createPattern !== void 0 ? _pCtx$createPattern : '';
  }

  /**
   * This function is an helper for svg import. it returns the center of the object in the svg
   * untransformed coordinates
   * @private
   * @return {Point} center point from element coordinates
   */
  _findCenterFromElement() {
    return new Point(this.left + this.width / 2, this.top + this.height / 2);
  }

  /**
   * Clones an instance.
   * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
   * @returns {Promise<FabricObject>}
   */
  clone(propertiesToInclude) {
    const objectForm = this.toObject(propertiesToInclude);
    return this.constructor.fromObject(objectForm);
  }

  /**
   * Creates an instance of Image out of an object
   * makes use of toCanvasElement.
   * Once this method was based on toDataUrl and loadImage, so it also had a quality
   * and format option. toCanvasElement is faster and produce no loss of quality.
   * If you need to get a real Jpeg or Png from an object, using toDataURL is the right way to do it.
   * toCanvasElement and then toBlob from the obtained canvas is also a good option.
   * @todo fix the export type, it could not be Image but the type that getClass return for 'image'.
   * @param {ObjectToCanvasElementOptions} [options] for clone as image, passed to toDataURL
   * @param {Number} [options.multiplier=1] Multiplier to scale by
   * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
   * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
   * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
   * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
   * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
   * @param {Boolean} [options.withoutTransform] Remove current object transform ( no scale , no angle, no flip, no skew ). Introduced in 2.3.4
   * @param {Boolean} [options.withoutShadow] Remove current object shadow. Introduced in 2.4.2
   * @return {FabricImage} Object cloned as image.
   */
  cloneAsImage(options) {
    const canvasEl = this.toCanvasElement(options);
    // TODO: how to import Image w/o an import cycle?
    const ImageClass = classRegistry.getClass('image');
    return new ImageClass(canvasEl);
  }

  /**
   * Converts an object into a HTMLCanvas element
   * @param {ObjectToCanvasElementOptions} options Options object
   * @param {Number} [options.multiplier=1] Multiplier to scale by
   * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
   * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
   * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
   * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
   * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
   * @param {Boolean} [options.withoutTransform] Remove current object transform ( no scale , no angle, no flip, no skew ). Introduced in 2.3.4
   * @param {Boolean} [options.withoutShadow] Remove current object shadow. Introduced in 2.4.2
   * @param {Boolean} [options.viewportTransform] Account for canvas viewport transform
   * @param {(el?: HTMLCanvasElement) => StaticCanvas} [options.canvasProvider] Create the output canvas
   * @return {HTMLCanvasElement} Returns DOM element <canvas> with the FabricObject
   */
  toCanvasElement() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const origParams = saveObjectTransform(this),
      originalGroup = this.group,
      originalShadow = this.shadow,
      abs = Math.abs,
      retinaScaling = options.enableRetinaScaling ? getDevicePixelRatio() : 1,
      multiplier = (options.multiplier || 1) * retinaScaling,
      canvasProvider = options.canvasProvider || (el => new StaticCanvas(el, {
        enableRetinaScaling: false,
        renderOnAddRemove: false,
        skipOffscreen: false
      }));
    delete this.group;
    if (options.withoutTransform) {
      resetObjectTransform(this);
    }
    if (options.withoutShadow) {
      this.shadow = null;
    }
    if (options.viewportTransform) {
      sendObjectToPlane(this, this.getViewportTransform());
    }
    this.setCoords();
    const el = createCanvasElement(),
      boundingRect = this.getBoundingRect(),
      shadow = this.shadow,
      shadowOffset = new Point();
    if (shadow) {
      const shadowBlur = shadow.blur;
      const scaling = shadow.nonScaling ? new Point(1, 1) : this.getObjectScaling();
      // consider non scaling shadow.
      shadowOffset.x = 2 * Math.round(abs(shadow.offsetX) + shadowBlur) * abs(scaling.x);
      shadowOffset.y = 2 * Math.round(abs(shadow.offsetY) + shadowBlur) * abs(scaling.y);
    }
    const width = boundingRect.width + shadowOffset.x,
      height = boundingRect.height + shadowOffset.y;
    // if the current width/height is not an integer
    // we need to make it so.
    el.width = Math.ceil(width);
    el.height = Math.ceil(height);
    const canvas = canvasProvider(el);
    if (options.format === 'jpeg') {
      canvas.backgroundColor = '#fff';
    }
    this.setPositionByOrigin(new Point(canvas.width / 2, canvas.height / 2), CENTER, CENTER);
    const originalCanvas = this.canvas;
    // static canvas and canvas have both an array of InteractiveObjects
    // @ts-expect-error this needs to be fixed somehow, or ignored globally
    canvas._objects = [this];
    this.set('canvas', canvas);
    this.setCoords();
    const canvasEl = canvas.toCanvasElement(multiplier || 1, options);
    this.set('canvas', originalCanvas);
    this.shadow = originalShadow;
    if (originalGroup) {
      this.group = originalGroup;
    }
    this.set(origParams);
    this.setCoords();
    // canvas.dispose will call image.dispose that will nullify the elements
    // since this canvas is a simple element for the process, we remove references
    // to objects in this way in order to avoid object trashing.
    canvas._objects = [];
    // since render has settled it is safe to destroy canvas
    canvas.destroy();
    return canvasEl;
  }

  /**
   * Converts an object into a data-url-like string
   * @param {Object} options Options object
   * @param {String} [options.format=png] The format of the output image. Either "jpeg" or "png"
   * @param {Number} [options.quality=1] Quality level (0..1). Only used for jpeg.
   * @param {Number} [options.multiplier=1] Multiplier to scale by
   * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
   * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
   * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
   * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
   * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
   * @param {Boolean} [options.withoutTransform] Remove current object transform ( no scale , no angle, no flip, no skew ). Introduced in 2.3.4
   * @param {Boolean} [options.withoutShadow] Remove current object shadow. Introduced in 2.4.2
   * @return {String} Returns a data: URL containing a representation of the object in the format specified by options.format
   */
  toDataURL() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return toDataURL(this.toCanvasElement(options), options.format || 'png', options.quality || 1);
  }

  /**
   * Returns true if any of the specified types is identical to the type of an instance
   * @param {String} type Type to check against
   * @return {Boolean}
   */
  isType() {
    for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }
    return types.includes(this.constructor.type) || types.includes(this.type);
  }

  /**
   * Returns complexity of an instance
   * @return {Number} complexity of this instance (is 1 unless subclassed)
   */
  complexity() {
    return 1;
  }

  /**
   * Returns a JSON representation of an instance
   * @return {Object} JSON
   */
  toJSON() {
    // delegate, not alias
    return this.toObject();
  }

  /**
   * Sets "angle" of an instance with centered rotation
   * @param {TDegree} angle Angle value (in degrees)
   */
  rotate(angle) {
    const {
      centeredRotation,
      originX,
      originY
    } = this;
    if (centeredRotation) {
      const {
        x,
        y
      } = this.getRelativeCenterPoint();
      this.originX = CENTER;
      this.originY = CENTER;
      this.left = x;
      this.top = y;
    }
    this.set('angle', angle);
    if (centeredRotation) {
      const {
        x,
        y
      } = this.translateToOriginPoint(this.getRelativeCenterPoint(), originX, originY);
      this.left = x;
      this.top = y;
      this.originX = originX;
      this.originY = originY;
    }
  }

  /**
   * This callback function is called by the parent group of an object every
   * time a non-delegated property changes on the group. It is passed the key
   * and value as parameters. Not adding in this function's signature to avoid
   * Travis build error about unused variables.
   */
  setOnGroup() {
    // implemented by sub-classes, as needed.
  }

  /**
   * Sets canvas globalCompositeOperation for specific object
   * custom composition operation for the particular object can be specified using globalCompositeOperation property
   * @param {CanvasRenderingContext2D} ctx Rendering canvas context
   */
  _setupCompositeOperation(ctx) {
    if (this.globalCompositeOperation) {
      ctx.globalCompositeOperation = this.globalCompositeOperation;
    }
  }

  /**
   * cancel instance's running animations
   * override if necessary to dispose artifacts such as `clipPath`
   */
  dispose() {
    runningAnimations.cancelByTarget(this);
    this.off();
    this._set('canvas', undefined);
    // clear caches
    this._cacheCanvas && getEnv().dispose(this._cacheCanvas);
    this._cacheCanvas = undefined;
    this._cacheContext = null;
  }

  /**
   *
   * @param {Function} klass
   * @param {object} object
   * @param {object} [options]
   * @param {string} [options.extraParam] property to pass as first argument to the constructor
   * @param {AbortSignal} [options.signal] handle aborting, see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
   * @returns {Promise<FabricObject>}
   */
  static _fromObject(_ref2) {
    let object = _objectWithoutProperties(_ref2, _excluded);
    let _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      {
        extraParam
      } = _ref3,
      options = _objectWithoutProperties(_ref3, _excluded2);
    return enlivenObjectEnlivables(cloneDeep(object), options).then(enlivedMap => {
      const allOptions = _objectSpread2(_objectSpread2({}, options), enlivedMap);
      // from the resulting enlived options, extract options.extraParam to arg0
      // to avoid accidental overrides later
      if (extraParam) {
        const {
            [extraParam]: arg0
          } = allOptions,
          rest = _objectWithoutProperties(allOptions, [extraParam].map(_toPropertyKey));
        // @ts-expect-error different signature
        return new this(arg0, rest);
      } else {
        return new this(allOptions);
      }
    });
  }

  /**
   *
   * @param {object} object
   * @param {object} [options]
   * @param {AbortSignal} [options.signal] handle aborting, see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
   * @returns {Promise<FabricObject>}
   */
  static fromObject(object, options) {
    return this._fromObject(object, options);
  }
}
/**
 * This list of properties is used to check if the state of an object is changed.
 * This state change now is only used for children of groups to understand if a group
 * needs its cache regenerated during a .set call
 * @type Array
 */
_defineProperty(FabricObject, "stateProperties", stateProperties);
/**
 * List of properties to consider when checking if cache needs refresh
 * Those properties are checked by
 * calls to Object.set(key, value). If the key is in this list, the object is marked as dirty
 * and refreshed at the next render
 * @type Array
 */
_defineProperty(FabricObject, "cacheProperties", cacheProperties);
_defineProperty(FabricObject, "ownDefaults", fabricObjectDefaultValues);
_defineProperty(FabricObject, "type", 'FabricObject');
classRegistry.setClass(FabricObject);
classRegistry.setClass(FabricObject, 'object');

export { FabricObject };
//# sourceMappingURL=Object.mjs.map
