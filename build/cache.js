"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GC_INTERVAL = 1000 * 60 * 5; // gc runs in every 5 minutes
var data = {};
/**
 * Get cache
 * @param key Key
 * @param defaultValue Default value for the key, optional
 * @param ttl TTL for defaultValue, optional
 */
function get(key, defaultValue, ttl) {
    if (ttl === void 0) { ttl = Infinity; }
    var entry = data[key];
    var value = entry ? (entry.expired > +new Date() ? entry.value : null) : null;
    if (value === null && defaultValue !== undefined) {
        set(key, defaultValue, ttl);
        value = defaultValue;
    }
    return value;
}
exports.get = get;
/**
 * Set cache
 * @param key Key
 * @param value Value
 * @param ttl Time to live, default is forever
 */
function set(key, value, ttl) {
    if (ttl === void 0) { ttl = Infinity; }
    data[key] = {
        value: value,
        expired: +new Date() + ttl
    };
}
exports.set = set;
/**
 * Delete a cache
 * @param key cache key
 */
function del(key) {
    if (data[key]) {
        delete data[key];
    }
}
exports.del = del;
/**
 * Remove all cache entries
 */
function clear() {
    data = {};
}
exports.clear = clear;
setTimeout(function gc() {
    var now = +new Date();
    Object.keys(data).forEach(function (key) {
        var expired = data[key].expired;
        if (expired !== Infinity && expired <= now) {
            delete data[key];
        }
    });
    setTimeout(gc, GC_INTERVAL);
}, GC_INTERVAL);
exports.default = {
    set: set, get: get, del: del, clear: clear,
    VALID_FOR_10_SECONDS: 10000,
    VALID_FOR_30_SECONDS: 30000,
    VALID_FOR_A_MINUTE: 60000,
    VALID_FOR_5_MINUTES: 300000,
    VALID_FOR_10_MINUTES: 600000,
    VALID_FOR_30_MINUTES: 1800000,
    VALID_FOR_AN_HOUR: 3600000,
    VALID_FOR_A_DAY: 3600000 * 24,
    VALID_FOR_A_WEEK: 3600000 * 24 * 7,
    VALID_FOR_30_DAYS: 3600000 * 24 * 30,
    VALID_FOREVER: Infinity
};
//# sourceMappingURL=cache.js.map