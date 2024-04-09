import { defineProperty as _defineProperty, objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.mjs';
import { BaseFilter } from './BaseFilter.mjs';
import { isWebGLPipelineState } from './utils.mjs';
import { classRegistry } from '../ClassRegistry.mjs';

const _excluded = ["subFilters"];

/**
 * A container class that knows how to apply a sequence of filters to an input image.
 */
class Composed extends BaseFilter {
  constructor() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      {
        subFilters = []
      } = _ref,
      options = _objectWithoutProperties(_ref, _excluded);
    super(options);
    this.subFilters = subFilters;
  }

  /**
   * Apply this container's filters to the input image provided.
   *
   * @param {Object} options
   * @param {Number} options.passes The number of filters remaining to be applied.
   */
  applyTo(options) {
    if (isWebGLPipelineState(options)) {
      options.passes += this.subFilters.length - 1;
    }
    this.subFilters.forEach(filter => {
      filter.applyTo(options);
    });
  }

  /**
   * Serialize this filter into JSON.
   *
   * @returns {Object} A JSON representation of this filter.
   */
  toObject() {
    return _objectSpread2(_objectSpread2({}, super.toObject()), {}, {
      subFilters: this.subFilters.map(filter => filter.toObject())
    });
  }
  isNeutralState() {
    return !this.subFilters.some(filter => !filter.isNeutralState());
  }

  /**
   * Deserialize a JSON definition of a ComposedFilter into a concrete instance.
   * @static
   * @param {oject} object Object to create an instance from
   * @param {object} [options]
   * @param {AbortSignal} [options.signal] handle aborting `BlendImage` filter loading, see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
   * @returns {Promise<Composed>}
   */
  static fromObject(object, options) {
    return Promise.all((object.subFilters || []).map(filter => classRegistry.getClass(filter.type).fromObject(filter, options))).then(enlivedFilters => new this({
      subFilters: enlivedFilters
    }));
  }
}
/**
 * A non sparse array of filters to apply
 */
_defineProperty(Composed, "type", 'Composed');
classRegistry.setClass(Composed);

export { Composed };
//# sourceMappingURL=Composed.mjs.map
