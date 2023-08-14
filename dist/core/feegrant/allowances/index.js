"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allowance = void 0;
var BasicAllowance_1 = require("./BasicAllowance");
var PeriodicAllowance_1 = require("./PeriodicAllowance");
var AllowedMsgAllowance_1 = require("./AllowedMsgAllowance");
__exportStar(require("./BasicAllowance"), exports);
__exportStar(require("./PeriodicAllowance"), exports);
__exportStar(require("./AllowedMsgAllowance"), exports);
var Allowance;
(function (Allowance) {
    function fromAmino(data, isClassic) {
        switch (data.type) {
            case 'feegrant/BasicAllowance':
            case 'cosmos-sdk/BasicAllowance':
                return BasicAllowance_1.BasicAllowance.fromAmino(data, isClassic);
            case 'feegrant/PeriodicAllowance':
            case 'cosmos-sdk/PeriodicAllowance':
                return PeriodicAllowance_1.PeriodicAllowance.fromAmino(data, isClassic);
            case 'feegrant/AllowedMsgAllowance':
            case 'cosmos-sdk/AllowedMsgAllowance':
                return AllowedMsgAllowance_1.AllowedMsgAllowance.fromAmino(data, isClassic);
        }
    }
    Allowance.fromAmino = fromAmino;
    function fromData(data, isClassic) {
        switch (data['@type']) {
            case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
                return PeriodicAllowance_1.PeriodicAllowance.fromData(data, isClassic);
            case '/cosmos.feegrant.v1beta1.BasicAllowance':
                return BasicAllowance_1.BasicAllowance.fromData(data, isClassic);
            case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
                return AllowedMsgAllowance_1.AllowedMsgAllowance.fromData(data, isClassic);
        }
    }
    Allowance.fromData = fromData;
    function fromProto(proto, isClassic) {
        switch (proto.typeUrl) {
            case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
                return PeriodicAllowance_1.PeriodicAllowance.unpackAny(proto, isClassic);
            case '/cosmos.feegrant.v1beta1.BasicAllowance':
                return BasicAllowance_1.BasicAllowance.unpackAny(proto, isClassic);
            case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
                return AllowedMsgAllowance_1.AllowedMsgAllowance.unpackAny(proto, isClassic);
        }
        throw new Error("not supported allowance ".concat(proto.typeUrl));
    }
    Allowance.fromProto = fromProto;
})(Allowance = exports.Allowance || (exports.Allowance = {}));
//# sourceMappingURL=index.js.map