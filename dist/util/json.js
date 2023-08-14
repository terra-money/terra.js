"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNull = exports.JSONSerializable = exports.prepareSignBytes = void 0;
function prepareSignBytes(obj) {
    if (Array.isArray(obj)) {
        return obj.map(prepareSignBytes);
    }
    // string, number, or null
    if (typeof obj !== "object" || obj === null) {
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
    JSONSerializable.prototype.toJSON = function (isClassic) {
        return JSON.stringify(prepareSignBytes(this.toData(isClassic)));
    };
    JSONSerializable.prototype.toAminoJSON = function (isClassic) {
        return JSON.stringify(prepareSignBytes(this.toAmino(isClassic)));
    };
    return JSONSerializable;
}());
exports.JSONSerializable = JSONSerializable;
function removeNull(obj) {
    if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj)
            .filter(function (_a) {
            var v = _a[1];
            return v != null;
        })
            .reduce(function (acc, _a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[k] = v === Object(v) && !Array.isArray(v) ? removeNull(v) : v, _b)));
        }, {});
    }
    return obj;
}
exports.removeNull = removeNull;
//# sourceMappingURL=json.js.map