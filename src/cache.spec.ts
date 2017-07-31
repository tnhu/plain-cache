import cache from './cache'
import * as assert from 'assert' // Use native NodeJS assert (https://nodejs.org/api/assert.html)

const sleep = (ms: number) => new Promise(resolve => { setTimeout(resolve, ms) })

describe('cache tests', () => {
  it('simple set()', () => {
    cache.set('foo', 'bar')
    assert.equal(cache.get('foo'), 'bar')
  })

  it('set() with ttl = 0', () => {
    cache.set('foo', 'bar', 0)
    assert.equal(cache.get('foo'), null)
  })

  it('set() with ttl = 100ms', async () => {
    cache.set('foo', 'bar', 100)
    assert.equal(cache.get('foo'), 'bar')
    await sleep(100)
    assert.equal(cache.get('foo'), null, 'cache must be cleared when expired')
  })

  it('simple get()', () => {
    cache.set('foo', 'bar')
    assert.equal(cache.get('foo'), 'bar')
  })

  it('get() with default value', () => {
    cache.del('foo')
    cache.get('foo', 'bar')
    assert.equal(cache.get('foo'), 'bar')
  })

  it('get() with default value and ttl = 0', () => {
    cache.del('foo')
    cache.get('foo', 'bar', 0)
    assert.equal(cache.get('foo'), null)
  })

  it('get() with default value and ttl = 100', async () => {
    cache.del('foo')
    const value = cache.get('foo', 'bar', 100)
    assert.equal(value, 'bar')
    await sleep(100)
    assert.equal(cache.get('foo'), null)
  })

  it('del()', () => {
    cache.del('foo')
    const value = cache.get('foo')
    assert.equal(value, null)
  })

  it('clear()', () => {
    cache.set('foo1', 'bar1')
    cache.set('foo2', 'bar2')
    cache.clear()

    assert.equal(cache.get('foo1'), null)
    assert.equal(cache.get('foo2'), null)
  })

  it('gc should work properly', async () => {
    cache.get('foo1', 'bar1', 100)
    cache.set('foo2', 'bar2', 100)
    await sleep(100)
    assert.equal(cache.get('foo1'), null)
    assert.equal(cache.get('foo2'), null)
  })
})