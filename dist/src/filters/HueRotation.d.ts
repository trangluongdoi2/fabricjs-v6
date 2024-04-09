import type { TClassProperties } from '../typedefs';
import { ColorMatrix } from './ColorMatrix';
import type { TWebGLPipelineState, T2DPipelineState } from './typedefs';
export declare const hueRotationDefaultValues: Partial<TClassProperties<HueRotation>>;
/**
 * HueRotation filter class
 * @example
 * const filter = new HueRotation({
 *   rotation: -0.5
 * });
 * object.filters.push(filter);
 * object.applyFilters();
 */
export declare class HueRotation extends ColorMatrix {
    /**
     * HueRotation value, from -1 to 1.
     */
    rotation: number;
    static type: string;
    static defaults: Partial<TClassProperties<HueRotation>>;
    calculateMatrix(): void;
    isNeutralState(): boolean;
    applyTo(options: TWebGLPipelineState | T2DPipelineState): void;
}
//# sourceMappingURL=HueRotation.d.ts.map