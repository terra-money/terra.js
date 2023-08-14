export declare function prepareSignBytes(obj: any): any;
export declare abstract class JSONSerializable<A, D, P> {
    abstract toAmino(isClassic?: boolean): A;
    abstract toData(isClassic?: boolean): D;
    abstract toProto(isClassic?: boolean): P;
    toJSON(isClassic?: boolean): string;
    toAminoJSON(isClassic?: boolean): string;
}
export declare function removeNull(obj: any): any;
