"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveBurnTaxExemptionAddressProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var gov_1 = require("@classic-terra/terra.proto/terra/treasury/v1beta1/gov");
/**
 * RemoveBurnTaxExemptionAddressProposal gov proposal content type to remove exemption address for burn tax
 */
var RemoveBurnTaxExemptionAddressProposal = /** @class */ (function (_super) {
    __extends(RemoveBurnTaxExemptionAddressProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param addresses the address that are exempt
     */
    function RemoveBurnTaxExemptionAddressProposal(title, description, addresses) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.addresses = addresses;
        return _this;
    }
    RemoveBurnTaxExemptionAddressProposal.fromAmino = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, title = _a.title, description = _a.description, addresses = _a.addresses;
        return new RemoveBurnTaxExemptionAddressProposal(title, description, addresses);
    };
    RemoveBurnTaxExemptionAddressProposal.prototype.toAmino = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, title = _a.title, description = _a.description, addresses = _a.addresses;
        return {
            type: 'treasury/RemoveBurnTaxExemptionAddressProposal',
            value: {
                title: title,
                description: description,
                addresses: addresses,
            },
        };
    };
    RemoveBurnTaxExemptionAddressProposal.fromData = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var title = data.title, description = data.description, addresses = data.addresses;
        return new RemoveBurnTaxExemptionAddressProposal(title, description, addresses);
    };
    RemoveBurnTaxExemptionAddressProposal.prototype.toData = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, title = _a.title, description = _a.description, addresses = _a.addresses;
        return {
            '@type': '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal',
            title: title,
            description: description,
            addresses: addresses,
        };
    };
    RemoveBurnTaxExemptionAddressProposal.fromProto = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new RemoveBurnTaxExemptionAddressProposal(proto.title, proto.description, proto.addresses);
    };
    RemoveBurnTaxExemptionAddressProposal.prototype.toProto = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, title = _a.title, description = _a.description, addresses = _a.addresses;
        return gov_1.RemoveBurnTaxExemptionAddressProposal.fromPartial({
            title: title,
            description: description,
            addresses: addresses,
        });
    };
    RemoveBurnTaxExemptionAddressProposal.prototype.packAny = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal',
            value: gov_1.RemoveBurnTaxExemptionAddressProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    RemoveBurnTaxExemptionAddressProposal.unpackAny = function (msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return RemoveBurnTaxExemptionAddressProposal.fromProto(gov_1.RemoveBurnTaxExemptionAddressProposal.decode(msgAny.value), isClassic);
    };
    return RemoveBurnTaxExemptionAddressProposal;
}(json_1.JSONSerializable));
exports.RemoveBurnTaxExemptionAddressProposal = RemoveBurnTaxExemptionAddressProposal;
//# sourceMappingURL=RemoveBurnTaxExemptionAddressProposal.js.map