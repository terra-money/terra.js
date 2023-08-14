"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
var numeric_1 = require("../core/numeric");
var Convert;
(function (Convert) {
    Convert.id = function (c) { return c; };
    Convert.toDec = function (c) { return new numeric_1.Dec(c); };
    Convert.toString = function (c) { return c.toString(); };
    Convert.toFixed = function (c) { return c.toFixed(); };
    Convert.toNumber = Number.parseInt;
    Convert.toData = function (c) { return c.toData(); };
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=convert.js.map