import { JSONSerializable } from '../../../util/json';
import { Dec } from '../../numeric';
/**
 * A proposal for a direct and immediate change to the treasury's tax rate state, which
 * governs transaction fees. If passed, the new tax rate is put into effect immediately,
 * after clamping.
 */
export declare class TaxRateUpdateProposal extends JSONSerializable<TaxRateUpdateProposal.Data> {
    title: string;
    description: string;
    tax_rate: Dec;
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param tax_rate new proposed value for tax rate.
     */
    constructor(title: string, description: string, tax_rate: Dec);
    static fromData(data: TaxRateUpdateProposal.Data): TaxRateUpdateProposal;
    toData(): TaxRateUpdateProposal.Data;
}
export declare namespace TaxRateUpdateProposal {
    interface Data {
        type: 'treasury/TaxRateUpdateProposal';
        value: {
            title: string;
            description: string;
            tax_rate: string;
        };
    }
}
