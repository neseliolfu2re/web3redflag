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
const LINE_STEP = 20

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
 * Canvas2D-only report (no DOM screenshot). Reliable across browsers; text is always drawn.
 */
export function renderPlaintextReportPng(result: ScanResult): HTMLCanvasElement {
  const inner = PLAIN_W - PLAIN_PAD * 2
  const canvas = document.createElement('canvas')
  const measure = canvas.getContext('2d')
  if (!measure) throw new Error('Canvas2D not available')

  type Row = { font: string; fill: string; text: string; gap: number }
  const rows: Row[] = []

  const pushLines = (font: string, fill: string, text: string, gap = LINE_STEP) => {
    measure.font = font
    for (const line of wrapLine(measure, text, inner)) {
      rows.push({ font, fill, text: line, gap })
    }
  }

  pushLines('bold 18px sans-serif', '#f4f4f5', 'Web3 Red Flag Detector')
  rows.push({ font: '14px sans-serif', fill: '#a1a1aa', text: '', gap: 10 })
  pushLines('600 15px sans-serif', '#e4e4e7', `Pattern tally: ${result.score}/100`)
  pushLines('14px sans-serif', '#d4d4d8', `Level: ${result.severity}`)
  rows.push({ font: '14px sans-serif', fill: '#a1a1aa', text: '', gap: 10 })
  pushLines('14px sans-serif', '#d4d4d8', result.summary)
  rows.push({ font: '13px sans-serif', fill: '#a1a1aa', text: '', gap: 12 })
  pushLines('600 13px sans-serif', '#fca5a5', 'Matched patterns')

  const hits = result.hits.slice(0, PLAIN_MAX_HITS)
  if (hits.length === 0) {
    pushLines('13px sans-serif', '#a1a1aa', '(none)')
  } else {
    for (const h of hits) {
      pushLines(
        '600 13px sans-serif',
        '#fecaca',
        `* ${h.title} (+${h.weight})`,
      )
      measure.font = '13px sans-serif'
      for (const wl of wrapLine(measure, h.detail, inner - 12)) {
        rows.push({
          font: '13px sans-serif',
          fill: '#a1a1aa',
          text: `  ${wl}`,
          gap: LINE_STEP,
        })
      }
    }
  }
  if (result.hits.length > PLAIN_MAX_HITS) {
    pushLines(
      '12px sans-serif',
      '#71717a',
      `... and ${result.hits.length - PLAIN_MAX_HITS} more (use text export for full list).`,
    )
  }

  rows.push({ font: '12px sans-serif', fill: '#52525b', text: '', gap: 10 })
  pushLines('11px sans-serif', '#a1a1aa', '---')
  pushLines(
    '11px sans-serif',
    '#a1a1aa',
    'Not financial advice - entertainment / gut-check tool only.',
  )
  pushLines('11px sans-serif', '#71717a', 'DYOR.')

  let totalH = PLAIN_PAD
  for (const row of rows) {
    totalH += row.gap
  }
  totalH += PLAIN_PAD

  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)
  const wPx = Math.floor(PLAIN_W * dpr)
  const hPx = Math.floor(totalH * dpr)

  canvas.width = wPx
  canvas.height = hPx
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas2D not available')

  if (dpr !== 1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  ctx.fillStyle = '#0a0a0c'
  ctx.fillRect(0, 0, PLAIN_W, totalH)

  let y = PLAIN_PAD
  for (const row of rows) {
    if (row.text === '') {
      y += row.gap
      continue
    }
    ctx.font = row.font
    ctx.fillStyle = row.fill
    const sizeMatch = row.font.match(/(\d+)px/)
    const fs = sizeMatch ? Number(sizeMatch[1]) : 14
    const baselineY = y + fs
    ctx.fillText(row.text, PLAIN_PAD, baselineY)
    y += row.gap
  }

  return canvas
}

/**
 * PNG export uses only Canvas2D text (no html2canvas / DOM snapshot) so the file always contains readable content.
 */
export async function downloadResultPng(
  _element: HTMLElement,
  result: ScanResult,
  filename = 'web3-red-flag-report.png',
): Promise<void> {
  await document.fonts.ready.catch(() => undefined)
  const canvas = renderPlaintextReportPng(result)
  await triggerPngDownload(canvas, filename)
}

export { WATERMARK }
