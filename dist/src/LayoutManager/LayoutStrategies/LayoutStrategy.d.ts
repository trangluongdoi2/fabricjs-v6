import { Point } from '../../Point';
import type { FabricObject } from '../../shapes/Object/FabricObject';
import type { InitializationLayoutContext, LayoutStrategyResult, StrictLayoutContext } from '../types';
/**
 * Exposes a main public method {@link calcLayoutResult} that is used by the `LayoutManager` to perform layout.
 * Returning `undefined` signals the `LayoutManager` to skip the layout.
 *
 * In charge of calculating the bounding box of the passed objects.
 */
export declare abstract class LayoutStrategy {
    /**
     * override by subclass for persistence (TS does not support `static abstract`)
     */
    static type: string;
    /**
     * Used by the `LayoutManager` to perform layout
     * @returns layout result **OR** `undefined` to skip layout
     */
    calcLayoutResult(context: StrictLayoutContext, objects: FabricObject[]): LayoutStrategyResult | undefined;
    shouldPerformLayout(context: StrictLayoutContext): boolean;
    shouldLayoutClipPath({ type, target: { clipPath } }: StrictLayoutContext): boolean | undefined;
    getInitialSize(context: StrictLayoutContext & InitializationLayoutContext, result: Pick<LayoutStrategyResult, 'center' | 'size'>): Point;
    /**
     * Override this method to customize layout.
     */
    calcBoundingBox(objects: FabricObject[], context: StrictLayoutContext): LayoutStrategyResult | undefined;
}
//# sourceMappingURL=LayoutStrategy.d.ts.map