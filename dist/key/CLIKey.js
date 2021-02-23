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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIKey = void 0;
var Key_1 = require("./Key");
var core_1 = require("../core");
var child_process_1 = require("child_process");
var tmp_1 = require("tmp");
var fs_1 = require("fs");
/**
 * Key implementation that uses `terracli` to sign transactions. Keys should be registered
 * in `terracli`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
var CLIKey = /** @class */ (function (_super) {
    __extends(CLIKey, _super);
    /**
     *
     * @param keyName name of the key for terracli
     * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
     * @param cliPath (optional) path of terracli
     * @param home (optional) home option for terracli
     */
    function CLIKey(params) {
        var _this = _super.call(this) || this;
        _this.params = params;
        params.cliPath = params.cliPath || 'terracli';
        return _this;
    }
    CLIKey.prototype.generateCommand = function (args) {
        return this.params.cliPath + " " + args + " -o json " + (this.params.home ? "--home " + this.params.home : '');
    };
    CLIKey.prototype.loadAccountDetails = function () {
        var details = JSON.parse(child_process_1.execSync(this.generateCommand("keys show " + this.params.keyName)).toString());
        this._accAddress = details.address;
        this._accPubKey = details.pubkey;
    };
    Object.defineProperty(CLIKey.prototype, "accAddress", {
        /**
         * Terra account address. `terra-` prefixed.
         */
        get: function () {
            if (!this._accAddress) {
                this.loadAccountDetails();
                return this.accAddress;
            }
            return this._accAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLIKey.prototype, "valAddress", {
        /**
         * Terra validator address. `terravaloper-` prefixed.
         */
        get: function () {
            if (!this._accAddress) {
                this.loadAccountDetails();
                return this.valAddress;
            }
            return core_1.ValAddress.fromAccAddress(this._accAddress);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLIKey.prototype, "accPubKey", {
        /**
         * Terra account public key. `terrapub-` prefixed.
         */
        get: function () {
            if (!this._accPubKey) {
                this.loadAccountDetails();
                return this.accPubKey;
            }
            return this._accPubKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CLIKey.prototype, "valPubKey", {
        /**
         * Terra validator public key. `terravaloperpub-` prefixed.
         */
        get: function () {
            if (!this._accPubKey) {
                this.loadAccountDetails();
                return this.valPubKey;
            }
            return core_1.ValPubKey.fromAccPubKey(this._accPubKey);
        },
        enumerable: false,
        configurable: true
    });
    CLIKey.prototype.sign = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('CLIKey does not use sign() -- use createSignature() directly.');
            });
        });
    };
    CLIKey.prototype.createSignature = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpobj, result;
            return __generator(this, function (_a) {
                tmpobj = tmp_1.fileSync({ postfix: '.json' });
                fs_1.writeFileSync(tmpobj.fd, tx.toStdTx().toJSON());
                result = child_process_1.execSync(this.generateCommand("tx sign " + tmpobj.name + " --yes --signature-only --from " + this.params.keyName + " --offline " +
                    ("--chain-id " + tx.chain_id + " --account-number " + tx.account_number + " --sequence " + tx.sequence + " ") +
                    ("" + (this.params.multisig ? "--multisig " + this.params.multisig : '')))).toString();
                tmpobj.removeCallback();
                return [2 /*return*/, core_1.StdSignature.fromData(JSON.parse(result))];
            });
        });
    };
    return CLIKey;
}(Key_1.Key));
exports.CLIKey = CLIKey;
//# sourceMappingURL=CLIKey.js.map