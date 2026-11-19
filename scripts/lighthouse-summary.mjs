// Reads lighthouse/{current,new}-*.json and writes medians to src/data/lighthouse.json
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const dir = new URL('../lighthouse/', import.meta.url)
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }
const pick = (prefix) => {
  const runs = readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(new URL(f, dir))))
    .filter((r) => r.categories?.performance?.score != null)
  const a = (r, id) => r.audits[id]?.numericValue
  const totals = (r) => {
    const items = r.audits['network-requests']?.details?.items ?? []
    const js = items.filter((i) => i.resourceType === 'Script').reduce((s, i) => s + (i.transferSize || 0), 0)
    return { requests: items.length, transfer: items.reduce((s, i) => s + (i.transferSize || 0), 0), js }
  }
  const m = (f) => median(runs.map(f))
  return {
    url: runs[0]?.finalDisplayedUrl,
    runs: runs.length,
    fetchedAt: runs[0]?.fetchTime,
    lighthouse: runs[0]?.lighthouseVersion,
    scores: Object.fromEntries(['performance', 'accessibility', 'best-practices', 'seo'].map((k) => [k, Math.round(m((r) => r.categories[k].score) * 100)])),
    lcp: m((r) => a(r, 'largest-contentful-paint')),
    fcp: m((r) => a(r, 'first-contentful-paint')),
    tbt: m((r) => a(r, 'total-blocking-time')),
    cls: m((r) => a(r, 'cumulative-layout-shift')),
    si: m((r) => a(r, 'speed-index')),
    requests: m((r) => totals(r).requests),
    transferKB: Math.round(m((r) => totals(r).transfer) / 1024),
    jsKB: Math.round(m((r) => totals(r).js) / 1024),
  }
}
const out = { current: pick('current-'), next: pick('new-') }
writeFileSync(new URL('../src/data/lighthouse.json', import.meta.url), JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
