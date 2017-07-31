type CachedItem = {
  [key: string]: any
}

const GC_INTERVAL = 1000 * 60 * 5 // gc runs in every 5 minutes

let data: CachedItem = {}

/**
 * Get cache
 * @param key Key
 * @param defaultValue Default value for the key, optional
 * @param ttl TTL for defaultValue, optional
 */
export function get(key: string, defaultValue?: any, ttl: number = Infinity): any {
  const entry = data[key]
  let value = entry ? (entry.expired > +new Date() ? entry.value : null) : null

  if (value === null && defaultValue !== undefined) {
    set(key, defaultValue, ttl)
    value = defaultValue
  }

  return value
}

/**
 * Set cache
 * @param key Key
 * @param value Value
 * @param ttl Time to live, default is forever
 */
export function set(key: string, value: any, ttl: number = Infinity) {
  data[key] = {
    value: value,
    expired: +new Date() + ttl
  }
}

/**
 * Delete a cache
 * @param key cache key
 */
export function del(key: string) {
  if (data[key]) {
    delete data[key]
  }
}

/**
 * Remove all cache entries
 */
export function clear() {
  data = {}
}

setTimeout(function gc() {
  const now = +new Date()

  Object.keys(data).forEach(function(key) {
    const { expired } = data[key]

    if (expired !== Infinity && expired <= now) {
      delete data[key]
    }
  })

  setTimeout(gc, GC_INTERVAL)
}, GC_INTERVAL)

export default { set, get, del, clear }