import type { ScanResult } from './web3RedFlags'

const WATERMARK =
  'For entertainment / gut-check only — not financial advice. DYOR.'

export function buildTextExport(input: string, result: ScanResult): string {
  const lines: string[] = [
    'Web3 Red Flag Detector — exported report',
    '═'.repeat(44),
    WATERMARK,
    '',
    '--- Your text ---',
    input.trim().slice(0, 8000),
    '',
    `Heuristic score: ${result.score}/100`,
    `Level: ${result.severity}`,
    '',
    result.summary,
    '',
    '--- Matched patterns ---',
  ]

  if (result.hits.length === 0) {
    lines.push('(none)')
  } else {
    for (const h of result.hits) {
      lines.push(`🚩 ${h.title} (+${h.weight})`)
      lines.push(`   ${h.detail}`)
      lines.push('')
    }
  }

  lines.push('═'.repeat(44))
  lines.push(WATERMARK)

  return lines.join('\n')
}

/** Stay under common browser canvas limits (very long result lists). */
function pickScale(width: number, height: number): number[] {
  const maxSide = 8192
  const maxPixels = 95_000_000
  const candidates = [2, 1.5, 1.25, 1, 0.75, 0.5]
  const out: number[] = []
  for (const s of candidates) {
    const sw = width * s
    const sh = height * s
    if (sw <= maxSide && sh <= maxSide && sw * sh <= maxPixels) out.push(s)
  }
  return out.length > 0 ? out : [0.5]
}

function sanitizeCloneForCapture(cloned: HTMLElement): void {
  cloned.style.fontFamily = 'ui-sans-serif, system-ui, sans-serif'
  const walker = cloned.ownerDocument.createTreeWalker(
    cloned,
    NodeFilter.SHOW_TEXT,
  )
  const textNodes: Text[] = []
  let n: Node | null
  while ((n = walker.nextNode())) {
    if (n.nodeValue && /[\u{1F300}-\u{1FAFF}]/u.test(n.nodeValue)) {
      textNodes.push(n as Text)
    }
  }
  for (const t of textNodes) {
    t.nodeValue = t.nodeValue!.replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
  }
}

async function renderToCanvas(
  element: HTMLElement,
  scale: number,
  html2canvas: typeof import('html2canvas').default,
): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    backgroundColor: '#0a0a0c',
    scale,
    logging: false,
    useCORS: true,
    foreignObjectRendering: false,
    imageTimeout: 15000,
    onclone: (_doc, cloned) => {
      if (cloned instanceof HTMLElement) sanitizeCloneForCapture(cloned)
    },
  })
}

/** Fallback when html2canvas fails (Safari, huge DOM, emoji/fonts). */
async function renderViaHtmlToImage(element: HTMLElement): Promise<HTMLCanvasElement> {
  const { toPng } = await import('html-to-image')
  const w = Math.max(1, element.offsetWidth || element.scrollWidth)
  const h = Math.max(1, element.offsetHeight || element.scrollHeight)
  const pr = Math.min(2, 4096 / Math.max(w, h), 8192 / w, 8192 / h)
  const pixelRatio = Number.isFinite(pr) && pr > 0.25 ? pr : 1

  const dataUrl = await toPng(element, {
    pixelRatio,
    backgroundColor: '#0a0a0c',
    cacheBust: true,
    style: { fontFamily: 'ui-sans-serif, system-ui, sans-serif' },
  })

  const img = new Image()
  img.crossOrigin = 'anonymous'
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Could not load PNG preview'))
    img.src = dataUrl
  })

  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const x = c.getContext('2d')
  if (!x) throw new Error('Could not create image canvas')
  x.drawImage(img, 0, 0)
  return c
}

function triggerPngDownload(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = filename
      a.click()
      resolve()
    } catch {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('PNG export could not create image data'))
            return
          }
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = filename
          a.click()
          URL.revokeObjectURL(url)
          resolve()
        },
        'image/png',
      )
    }
  })
}

export async function downloadResultPng(
  element: HTMLElement,
  filename = 'web3-red-flag-report.png',
): Promise<void> {
  await document.fonts.ready.catch(() => undefined)

  const html2canvas = (await import('html2canvas')).default
  const w = Math.max(1, element.offsetWidth || element.scrollWidth)
  const h = Math.max(1, element.offsetHeight || element.scrollHeight)
  const scales = pickScale(w, h)

  let snap: HTMLCanvasElement | null = null
  let lastErr: unknown
  for (const scale of scales) {
    try {
      snap = await renderToCanvas(element, scale, html2canvas)
      break
    } catch (e) {
      lastErr = e
    }
  }
  if (!snap) {
    try {
      snap = await renderViaHtmlToImage(element)
    } catch (e2) {
      const first = lastErr instanceof Error ? lastErr.message : String(lastErr)
      const second = e2 instanceof Error ? e2.message : String(e2)
      throw new Error(`PNG capture failed (${first}; fallback: ${second})`)
    }
  }

  const barH = 48
  const out = document.createElement('canvas')
  out.width = snap.width
  out.height = snap.height + barH
  const ctx = out.getContext('2d')
  if (!ctx) throw new Error('Could not create export canvas')

  ctx.drawImage(snap, 0, 0)
  const y0 = snap.height
  ctx.fillStyle = '#18181b'
  ctx.fillRect(0, y0, out.width, barH)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)'
  ctx.fillRect(0, y0, out.width, barH)
  ctx.fillStyle = '#a1a1aa'
  ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif'
  ctx.fillText(
    'Not financial advice — entertainment / gut-check tool only.',
    14,
    y0 + 20,
  )
  ctx.fillText(
    'DYOR. Verify contracts, teams, and audits independently.',
    14,
    y0 + 38,
  )

  await triggerPngDownload(out, filename)
}

export { WATERMARK }
