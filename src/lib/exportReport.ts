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

export async function downloadResultPng(
  element: HTMLElement,
  filename = 'web3-red-flag-report.png',
): Promise<void> {
  const html2canvas = (await import('html2canvas')).default
  const snap = await html2canvas(element, {
    backgroundColor: '#0a0a0c',
    scale: 2,
    logging: false,
    useCORS: true,
  })

  const barH = 48
  const out = document.createElement('canvas')
  out.width = snap.width
  out.height = snap.height + barH
  const ctx = out.getContext('2d')
  if (!ctx) return

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

  const a = document.createElement('a')
  a.href = out.toDataURL('image/png')
  a.download = filename
  a.click()
}

export { WATERMARK }
