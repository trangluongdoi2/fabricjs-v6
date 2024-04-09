import { defineProperty as _defineProperty, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.mjs';
import { BaseFilter } from './BaseFilter.mjs';
import { classRegistry } from '../ClassRegistry.mjs';
import { fragmentSource } from './shaders/noise.mjs';

const noiseDefaultValues = {
  mainParameter: 'noise',
  noise: 0
};

/**
 * Noise filter class
 * @example
 * const filter = new Noise({
 *   noise: 700
 * });
 * object.filters.push(filter);
 * object.applyFilters();
 * canvas.renderAll();
 */
class Noise extends BaseFilter {
  getFragmentSource() {
    return fragmentSource;
  }

  /**
   * Apply the Brightness operation to a Uint8ClampedArray representing the pixels of an image.
   *
   * @param {Object} options
   * @param {ImageData} options.imageData The Uint8ClampedArray to be filtered.
   */
  applyTo2d(_ref) {
    let {
      imageData: {
        data
      }
    } = _ref;
    if (this.noise === 0) {
      return;
    }
    const noise = this.noise;
    for (let i = 0; i < data.length; i += 4) {
      const rand = (0.5 - Math.random()) * noise;
      data[i] += rand;
      data[i + 1] += rand;
      data[i + 2] += rand;
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
      uNoise: gl.getUniformLocation(program, 'uNoise'),
      uSeed: gl.getUniformLocation(program, 'uSeed')
    };
  }

  /**
   * Send data from this filter to its shader program's uniforms.
   *
   * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
   * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
   */
  sendUniformData(gl, uniformLocations) {
    gl.uniform1f(uniformLocations.uNoise, this.noise / 255);
    gl.uniform1f(uniformLocations.uSeed, Math.random());
  }

  /**
   * Returns object representation of an instance
   * @return {Object} Object representation of an instance
   */
  toObject() {
    return _objectSpread2(_objectSpread2({}, super.toObject()), {}, {
      noise: this.noise
    });
  }
}
/**
 * Noise value, from
 * @param {Number} noise
 * @default
 */
_defineProperty(Noise, "type", 'Noise');
_defineProperty(Noise, "defaults", noiseDefaultValues);
classRegistry.setClass(Noise);

export { Noise, noiseDefaultValues };
//# sourceMappingURL=Noise.mjs.map
