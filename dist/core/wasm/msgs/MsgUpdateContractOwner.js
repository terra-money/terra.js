"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateContractOwner = void 0;
var json_1 = require("../../../util/json");
var MsgUpdateContractOwner = /** @class */ (function (_super) {
    __extends(MsgUpdateContractOwner, _super);
    /**
     * @param owner contract owner
     * @param new_owner new owner
     * @param contract contract address
     */
    function MsgUpdateContractOwner(owner, new_owner, contract) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.new_owner = new_owner;
        _this.contract = contract;
        return _this;
    }
    MsgUpdateContractOwner.fromData = function (data) {
        var _a = data.value, owner = _a.owner, new_owner = _a.new_owner, contract = _a.contract;
        return new MsgUpdateContractOwner(owner, new_owner, contract);
    };
    MsgUpdateContractOwner.prototype.toData = function () {
        var _a = this, owner = _a.owner, new_owner = _a.new_owner, contract = _a.contract;
        return {
            type: 'wasm/MsgUpdateContractOwner',
            value: {
                owner: owner,
                new_owner: new_owner,
                contract: contract,
            },
        };
    };
    return MsgUpdateContractOwner;
}(json_1.JSONSerializable));
exports.MsgUpdateContractOwner = MsgUpdateContractOwner;
//# sourceMappingURL=MsgUpdateContractOwner.js.map