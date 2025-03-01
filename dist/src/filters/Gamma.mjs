import { defineProperty as _defineProperty, objectWithoutProperties as _objectWithoutProperties } from '../../_virtual/_rollupPluginBabelHelpers.mjs';
import { BaseFilter } from './BaseFilter.mjs';
import { classRegistry } from '../ClassRegistry.mjs';
import { fragmentSource } from './shaders/gamma.mjs';

const _excluded = ["gamma"];
const gammaDefaultValues = {
  mainParameter: 'gamma',
  gamma: [1, 1, 1]
};

/**
 * Gamma filter class
 * @example
 * const filter = new Gamma({
 *   gamma: [1, 0.5, 2.1]
 * });
 * object.filters.push(filter);
 * object.applyFilters();
 */
class Gamma extends BaseFilter {
  getFragmentSource() {
    return fragmentSource;
  }
  constructor() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      {
        gamma = [1, 1, 1]
      } = _ref,
      options = _objectWithoutProperties(_ref, _excluded);
    super(options);
    this.gamma = gamma;
  }

  /**
   * Apply the Gamma operation to a Uint8Array representing the pixels of an image.
   *
   * @param {Object} options
   * @param {ImageData} options.imageData The Uint8Array to be filtered.
   */
  applyTo2d(_ref2) {
    let {
      imageData: {
        data
      }
    } = _ref2;
    const gamma = this.gamma,
      rInv = 1 / gamma[0],
      gInv = 1 / gamma[1],
      bInv = 1 / gamma[2];
    if (!this.rgbValues) {
      this.rgbValues = {
        r: new Uint8Array(256),
        g: new Uint8Array(256),
        b: new Uint8Array(256)
      };
    }

    // This is an optimization - pre-compute a look-up table for each color channel
    // instead of performing these pow calls for each pixel in the image.
    const rgb = this.rgbValues;
    for (let i = 0; i < 256; i++) {
      rgb.r[i] = Math.pow(i / 255, rInv) * 255;
      rgb.g[i] = Math.pow(i / 255, gInv) * 255;
      rgb.b[i] = Math.pow(i / 255, bInv) * 255;
    }
    for (let i = 0; i < data.length; i += 4) {
      data[i] = rgb.r[data[i]];
      data[i + 1] = rgb.g[data[i + 1]];
      data[i + 2] = rgb.b[data[i + 2]];
    }
  }

  /**
   * Return WebGL uniform locations for this filter's shader.
   *
   * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
   * @param {WebGLShaderProgram} program This filter's compiled shader program.
   */
  getUniformLocations(gl, program) {
    return {
      uGamma: gl.getUniformLocation(program, 'uGamma')
    };
  }

  /**
   * Send data from this filter to its shader program's uniforms.
   *
   * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
   * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
   */
  sendUniformData(gl, uniformLocations) {
    gl.uniform3fv(uniformLocations.uGamma, this.gamma);
  }
}
/**
 * Gamma array value, from 0.01 to 2.2.
 * @param {Array} gamma
 * @default
 */
_defineProperty(Gamma, "type", 'Gamma');
_defineProperty(Gamma, "defaults", gammaDefaultValues);
classRegistry.setClass(Gamma);

export { Gamma, gammaDefaultValues };
//# sourceMappingURL=Gamma.mjs.map
