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
exports.ClientUpdateProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
/**
 * Proposal that allows updating IBC clients. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client.
 */
var ClientUpdateProposal = /** @class */ (function (_super) {
    __extends(ClientUpdateProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param subjectClientId client to update
     * @param substituteClientId client to copy
     */
    function ClientUpdateProposal(title, description, subjectClientId, substituteClientId) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.subjectClientId = subjectClientId;
        _this.substituteClientId = substituteClientId;
        return _this;
    }
    ClientUpdateProposal.fromAmino = function (data, _) {
        _;
        var _a = data.value, title = _a.title, description = _a.description, subjectClientId = _a.subjectClientId, substituteClientId = _a.substituteClientId;
        return new ClientUpdateProposal(title, description, subjectClientId, substituteClientId);
    };
    ClientUpdateProposal.prototype.toAmino = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, subjectClientId = _a.subjectClientId, substituteClientId = _a.substituteClientId;
        return {
            type: 'ibc/ClientUpdateProposal',
            value: {
                title: title,
                description: description,
                subjectClientId: subjectClientId,
                substituteClientId: substituteClientId,
            },
        };
    };
    ClientUpdateProposal.fromData = function (data, _) {
        _;
        var title = data.title, description = data.description, subject_client_id = data.subject_client_id, substitute_client_id = data.substitute_client_id;
        return new ClientUpdateProposal(title, description, subject_client_id, substitute_client_id);
    };
    ClientUpdateProposal.prototype.toData = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, subjectClientId = _a.subjectClientId, substituteClientId = _a.substituteClientId;
        return {
            '@type': '/ibc.core.client.v1.ClientUpdateProposal',
            title: title,
            description: description,
            subject_client_id: subjectClientId,
            substitute_client_id: substituteClientId,
        };
    };
    ClientUpdateProposal.fromProto = function (proto, _) {
        _;
        return new ClientUpdateProposal(proto.title, proto.description, proto.subjectClientId, proto.substituteClientId);
    };
    ClientUpdateProposal.prototype.toProto = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, subjectClientId = _a.subjectClientId, substituteClientId = _a.substituteClientId;
        return client_1.ClientUpdateProposal.fromPartial({
            subjectClientId: subjectClientId,
            substituteClientId: substituteClientId,
            description: description,
            title: title,
        });
    };
    ClientUpdateProposal.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.ClientUpdateProposal',
            value: client_1.ClientUpdateProposal.encode(this.toProto()).finish(),
        });
    };
    ClientUpdateProposal.unpackAny = function (msgAny, _) {
        _;
        return ClientUpdateProposal.fromProto(client_1.ClientUpdateProposal.decode(msgAny.value));
    };
    return ClientUpdateProposal;
}(json_1.JSONSerializable));
exports.ClientUpdateProposal = ClientUpdateProposal;
//# sourceMappingURL=ClientUpdateProposal.js.map