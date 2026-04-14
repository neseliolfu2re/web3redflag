import { useMemo, useRef, useState } from 'react'
import { buildTextExport, downloadResultPng } from './lib/exportReport'
import { scanWeb3RedFlags, type ScanResult } from './lib/web3RedFlags'
import { SITE_URL, siteEmbedUrl } from './siteConfig'

function severityStyles(s: ScanResult['severity']): string {
  switch (s) {
    case 'clear':
      return 'bg-emerald-500/15 text-emerald-200 ring-emerald-500/35'
    case 'caution':
      return 'bg-amber-500/15 text-amber-200 ring-amber-500/35'
    case 'high':
      return 'bg-orange-500/15 text-orange-200 ring-orange-500/40'
    case 'critical':
      return 'bg-red-600/25 text-red-100 ring-red-500/50'
    default:
      return 'bg-zinc-800 text-zinc-200 ring-zinc-600'
  }
}

function severityLabel(s: ScanResult['severity']): string {
  switch (s) {
    case 'clear':
      return 'Mild (fewer matches)'
    case 'caution':
      return 'Caution'
    case 'high':
      return 'Strong signals'
    case 'critical':
      return 'Critical — stop & verify'
    default:
      return s
  }
}

function useEmbedMode(): boolean {
  return useMemo(
    () => new URLSearchParams(window.location.search).get('embed') === '1',
    [],
  )
}

export default function App() {
  const embed = useEmbedMode()
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [pending, setPending] = useState(false)
  const [exportMsg, setExportMsg] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const canScan = input.trim().length >= 8

  const handleScan = () => {
    if (!canScan || pending) return
    setPending(true)
    setExportMsg(null)
    window.setTimeout(() => {
      setResult(scanWeb3RedFlags(input))
      setPending(false)
    }, 420)
  }

  const scoreBar = useMemo(() => {
    if (!result || result.hits.length === 0) return 0
    return result.score
  }, [result])

  async function handleCopyText() {
    if (!result) return
    try {
      await navigator.clipboard.writeText(buildTextExport(input, result))
      setExportMsg('Copied text report to clipboard.')
      window.setTimeout(() => setExportMsg(null), 3500)
    } catch {
      setExportMsg('Could not copy — try another browser.')
    }
  }

  async function handlePng() {
    if (!resultRef.current || !result) return
    try {
      await downloadResultPng(resultRef.current)
      setExportMsg('Downloaded PNG with watermark.')
      window.setTimeout(() => setExportMsg(null), 3500)
    } catch (e) {
      const msg =
        e instanceof Error ? e.message.slice(0, 160) : 'PNG export failed.'
      setExportMsg(`PNG export failed: ${msg}`)
      window.setTimeout(() => setExportMsg(null), 8000)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-950 font-sans text-zinc-100">
      {!embed && (
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(239,68,68,0.12),transparent)]" />
      )}

      <header
        className={`relative border-b border-zinc-800/90 bg-zinc-950/90 backdrop-blur ${embed ? 'px-3 py-3' : 'px-4 py-5 sm:px-6'}`}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400/90">
                Web3
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Red Flag Detector
              </h1>
              <p className="mt-2 max-w-xl rounded-lg border border-amber-900/40 bg-amber-950/30 px-3 py-2 text-xs leading-relaxed text-amber-100/90 ring-1 ring-amber-800/30">
                <span className="font-semibold text-amber-200">
                  Entertainment &amp; gut-check toy.
                </span>{' '}
                The score is pattern-matching, not advice, not an audit, not a
                prediction — verify everything yourself (DYOR).
              </p>
            </div>
            <span
              className="rounded-full bg-zinc-900/90 px-2.5 py-1 text-xs font-medium text-zinc-400 ring-1 ring-zinc-700"
              title="Heuristic scan in your browser. No wallet, no API."
            >
              Offline · heuristics
            </span>
          </div>
          {!embed && (
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Write your own notes and gut reactions — or paste a tweet, Discord
              log, bullet list, anything in English. We match common{' '}
              <span className="text-zinc-300">scam &amp; hype-style patterns</span>{' '}
              in the text; not a security audit.
            </p>
          )}
        </div>
      </header>

      <main
        className={`relative mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 ${embed ? 'px-3 py-4' : 'px-4 py-5 sm:px-6'}`}
      >
        {!embed && (
          <>
            <details className="group rounded-xl border border-zinc-800/90 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300 ring-1 ring-zinc-800/80">
              <summary className="cursor-pointer font-medium text-zinc-100 outline-none marker:text-red-500">
                How to use
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-400">
                Type your own sentence or paste any English text (pitch, DM, your
                notes). Hit <span className="text-zinc-300">Scan for red flags</span>
                . The score only flags keyword-style patterns — it is{' '}
                <span className="text-zinc-300">not</span> a recommendation to buy,
                sell, or trust anything.
              </p>
            </details>
            <details className="group rounded-xl border border-zinc-800/90 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300 ring-1 ring-zinc-800/80">
              <summary className="cursor-pointer font-medium text-zinc-100 outline-none marker:text-red-500">
                How scoring works
              </summary>
              <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-zinc-400">
                <li>
                  The <span className="text-zinc-300">0–100 number</span> is{' '}
                  <span className="text-zinc-300">not</span> a mark where 100 is the
                  goal. It is a <span className="text-zinc-300">tally</span>: sum of
                  weights for each distinct rule that matched (each rule at most
                  once). <span className="text-zinc-300">Higher = more warning-style
                  patterns</span> in the text, like stacking flags — not “you scored
                  10% on a test.”
                </li>
                <li>
                  Example: “no community” alone might be one rule →{' '}
                  <span className="text-zinc-300">+10</span> → total{' '}
                  <span className="text-zinc-300">10</span>. Add “VC influence” text
                  and another rule fires → <span className="text-zinc-300">+11</span>{' '}
                  → total <span className="text-zinc-300">21</span>. Two different
                  signals add up.
                </li>
                <li>
                  <span className="text-zinc-300">Bands</span> (Mild / Caution /
                  …): rough buckets on that total. A low total means fewer rules
                  matched in this crude keyword game — it does not certify safety.
                </li>
              </ul>
            </details>
          </>
        )}

        <div className="flex flex-col gap-3">
          <label htmlFor="paste" className="text-sm font-medium text-zinc-300">
            Your text
          </label>
          <textarea
            id="paste"
            rows={embed ? 5 : 6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. paste a pitch, or write: “Feels like heavy VC allocation, no shipping, mods ban questions, only GM culture…”"
            className="min-h-[8rem] w-full resize-y rounded-xl border border-zinc-700 bg-zinc-900/80 px-3 py-3 text-[15px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500/25"
            disabled={pending}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleScan}
              disabled={!canScan || pending}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pending ? 'Scanning…' : 'Scan for red flags'}
            </button>
            {!canScan && input.length > 0 && (
              <span className="text-xs text-zinc-500">
                Add a few more characters (8+).
              </span>
            )}
          </div>
        </div>

        {result && (
          <div
            ref={resultRef}
            className="rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-4 sm:p-5"
            role="region"
            aria-live="polite"
            aria-label="Scan result"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Result
                </p>
                <p
                  className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ${severityStyles(result.severity)}`}
                >
                  {severityLabel(result.severity)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Pattern tally</p>
                <p
                  className="text-2xl font-bold tabular-nums text-white"
                  title="Not a grade: higher means more weighted rules matched, not a better project."
                >
                  {result.score}
                  <span className="text-base font-normal text-zinc-500">/100</span>
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              <span className="text-zinc-400">Not a school grade.</span> This is a
              sum of matched warning-style patterns (each rule has a weight).{' '}
              <span className="text-zinc-300">Higher = more patterns hit</span>, not
              “smarter” or “better.” 100/100 means many different rules matched at
              once — scarier in this toy model, not an achievement.
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-red-600 to-red-500 transition-[width] duration-500"
                style={{ width: `${scoreBar}%` }}
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {result.summary}
            </p>

            {result.hits.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {result.hits.map((h) => (
                  <li
                    key={h.id}
                    className="flex gap-3 rounded-xl border border-red-950/50 bg-red-950/20 px-3 py-3 sm:px-4"
                  >
                    <span className="select-none text-lg" aria-hidden>
                      🚩
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-red-100">{h.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        {h.detail}
                      </p>
                      <p className="mt-2 text-xs text-zinc-600">
                        Weight +{h.weight}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-zinc-500">
                No pattern hits — empty list doesn’t mean “safe project”.
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
              <button
                type="button"
                onClick={() => void handleCopyText()}
                className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
              >
                Copy text report
              </button>
              <button
                type="button"
                onClick={() => void handlePng()}
                className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
              >
                Download PNG
              </button>
              <span className="self-center text-[10px] text-zinc-600">
                Exports include a not-advice watermark.
              </span>
            </div>
            {exportMsg && (
              <p
                className={`mt-2 text-xs ${exportMsg.startsWith('PNG export failed') ? 'text-amber-400/95' : 'text-emerald-400/90'}`}
                role="status"
              >
                {exportMsg}
              </p>
            )}

            <p className="mt-6 border-t border-zinc-800/80 pt-4 text-xs leading-relaxed text-zinc-600">
              This tool uses simple English keyword rules on whatever you paste.
              It can miss real problems and flag harmless wording. Never share
              seed phrases. Not financial advice.
            </p>
          </div>
        )}
      </main>

      {!embed && (
        <footer className="mx-auto mt-auto max-w-2xl px-4 pb-8 pt-4 text-center sm:px-6">
          <p className="text-xs leading-relaxed text-zinc-600">
            Open patterns: edit{' '}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
              src/lib/redFlagLexicon.ts
            </code>{' '}
            and open a PR — see{' '}
            <a
              href="https://github.com/neseliolfu2re/web3redflag/blob/main/CONTRIBUTING.md"
              className="text-red-400/90 underline decoration-red-500/40 underline-offset-2 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              CONTRIBUTING.md
            </a>{' '}
            on{' '}
            <a
              href="https://github.com/neseliolfu2re/web3redflag"
              className="text-red-400/90 underline decoration-red-500/40 underline-offset-2 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            <span className="text-zinc-400">Live</span>{' '}
            <a
              href={SITE_URL}
              className="text-red-400/90 underline decoration-red-500/40 underline-offset-2 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_URL.replace(/^https:\/\//, '')}
            </a>
          </p>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            <span className="text-zinc-400">Embed</span> — iframe with{' '}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
              ?embed=1
            </code>{' '}
            (compact header). Production URL:{' '}
            <code className="break-all rounded bg-zinc-900 px-1.5 py-0.5 text-[11px] text-zinc-500">
              {siteEmbedUrl}
            </code>
            {typeof window !== 'undefined' &&
              window.location.origin !== new URL(SITE_URL).origin && (
                <>
                  {' '}
                  · local:{' '}
                  <code className="break-all rounded bg-zinc-900 px-1 py-0.5 text-[11px] text-zinc-600">
                    {`${window.location.origin}${window.location.pathname}?embed=1`}
                  </code>
                </>
              )}
          </p>
        </footer>
      )}
    </div>
  )
}
