/** `terra-` prefixed account address */
export declare type AccAddress = string;
/** `terravaloper-` prefixed validator operator address */
export declare type ValAddress = string;
/** `terravalcons-` prefixed validator consensus address */
export declare type ValConsAddress = string;
/** `terrapub-` prefixed account public key */
export declare type AccPubKey = string;
/** `terravaloperpub-` prefixed validator public key */
export declare type ValPubKey = string;
/** `terravalconspub-` prefixed validator consensus public key */
export declare type ValConsPubKey = string;
export declare namespace AccAddress {
    /**
     * Checks if a string is a valid Terra account address.
     *
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a validator address into an account address
     *
     * @param address validator address
     */
    function fromValAddress(address: ValAddress): AccAddress;
}
export declare namespace ValAddress {
    /**
     * Checks if a string is a Terra validator address.
     *
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a Terra account address to a validator address.
     * @param address account address to convert
     */
    function fromAccAddress(address: AccAddress): ValAddress;
}
export declare namespace ValConsAddress {
    /**
     * Checks if a string is a Terra validator consensus address
     * @param data string to check
     */
    function validate(data: string): boolean;
}
export declare namespace AccPubKey {
    /**
     * Checks if a string is a Terra validator consensus address
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a Terra validator pubkey to an account pubkey.
     * @param address validator pubkey to convert
     */
    function fromValPubKey(pubkey: ValPubKey): AccPubKey;
}
export declare namespace ValPubKey {
    /**
     * Checks if a string is a Terra validator pubkey
     * @param data string to check
     */
    function validate(data: string): boolean;
    /**
     * Converts a Terra account pubkey to a validator pubkey.
     * @param pubkey account pubkey
     */
    function fromAccPubKey(pubkey: AccPubKey): ValPubKey;
}
export declare namespace ValConsPubKey {
    /**
     * Checks if string is a valid Terra consensus (node) pubkey.
     * @param data string to check
     */
    function validate(data: string): boolean;
}
