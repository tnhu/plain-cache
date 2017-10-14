/**
 * Get cache
 * @param key Key
 * @param defaultValue Default value for the key, optional
 * @param ttl TTL for defaultValue, optional
 */
export declare function get(key: string, defaultValue?: any, ttl?: number): any;
/**
 * Set cache
 * @param key Key
 * @param value Value
 * @param ttl Time to live, default is forever
 */
export declare function set(key: string, value: any, ttl?: number): void;
/**
 * Delete a cache
 * @param key cache key
 */
export declare function del(key: string): void;
/**
 * Remove all cache entries
 */
export declare function clear(): void;
declare const _default: {
    set: (key: string, value: any, ttl?: number) => void;
    get: (key: string, defaultValue?: any, ttl?: number) => any;
    del: (key: string) => void;
    clear: () => void;
    VALID_FOR_10_SECONDS: number;
    VALID_FOR_30_SECONDS: number;
    VALID_FOR_A_MINUTE: number;
    VALID_FOR_5_MINUTES: number;
    VALID_FOR_10_MINUTES: number;
    VALID_FOR_30_MINUTES: number;
    VALID_FOR_AN_HOUR: number;
    VALID_FOR_A_DAY: number;
    VALID_FOR_A_WEEK: number;
    VALID_FOR_30_DAYS: number;
    VALID_FOREVER: number;
};
export default _default;
