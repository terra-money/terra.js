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
exports.MsgMigrateContract = void 0;
var json_1 = require("../../../util/json");
var MsgMigrateContract = /** @class */ (function (_super) {
    __extends(MsgMigrateContract, _super);
    /**
     * @param owner contract owner
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    function MsgMigrateContract(owner, contract, new_code_id, migrate_msg // json object
    ) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.contract = contract;
        _this.new_code_id = new_code_id;
        _this.migrate_msg = migrate_msg;
        return _this;
    }
    MsgMigrateContract.fromData = function (data) {
        var _a = data.value, owner = _a.owner, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        return new MsgMigrateContract(owner, contract, Number.parseInt(new_code_id), JSON.parse(Buffer.from(migrate_msg, 'base64').toString()));
    };
    MsgMigrateContract.prototype.toData = function () {
        var _a = this, owner = _a.owner, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        return {
            type: 'wasm/MsgMigrateContract',
            value: {
                owner: owner,
                contract: contract,
                new_code_id: new_code_id.toFixed(),
                migrate_msg: Buffer.from(JSON.stringify(migrate_msg)).toString('base64'),
            },
        };
    };
    return MsgMigrateContract;
}(json_1.JSONSerializable));
exports.MsgMigrateContract = MsgMigrateContract;
//# sourceMappingURL=MsgMigrateContract.js.map