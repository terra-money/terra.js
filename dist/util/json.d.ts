export declare function prepareSignBytes(obj: any): any;
export declare abstract class JSONSerializable<T> {
    abstract toData(): T;
    toJSON(): string;
}
