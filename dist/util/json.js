"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSerializable = exports.prepareSignBytes = void 0;
function prepareSignBytes(obj) {
    if (Array.isArray(obj)) {
        return obj.map(prepareSignBytes);
    }
    // string or number
    if (typeof obj !== "object") {
        return obj;
    }
    var sorted = {};
    Object.keys(obj)
        .sort()
        .forEach(function (key) {
        if (obj[key] === undefined || obj[key] === null)
            return;
        sorted[key] = prepareSignBytes(obj[key]);
    });
    return sorted;
}
exports.prepareSignBytes = prepareSignBytes;
var JSONSerializable = /** @class */ (function () {
    function JSONSerializable() {
    }
    JSONSerializable.prototype.toJSON = function () {
        return JSON.stringify(prepareSignBytes(this.toData()));
    };
    return JSONSerializable;
}());
exports.JSONSerializable = JSONSerializable;
//# sourceMappingURL=json.js.map