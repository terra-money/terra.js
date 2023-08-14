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
exports.MsgRegisterCounterpartyAddress = void 0;
var json_1 = require("../../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/tx");
/**
 * MsgRegisterCounterpartyAddress defines the request type for the RegisterCounterpartyAddress rpc
 */
var MsgRegisterCounterpartyAddress = /** @class */ (function (_super) {
    __extends(MsgRegisterCounterpartyAddress, _super);
    /**
     * @param address the relayer address
     * @param counterparty_adress the counterparty relayer address
     * @param channel_id unique channel identifier
     */
    function MsgRegisterCounterpartyAddress(address, counterparty_address, channel_id) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.counterparty_address = counterparty_address;
        _this.channel_id = channel_id;
        return _this;
    }
    MsgRegisterCounterpartyAddress.fromAmino = function (_, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        _;
        throw new Error('Amino not supported');
    };
    MsgRegisterCounterpartyAddress.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        throw new Error('Amino not supported');
    };
    MsgRegisterCounterpartyAddress.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var address = data.address, counterparty_address = data.counterparty_address, channel_id = data.channel_id;
        return new MsgRegisterCounterpartyAddress(address, counterparty_address, channel_id);
    };
    MsgRegisterCounterpartyAddress.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, address = _a.address, counterparty_address = _a.counterparty_address, channel_id = _a.channel_id;
        return {
            '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
            address: address,
            counterparty_address: counterparty_address,
            channel_id: channel_id,
        };
    };
    MsgRegisterCounterpartyAddress.fromProto = function (proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgRegisterCounterpartyAddress(proto.address, proto.counterpartyAddress, proto.channelId);
    };
    MsgRegisterCounterpartyAddress.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, address = _a.address, counterparty_address = _a.counterparty_address, channel_id = _a.channel_id;
        return tx_1.MsgRegisterCounterpartyAddress.fromPartial({
            address: address,
            counterpartyAddress: counterparty_address,
            channelId: channel_id,
        });
    };
    MsgRegisterCounterpartyAddress.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
            value: tx_1.MsgRegisterCounterpartyAddress.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgRegisterCounterpartyAddress.unpackAny = function (msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgRegisterCounterpartyAddress.fromProto(tx_1.MsgRegisterCounterpartyAddress.decode(msgAny.value));
    };
    return MsgRegisterCounterpartyAddress;
}(json_1.JSONSerializable));
exports.MsgRegisterCounterpartyAddress = MsgRegisterCounterpartyAddress;
//# sourceMappingURL=MsgRegisterCounterpartAddress.js.map