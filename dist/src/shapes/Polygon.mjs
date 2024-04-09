import { defineProperty as _defineProperty, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.mjs';
import { classRegistry } from '../ClassRegistry.mjs';
import { Polyline, polylineDefaultValues } from './Polyline.mjs';

class Polygon extends Polyline {
  static getDefaults() {
    return _objectSpread2(_objectSpread2({}, super.getDefaults()), Polyline.ownDefaults);
  }
  isOpen() {
    return false;
  }
}
_defineProperty(Polygon, "ownDefaults", polylineDefaultValues);
_defineProperty(Polygon, "type", 'Polygon');
classRegistry.setClass(Polygon);
classRegistry.setSVGClass(Polygon);

export { Polygon };
//# sourceMappingURL=Polygon.mjs.map
