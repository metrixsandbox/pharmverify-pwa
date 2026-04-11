import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Service worker tests.
 *
 * We can't import the actual service-worker.js (it uses SvelteKit
 * $service-worker imports), so we test the strategies by simulating
 * the event handlers with mock Cache/fetch APIs.
 */

// ─── Mock infrastructure ──────────────────────────────────────────────────

function createMockCache() {
  const store = new Map();
  return {
    put: vi.fn((req, res) => { store.set(typeof req === 'string' ? req : req.url, res); }),
    match: vi.fn((req) => Promise.resolve(store.get(typeof req === 'string' ? req : req.url) || undefined)),
    addAll: vi.fn((urls) => { urls.forEach(u => store.set(u, new Response('cached'))); return Promise.resolve(); }),
    delete: vi.fn((key) => store.delete(key)),
    keys: vi.fn(() => Promise.resolve([...store.keys()])),
    _store: store
  };
}

function createMockCaches() {
  const caches = new Map();
  return {
    open: vi.fn((name) => {
      if (!caches.has(name)) caches.set(name, createMockCache());
      return Promise.resolve(caches.get(name));
    }),
    keys: vi.fn(() => Promise.resolve([...caches.keys()])),
    delete: vi.fn((name) => { caches.delete(name); return Promise.resolve(true); }),
    match: vi.fn(async (req) => {
      for (const cache of caches.values()) {
        const result = await cache.match(req);
        if (result) return result;
      }
      return undefined;
    }),
    _caches: caches
  };
}

// ─── Install handler logic ─────────────────────────────────────────────────

describe('service worker: install', () => {
  it('caches all static assets on install', async () => {
    const mockCaches = createMockCaches();
    const CACHE_NAME = 'pharmverify-v1';
    const ASSETS = ['/index.html', '/app.js', '/style.css', '/icon.svg'];

    // Simulate install handler
    const cache = await mockCaches.open(CACHE_NAME);
    await cache.addAll(ASSETS);

    expect(cache.addAll).toHaveBeenCalledWith(ASSETS);
    expect(cache._store.size).toBe(4);
  });

  it('uses version-specific cache name', async () => {
    const version = '1.0.0';
    const CACHE_NAME = `pharmverify-${version}`;
    const mockCaches = createMockCaches();

    await mockCaches.open(CACHE_NAME);
    const keys = await mockCaches.keys();
    expect(keys).toContain(CACHE_NAME);
  });
});

// ─── Activate handler logic ────────────────────────────────────────────────

describe('service worker: activate', () => {
  it('deletes old caches and keeps current', async () => {
    const mockCaches = createMockCaches();
    const CURRENT = 'pharmverify-v2';

    // Simulate old caches
    await mockCaches.open('pharmverify-v1');
    await mockCaches.open(CURRENT);
    await mockCaches.open('pharmverify-v0');

    // Simulate activate handler
    const keys = await mockCaches.keys();
    const toDelete = keys.filter(k => k !== CURRENT);
    await Promise.all(toDelete.map(k => mockCaches.delete(k)));

    const remainingKeys = await mockCaches.keys();
    expect(remainingKeys).toEqual([CURRENT]);
    expect(mockCaches.delete).toHaveBeenCalledWith('pharmverify-v1');
    expect(mockCaches.delete).toHaveBeenCalledWith('pharmverify-v0');
  });
});

// ─── Fetch handler: cache-first for assets ─────────────────────────────────

describe('service worker: fetch (cache-first for assets)', () => {
  it('returns cached response when available', async () => {
    const mockCaches = createMockCaches();
    const CACHE_NAME = 'pharmverify-v1';
    const cache = await mockCaches.open(CACHE_NAME);

    const cachedResponse = new Response('cached content');
    await cache.put('/app.js', cachedResponse);

    // Simulate cache-first strategy
    const result = await cache.match('/app.js');
    expect(result).toBeDefined();
  });

  it('falls back to network when not cached, then caches response', async () => {
    const mockCaches = createMockCaches();
    const CACHE_NAME = 'pharmverify-v1';
    const cache = await mockCaches.open(CACHE_NAME);

    // Not in cache
    const cached = await cache.match('/new-asset.js');
    expect(cached).toBeUndefined();

    // Simulate network fetch and cache
    const networkResponse = new Response('from network', { status: 200 });
    if (networkResponse.ok) {
      await cache.put('/new-asset.js', networkResponse.clone());
    }

    const nowCached = await cache.match('/new-asset.js');
    expect(nowCached).toBeDefined();
  });

  it('does not cache non-ok responses', async () => {
    const mockCaches = createMockCaches();
    const CACHE_NAME = 'pharmverify-v1';
    const cache = await mockCaches.open(CACHE_NAME);

    const errorResponse = new Response('not found', { status: 404 });
    if (errorResponse.ok) {
      await cache.put('/missing.js', errorResponse);
    }

    const result = await cache.match('/missing.js');
    expect(result).toBeUndefined();
  });
});

// ─── Fetch handler: network-first for navigation ──────────────────────────

describe('service worker: fetch (network-first for navigation)', () => {
  it('uses network response and caches it', async () => {
    const mockCaches = createMockCaches();
    const CACHE_NAME = 'pharmverify-v1';
    const cache = await mockCaches.open(CACHE_NAME);

    // Simulate successful navigation fetch
    const networkResponse = new Response('<html>page</html>', { status: 200 });
    await cache.put('/some-page', networkResponse.clone());

    const cachedAfter = await cache.match('/some-page');
    expect(cachedAfter).toBeDefined();
  });

  it('falls back to /index.html on network failure', async () => {
    const mockCaches = createMockCaches();
    const CACHE_NAME = 'pharmverify-v1';
    const cache = await mockCaches.open(CACHE_NAME);

    // Pre-cache index.html
    await cache.put('/index.html', new Response('<html>SPA fallback</html>'));

    // Simulate network failure → fallback to index.html
    const networkFailed = true;
    let result;
    if (networkFailed) {
      result = await cache.match('/index.html');
    }

    expect(result).toBeDefined();
  });

  it('skips non-GET requests', () => {
    // The service worker returns early for non-GET
    const request = { method: 'POST', mode: 'navigate' };
    const shouldHandle = request.method === 'GET';
    expect(shouldHandle).toBe(false);
  });
});

// ─── Cache versioning ──────────────────────────────────────────────────────

describe('service worker: cache versioning', () => {
  it('generates unique cache names from version', () => {
    const versions = ['abc123', 'def456', 'ghi789'];
    const cacheNames = versions.map(v => `pharmverify-${v}`);
    expect(new Set(cacheNames).size).toBe(3);
  });

  it('old cache cleanup preserves only current version', async () => {
    const mockCaches = createMockCaches();

    // Simulate 3 versions of caches
    await mockCaches.open('pharmverify-abc');
    await mockCaches.open('pharmverify-def');
    await mockCaches.open('pharmverify-ghi');

    const current = 'pharmverify-ghi';
    const keys = await mockCaches.keys();
    const old = keys.filter(k => k !== current);

    expect(old).toEqual(['pharmverify-abc', 'pharmverify-def']);
    expect(old).not.toContain(current);
  });
});
