import { Polyline } from './Polyline';
export declare class Polygon extends Polyline {
    static ownDefaults: Partial<import("../typedefs").TClassProperties<Polyline<Partial<import("./Object/types").FabricObjectProps>, import("./Polyline").SerializedPolylineProps, import("../EventTypeDefs").ObjectEvents>>>;
    static type: string;
    static getDefaults(): Record<string, any>;
    protected isOpen(): boolean;
}
//# sourceMappingURL=Polygon.d.ts.map