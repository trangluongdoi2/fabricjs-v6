import { reNum } from '../../parser/constants.mjs';

const cleanupSvgAttribute = attributeValue => attributeValue.replace(new RegExp("(".concat(reNum, ")"), 'gi'), ' $1 ')
// replace annoying commas and arbitrary whitespace with single spaces
.replace(/,/gi, ' ').replace(/\s+/gi, ' ');

export { cleanupSvgAttribute };
//# sourceMappingURL=cleanupSvgAttribute.mjs.map
