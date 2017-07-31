## plain-cache

Plain-simple, in-memory, tiny-in-size (less than 500 bytes when minified + gzipped) cache library, runs on both browser and NodeJS environments.

### Install

`npm i --save plain-cache`

### Samples

```javascript
const cache = require('plain-cache')
```

or

```javascript
import cache from 'plain-cache'
```

```javascript
// Set cache with key = `foo`, value = `bar`, expired in 3 seconds
cache.set('foo', 'bar', 3000)

// Get back cache with key `foo`
cache.get('foo') // === 'bar'

// get() accepts default value and ttl
cache.get('foo', 'bar') // if cache with key = `foo` not found, set it to `bar`

// get() also accepts ttl
cache.get('foo', 'bar', 3000)

// Delete cache with key `foo`
cache.del('foo')

// Clear cache (everything is removed)
cache.clear()
```

### Test

To run unit tests locally:

`npm test`

### License

MIT