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
exports.TextProposal = void 0;
var json_1 = require("../../../util/json");
/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
var TextProposal = /** @class */ (function (_super) {
    __extends(TextProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     */
    function TextProposal(title, description) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        return _this;
    }
    TextProposal.fromData = function (data) {
        var _a = data.value, title = _a.title, description = _a.description;
        return new TextProposal(title, description);
    };
    TextProposal.prototype.toData = function () {
        var _a = this, title = _a.title, description = _a.description;
        return {
            type: 'gov/TextProposal',
            value: {
                title: title,
                description: description,
            },
        };
    };
    return TextProposal;
}(json_1.JSONSerializable));
exports.TextProposal = TextProposal;
//# sourceMappingURL=TextProposal.js.map