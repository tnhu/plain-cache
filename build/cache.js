"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GC_INTERVAL = 1000 * 60; // Interval Schedule to invalidate cache in every 60 secs
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
exports.default = { set: set, get: get, del: del, clear: clear };
//# sourceMappingURL=cache.js.map