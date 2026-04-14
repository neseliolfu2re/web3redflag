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
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = filename
          a.rel = 'noopener'
          a.click()
          URL.revokeObjectURL(url)
          resolve()
          return
        }
        try {
          const a = document.createElement('a')
          a.href = canvas.toDataURL('image/png')
          a.download = filename
          a.rel = 'noopener'
          a.click()
          resolve()
        } catch (e) {
          reject(e instanceof Error ? e : new Error('PNG download failed'))
        }
      },
      'image/png',
      1,
    )
  })
}

const PLAIN_W = 720
const PLAIN_PAD = 24
const PLAIN_MAX_HITS = 45

function wrapLine(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  if (!text.trim()) return ['']
  const words = text.split(/\s+/)
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (ctx.measureText(next).width <= maxW) {
      cur = next
    } else {
      if (cur) lines.push(cur)
      if (ctx.measureText(w).width > maxW) {
        let chunk = ''
        for (const ch of w) {
          const t = chunk + ch
          if (ctx.measureText(t).width > maxW && chunk) {
            lines.push(chunk)
            chunk = ch
          } else {
            chunk = t
          }
        }
        cur = chunk
      } else {
        cur = w
      }
    }
  }
  if (cur) lines.push(cur)
  return lines
}

/**
 * No DOM snapshot — only Canvas2D text. Works when html2canvas / html-to-image fail
 * (strict Safari, extensions, huge trees, font/CORS issues).
 */
export function renderPlaintextReportPng(result: ScanResult): HTMLCanvasElement {
  const inner = PLAIN_W - PLAIN_PAD * 2
  const lineH = 17
  const canvas = document.createElement('canvas')
  const measure = canvas.getContext('2d')
  if (!measure) throw new Error('Canvas2D not available')

  type Row = { font: string; fill: string; text: string }
  const rows: Row[] = []
  const pushLines = (font: string, fill: string, text: string) => {
    measure.font = font
    for (const line of wrapLine(measure, text, inner)) {
      rows.push({ font, fill, text: line })
    }
  }

  pushLines('700 18px ui-sans-serif, system-ui, sans-serif', '#fafafa', 'Web3 Red Flag Detector')
  rows.push({ font: '13px ui-sans-serif, system-ui, sans-serif', fill: '#a1a1aa', text: '' })
  pushLines('600 14px ui-sans-serif, system-ui, sans-serif', '#e4e4e7', `Pattern tally: ${result.score}/100`)
  pushLines('13px ui-sans-serif, system-ui, sans-serif', '#d4d4d8', `Level: ${result.severity}`)
  rows.push({ font: '13px ui-sans-serif, system-ui, sans-serif', fill: '#a1a1aa', text: '' })
  pushLines('13px ui-sans-serif, system-ui, sans-serif', '#d4d4d8', result.summary)
  rows.push({ font: '12px ui-sans-serif, system-ui, sans-serif', fill: '#a1a1aa', text: '' })
  pushLines('600 12px ui-sans-serif, system-ui, sans-serif', '#fca5a5', 'Matched patterns')

  const hits = result.hits.slice(0, PLAIN_MAX_HITS)
  if (hits.length === 0) {
    pushLines('12px ui-sans-serif, system-ui, sans-serif', '#71717a', '(none)')
  } else {
    for (const h of hits) {
      pushLines(
        '600 12px ui-sans-serif, system-ui, sans-serif',
        '#fecaca',
        `• ${h.title} (+${h.weight})`,
      )
      measure.font = '12px ui-sans-serif, system-ui, sans-serif'
      for (const wl of wrapLine(measure, h.detail, inner - 10)) {
        rows.push({ font: '12px ui-sans-serif, system-ui, sans-serif', fill: '#a1a1aa', text: `  ${wl}` })
      }
    }
  }
  if (result.hits.length > PLAIN_MAX_HITS) {
    pushLines(
      '11px ui-sans-serif, system-ui, sans-serif',
      '#71717a',
      `… and ${result.hits.length - PLAIN_MAX_HITS} more (copy text report for full list).`,
    )
  }

  rows.push({ font: '11px ui-sans-serif, system-ui, sans-serif', fill: '#52525b', text: '' })
  pushLines('11px ui-sans-serif, system-ui, sans-serif', '#a1a1aa', '—')
  pushLines(
    '11px ui-sans-serif, system-ui, sans-serif',
    '#a1a1aa',
    'Not financial advice — entertainment / gut-check tool only.',
  )
  pushLines(
    '11px ui-sans-serif, system-ui, sans-serif',
    '#71717a',
    'Plain-text PNG (no screenshot). Same data as the card.',
  )

  const contentH = PLAIN_PAD * 2 + rows.length * lineH + 8
  const hCss = Math.min(30000, Math.max(320, contentH))

  canvas.width = PLAIN_W * 2
  canvas.height = Math.ceil(hCss * 2)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas2D not available')
  ctx.scale(2, 2)
  ctx.fillStyle = '#0a0a0c'
  ctx.fillRect(0, 0, PLAIN_W, hCss)

  let y = PLAIN_PAD + 14
  for (const row of rows) {
    if (row.text === '') {
      y += 8
      continue
    }
    ctx.font = row.font
    ctx.fillStyle = row.fill
    ctx.fillText(row.text, PLAIN_PAD, y)
    y += lineH
  }

  return canvas
}

export async function downloadResultPng(
  element: HTMLElement,
  result: ScanResult,
  filename = 'web3-red-flag-report.png',
): Promise<void> {
  await document.fonts.ready.catch(() => undefined)

  const w = Math.max(1, element.offsetWidth || element.scrollWidth)
  const h = Math.max(1, element.offsetHeight || element.scrollHeight)
  const scales = pickScale(w, h)

  let snap: HTMLCanvasElement | null = null

  try {
    snap = await renderViaHtmlToImage(element)
  } catch {
    /* try html2canvas */
  }

  if (!snap) {
    const html2canvas = (await import('html2canvas')).default
    for (const scale of scales) {
      try {
        snap = await renderToCanvas(element, scale, html2canvas)
        break
      } catch {
        /* next scale */
      }
    }
  }

  const plain = () => renderPlaintextReportPng(result)

  if (!snap) {
    await triggerPngDownload(plain(), filename)
    return
  }

  const barH = 48
  const out = document.createElement('canvas')
  out.width = snap.width
  out.height = snap.height + barH
  const ctx = out.getContext('2d')
  if (!ctx) {
    await triggerPngDownload(plain(), filename)
    return
  }

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

  try {
    await triggerPngDownload(out, filename)
  } catch {
    await triggerPngDownload(plain(), filename)
  }
}

export { WATERMARK }
