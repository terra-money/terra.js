"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractEvents = exports.getContractAddress = exports.getCodeId = void 0;
var TxAPI_1 = require("../client/lcd/api/TxAPI");
function getCodeId(txResult, msgIndex) {
    if (msgIndex === void 0) { msgIndex = 0; }
    if ((0, TxAPI_1.isTxError)(txResult) ||
        txResult.logs === undefined ||
        txResult.logs.length === 0) {
        throw new Error('could not parse code id -- tx logs are empty.');
    }
    var codeId = txResult.logs[msgIndex].eventsByType['store_code']['code_id'][0];
    return codeId;
}
exports.getCodeId = getCodeId;
function getContractAddress(txResult, msgIndex, isClassic) {
    if (msgIndex === void 0) { msgIndex = 0; }
    if (isClassic === void 0) { isClassic = false; }
    if ((0, TxAPI_1.isTxError)(txResult) ||
        txResult.logs === undefined ||
        txResult.logs.length === 0) {
        throw new Error('could not parse contract address -- tx logs are empty.');
    }
    var eventName;
    var attributeKey;
    if (isClassic) {
        eventName = 'instantiate_contract';
        attributeKey = 'contract_address';
    }
    else {
        eventName = 'wasm';
        attributeKey = '_contract_address';
    }
    var contractAddress = txResult.logs[msgIndex].eventsByType[eventName][attributeKey][0];
    return contractAddress;
}
exports.getContractAddress = getContractAddress;
function getContractEvents(txResult, msgIndex, isClassic) {
    if (msgIndex === void 0) { msgIndex = 0; }
    if (isClassic === void 0) { isClassic = false; }
    if ((0, TxAPI_1.isTxError)(txResult) ||
        txResult.logs === undefined ||
        txResult.logs.length === 0) {
        throw new Error('could not parse contract events -- tx logs are empty.');
    }
    var eventName;
    var attributeKey;
    if (isClassic) {
        eventName = 'from_contract';
        attributeKey = 'contract_address';
    }
    else {
        eventName = 'instantiate';
        attributeKey = '_contract_address';
    }
    var contractEvents = [];
    for (var _i = 0, _a = txResult.logs[msgIndex].events; _i < _a.length; _i++) {
        var event_1 = _a[_i];
        if (event_1.type === eventName) {
            var eventData = { contract_address: '' }; // will be overwritten
            var currentContractAddress = event_1.attributes[0].value;
            for (var _b = 0, _c = event_1.attributes; _b < _c.length; _b++) {
                var att = _c[_b];
                if (att.key == attributeKey && currentContractAddress !== att.value) {
                    contractEvents.push(eventData);
                    eventData = { contract_address: '' };
                    currentContractAddress = att.value;
                }
                eventData[att.key] = att.value;
            }
            contractEvents.push(eventData);
            return contractEvents;
        }
    }
    throw new Error("could not find event type ".concat(eventName, " in logs"));
}
exports.getContractEvents = getContractEvents;
//# sourceMappingURL=contract.js.map