import type { TClassProperties } from '../typedefs';
import { BaseFilter } from './BaseFilter';
import type { T2DPipelineState, TWebGLUniformLocationMap } from './typedefs';
export type TBlendMode = 'multiply' | 'add' | 'difference' | 'screen' | 'subtract' | 'darken' | 'lighten' | 'overlay' | 'exclusion' | 'tint';
export declare const blendColorDefaultValues: Partial<TClassProperties<BlendColor>>;
/**
 * Color Blend filter class
 * @example
 * const filter = new BlendColor({
 *  color: '#000',
 *  mode: 'multiply'
 * });
 *
 * const filter = new BlendImage({
 *  image: fabricImageObject,
 *  mode: 'multiply',
 *  alpha: 0.5
 * });
 * object.filters.push(filter);
 * object.applyFilters();
 * canvas.renderAll();
 */
export declare class BlendColor extends BaseFilter {
    /**
     * Color to make the blend operation with. default to a reddish color since black or white
     * gives always strong result.
     * @type String
     * @default
     **/
    color: string;
    /**
     * Blend mode for the filter: one of multiply, add, difference, screen, subtract,
     * darken, lighten, overlay, exclusion, tint.
     * @type String
     * @default
     **/
    mode: TBlendMode;
    /**
     * alpha value. represent the strength of the blend color operation.
     * @type Number
     * @default
     **/
    alpha: number;
    static defaults: Partial<TClassProperties<BlendColor>>;
    static type: string;
    getCacheKey(): string;
    protected getFragmentSource(): string;
    /**
     * Apply the Blend operation to a Uint8ClampedArray representing the pixels of an image.
     *
     * @param {Object} options
     * @param {ImageData} options.imageData The Uint8ClampedArray to be filtered.
     */
    applyTo2d({ imageData: { data } }: T2DPipelineState): void;
    /**
     * Return WebGL uniform locations for this filter's shader.
     *
     * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
     * @param {WebGLShaderProgram} program This filter's compiled shader program.
     */
    getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): TWebGLUniformLocationMap;
    /**
     * Send data from this filter to its shader program's uniforms.
     *
     * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
     * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
     */
    sendUniformData(gl: WebGLRenderingContext, uniformLocations: TWebGLUniformLocationMap): void;
    /**
     * Returns object representation of an instance
     * @return {Object} Object representation of an instance
     */
    toObject(): {
        type: string;
        color: string;
        mode: TBlendMode;
        alpha: number;
    };
}
//# sourceMappingURL=BlendColor.d.ts.map