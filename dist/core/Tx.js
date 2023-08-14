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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.Tx = void 0;
var PublicKey_1 = require("./PublicKey");
var signing_1 = require("@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing");
var tx_1 = require("@terra-money/terra.proto/cosmos/tx/v1beta1/tx");
var CompactBitArray_1 = require("./CompactBitArray");
var Msg_1 = require("./Msg");
var Fee_1 = require("./Fee");
var Long = __importStar(require("long"));
var SignatureV2_1 = require("./SignatureV2");
var Tx = /** @class */ (function () {
    function Tx(body, auth_info, signatures) {
        this.body = body;
        this.auth_info = auth_info;
        this.signatures = signatures;
    }
    Tx.fromAmino = function (data, isClassic) {
        var signatures = data.value.signatures.map(function (s) { return SignatureV2_1.SignatureV2.fromAmino(s); });
        return new Tx(new TxBody(data.value.msg.map(function (m) { return Msg_1.Msg.fromAmino(m, isClassic); }), data.value.memo, Number.parseInt(data.value.timeout_height)), new AuthInfo([], Fee_1.Fee.fromAmino(data.value.fee)), signatures.map(function (s) { var _a; return ((_a = s.data.single) === null || _a === void 0 ? void 0 : _a.signature) || ''; }));
    };
    Tx.fromData = function (data, isClassic) {
        return new Tx(TxBody.fromData(data.body, isClassic), AuthInfo.fromData(data.auth_info), data.signatures);
    };
    Tx.prototype.toData = function (isClassic) {
        return {
            body: this.body.toData(isClassic),
            auth_info: this.auth_info.toData(),
            signatures: this.signatures,
        };
    };
    Tx.unpackAny = function (anyProto, isClassic) {
        return this.fromProto(tx_1.Tx.decode(anyProto.value), isClassic);
    };
    Tx.fromProto = function (proto, isClassic) {
        return new Tx(TxBody.fromProto(proto.body, isClassic), AuthInfo.fromProto(proto.authInfo), proto.signatures.map(function (sig) { return Buffer.from(sig).toString('base64'); }));
    };
    Tx.prototype.toProto = function (isClassic) {
        return tx_1.Tx.fromPartial({
            body: this.body.toProto(isClassic),
            authInfo: this.auth_info.toProto(),
            signatures: this.signatures.map(function (s) { return Buffer.from(s, 'base64'); }),
        });
    };
    Tx.prototype.toBytes = function (isClassic) {
        return tx_1.Tx.encode(this.toProto(isClassic)).finish();
    };
    Tx.fromBuffer = function (buf, isClassic) {
        return Tx.fromProto(tx_1.Tx.decode(buf), isClassic);
    };
    Tx.prototype.appendEmptySignatures = function (signers) {
        var _this = this;
        signers.forEach(function (signer) {
            var signerInfo;
            if (signer.publicKey) {
                if (signer.publicKey instanceof PublicKey_1.LegacyAminoMultisigPublicKey) {
                    signerInfo = new SignerInfo(signer.publicKey, signer.sequenceNumber, new ModeInfo(new ModeInfo.Multi(CompactBitArray_1.CompactBitArray.fromBits(signer.publicKey.pubkeys.length), [])));
                }
                else {
                    signerInfo = new SignerInfo(signer.publicKey, signer.sequenceNumber, new ModeInfo(new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT)));
                }
            }
            else {
                signerInfo = new SignerInfo(new PublicKey_1.SimplePublicKey(''), signer.sequenceNumber, new ModeInfo(new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT)));
            }
            _this.auth_info.signer_infos.push(signerInfo);
            _this.signatures.push('');
        });
    };
    Tx.prototype.clearSignatures = function () {
        this.auth_info.signer_infos = [];
        this.signatures = [];
    };
    Tx.prototype.appendSignatures = function (signatures) {
        for (var _i = 0, signatures_1 = signatures; _i < signatures_1.length; _i++) {
            var signature = signatures_1[_i];
            var _a = signature.data.toModeInfoAndSignature(), modeInfo = _a[0], sigBytes = _a[1];
            this.signatures.push(Buffer.from(sigBytes).toString('base64'));
            this.auth_info.signer_infos.push(new SignerInfo(signature.public_key, signature.sequence, modeInfo));
        }
    };
    return Tx;
}());
exports.Tx = Tx;
var TxBody = /** @class */ (function () {
    function TxBody(messages, memo, timeout_height) {
        this.messages = messages;
        this.memo = memo;
        this.timeout_height = timeout_height;
    }
    TxBody.fromData = function (data, isClassic) {
        return new TxBody(data.messages.map(function (m) { return Msg_1.Msg.fromData(m, isClassic); }), data.memo, Number.parseInt(data.timeout_height));
    };
    TxBody.prototype.toData = function (isClassic) {
        var _a, _b;
        return {
            memo: (_a = this.memo) !== null && _a !== void 0 ? _a : '',
            messages: this.messages.map(function (m) { return m.toData(isClassic); }),
            timeout_height: ((_b = this.timeout_height) !== null && _b !== void 0 ? _b : 0).toFixed(),
        };
    };
    TxBody.fromProto = function (proto, isClassic) {
        return new TxBody(proto.messages.map(function (m) { return Msg_1.Msg.fromProto(m, isClassic); }), proto.memo, proto.timeoutHeight.toNumber());
    };
    TxBody.prototype.toProto = function (isClassic) {
        var _a;
        return tx_1.TxBody.fromPartial({
            memo: this.memo,
            messages: this.messages.map(function (m) { return m.packAny(isClassic); }),
            timeoutHeight: Long.fromNumber((_a = this.timeout_height) !== null && _a !== void 0 ? _a : 0),
        });
    };
    TxBody.prototype.toBytes = function (isClassic) {
        return tx_1.TxBody.encode(this.toProto(isClassic)).finish();
    };
    return TxBody;
}());
exports.TxBody = TxBody;
var AuthInfo = /** @class */ (function () {
    function AuthInfo(signer_infos, fee) {
        this.signer_infos = signer_infos;
        this.fee = fee;
    }
    AuthInfo.fromData = function (data) {
        return new AuthInfo(data.signer_infos.map(function (s) { return SignerInfo.fromData(s); }), Fee_1.Fee.fromData(data.fee));
    };
    AuthInfo.prototype.toData = function () {
        return {
            fee: this.fee.toData(),
            signer_infos: this.signer_infos.map(function (info) { return info.toData(); }),
        };
    };
    AuthInfo.fromProto = function (proto) {
        return new AuthInfo(proto.signerInfos.map(function (s) { return SignerInfo.fromProto(s); }), Fee_1.Fee.fromProto(proto.fee));
    };
    AuthInfo.prototype.toProto = function () {
        return tx_1.AuthInfo.fromPartial({
            fee: this.fee.toProto(),
            signerInfos: this.signer_infos.map(function (info) { return info.toProto(); }),
        });
    };
    AuthInfo.prototype.toBytes = function () {
        return tx_1.AuthInfo.encode(this.toProto()).finish();
    };
    return AuthInfo;
}());
exports.AuthInfo = AuthInfo;
var SignerInfo = /** @class */ (function () {
    function SignerInfo(public_key, sequence, mode_info) {
        this.public_key = public_key;
        this.sequence = sequence;
        this.mode_info = mode_info;
    }
    SignerInfo.fromData = function (data) {
        var _a;
        return new SignerInfo(PublicKey_1.PublicKey.fromData((_a = data.public_key) !== null && _a !== void 0 ? _a : new PublicKey_1.SimplePublicKey('').toData()), Number.parseInt(data.sequence), ModeInfo.fromData(data.mode_info));
    };
    SignerInfo.prototype.toData = function () {
        var _a = this, public_key = _a.public_key, sequence = _a.sequence, mode_info = _a.mode_info;
        return {
            mode_info: mode_info.toData(),
            public_key: (public_key === null || public_key === void 0 ? void 0 : public_key.toData()) || null,
            sequence: sequence.toFixed(),
        };
    };
    SignerInfo.fromProto = function (proto) {
        var _a;
        return new SignerInfo(PublicKey_1.PublicKey.fromProto((_a = proto.publicKey) !== null && _a !== void 0 ? _a : new PublicKey_1.SimplePublicKey('').packAny()), proto.sequence.toNumber(), ModeInfo.fromProto(proto.modeInfo));
    };
    SignerInfo.prototype.toProto = function () {
        var _a = this, public_key = _a.public_key, sequence = _a.sequence, mode_info = _a.mode_info;
        return tx_1.SignerInfo.fromPartial({
            modeInfo: mode_info.toProto(),
            publicKey: public_key === null || public_key === void 0 ? void 0 : public_key.packAny(),
            sequence: Long.fromNumber(sequence),
        });
    };
    return SignerInfo;
}());
exports.SignerInfo = SignerInfo;
var ModeInfo = /** @class */ (function () {
    function ModeInfo(mode_info) {
        if (mode_info instanceof ModeInfo.Single) {
            this.single = mode_info;
        }
        else {
            this.multi = mode_info;
        }
    }
    ModeInfo.fromData = function (data) {
        if (data.single) {
            return new ModeInfo(ModeInfo.Single.fromData(data.single));
        }
        if (data.multi) {
            return new ModeInfo(ModeInfo.Multi.fromData(data.multi));
        }
        throw new Error('must be one of single or multi');
    };
    ModeInfo.prototype.toData = function () {
        var _a, _b;
        return {
            single: (_a = this.single) === null || _a === void 0 ? void 0 : _a.toData(),
            multi: (_b = this.multi) === null || _b === void 0 ? void 0 : _b.toData(),
        };
    };
    ModeInfo.fromProto = function (proto) {
        var singleMode = proto.single;
        var multiMode = proto.multi;
        return new ModeInfo(singleMode
            ? ModeInfo.Single.fromProto(singleMode)
            : ModeInfo.Multi.fromProto(multiMode));
    };
    ModeInfo.prototype.toProto = function () {
        var _a, _b;
        return tx_1.ModeInfo.fromPartial({
            multi: (_a = this.multi) === null || _a === void 0 ? void 0 : _a.toProto(),
            single: (_b = this.single) === null || _b === void 0 ? void 0 : _b.toProto(),
        });
    };
    return ModeInfo;
}());
exports.ModeInfo = ModeInfo;
(function (ModeInfo) {
    ModeInfo.SignMode = signing_1.SignMode;
    var Single = /** @class */ (function () {
        function Single(mode) {
            this.mode = mode;
        }
        Single.fromData = function (data) {
            return new Single((0, signing_1.signModeFromJSON)(data.mode));
        };
        Single.prototype.toData = function () {
            return {
                mode: (0, signing_1.signModeToJSON)(this.mode),
            };
        };
        Single.fromProto = function (proto) {
            return new Single(proto.mode);
        };
        Single.prototype.toProto = function () {
            return tx_1.ModeInfo_Single.fromPartial({
                mode: this.mode,
            });
        };
        return Single;
    }());
    ModeInfo.Single = Single;
    var Multi = /** @class */ (function () {
        function Multi(bitarray, modeInfos) {
            this.bitarray = bitarray;
            this.modeInfos = modeInfos;
        }
        Multi.fromData = function (proto) {
            return new Multi(CompactBitArray_1.CompactBitArray.fromData(proto.bitarray), proto.mode_infos.map(function (m) { return ModeInfo.fromData(m); }));
        };
        Multi.prototype.toData = function () {
            return {
                bitarray: this.bitarray.toData(),
                mode_infos: this.modeInfos.map(function (m) { return m.toData(); }),
            };
        };
        Multi.fromProto = function (proto) {
            return new Multi(CompactBitArray_1.CompactBitArray.fromProto(proto.bitarray), proto.modeInfos.map(function (m) { return ModeInfo.fromProto(m); }));
        };
        Multi.prototype.toProto = function () {
            return tx_1.ModeInfo_Multi.fromPartial({
                bitarray: this.bitarray.toProto(),
                modeInfos: this.modeInfos.map(function (m) { return m.toProto(); }),
            });
        };
        return Multi;
    }());
    ModeInfo.Multi = Multi;
})(ModeInfo = exports.ModeInfo || (exports.ModeInfo = {}));
exports.ModeInfo = ModeInfo;
//# sourceMappingURL=Tx.js.map