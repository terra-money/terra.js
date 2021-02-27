import { JSONSerializable } from '../../../util/json';
/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export declare class TextProposal extends JSONSerializable<TextProposal.Data> {
    title: string;
    description: string;
    /**
     * @param title proposal's title
     * @param description proposal's description
     */
    constructor(title: string, description: string);
    static fromData(data: TextProposal.Data): TextProposal;
    toData(): TextProposal.Data;
}
export declare namespace TextProposal {
    interface Data {
        type: 'gov/TextProposal';
        value: {
            title: string;
            description: string;
        };
    }
}
