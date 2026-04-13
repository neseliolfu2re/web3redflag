/**
 * Offline Web3 red-flag scanner — keyword / pattern heuristics only.
 * Not financial or security advice. Not a substitute for audits or research.
 */

import {
  matchesAny,
  anonymousFounder,
  airdropFarming,
  auditContracts,
  bigUpdateDelays,
  botsHype,
  communityRewardsOnly,
  doesntCareCommunity,
  fakeEngagement,
  founderBehavior,
  giveawayEngagement,
  githubIssues,
  gmCulture,
  influencerCoord,
  marketingInconsistent,
  memeNextBig,
  modsCensor,
  noCommunity,
  noTokenUtility,
  noUseCase,
  noWorkingProduct,
  notDecentralized,
  priceMarketing,
  questionsIgnored,
  rebrandPivot,
  revolutionaryVague,
  roadmapIssues,
  stakingUnsustainable,
  talkNotBuild,
  techNoUsers,
  testnetForever,
  tokenSoonForever,
  tokenUnlockPressure,
  upgradeableUnclear,
  vcInsiderSupply,
  vibeCheckQuotes,
  walletTreasury,
  whitepaperVague,
} from './redFlagLexicon'

export interface RedFlagHit {
  id: string
  title: string
  detail: string
  weight: number
}

export interface ScanResult {
  score: number
  severity: 'clear' | 'caution' | 'high' | 'critical'
  hits: RedFlagHit[]
  summary: string
}

function fold(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim()
}

type Ctx = { raw: string; folded: string }

type Rule = {
  id: string
  title: string
  detail: string
  weight: number
  test: (c: Ctx) => boolean
}

const RULES: Rule[] = [
  {
    id: 'seed-phrase',
    title: 'Asks for seed / recovery words',
    detail:
      'Legit apps never ask for your seed phrase, private key, or “verify wallet” with a phrase.',
    weight: 28,
    test: ({ raw: r }) =>
      /\b(seed phrase|recovery phrase|secret phrase|12 words|24 words|mnemonic|private key|secret key)\b/i.test(
        r,
      ) && /\b(send|enter|paste|submit|confirm|verify|unlock|restore)\b/i.test(r),
  },
  {
    id: 'send-first',
    title: 'Send crypto / ETH / BTC first',
    detail:
      'Classic advance-fee pattern. Real services don’t ask you to “send a little” to unlock something.',
    weight: 26,
    test: ({ raw: r, folded: f }) =>
      /\b(send|transfer)\b.*\b(eth|btc|sol|usdt|usdc|bnb|crypto)\b/i.test(r) ||
      /\b(send)\b.*\b(first|small amount|fee|gas)\b/i.test(f) ||
      /\b(0x[a-fA-F0-9]{20,})\b/.test(r) && /\b(send|transfer|deposit)\b/i.test(r),
  },
  {
    id: 'guaranteed-returns',
    title: 'Guaranteed / fixed high returns',
    detail:
      'Markets aren’t guaranteed. Fixed “% daily” or “risk-free” yield is a major scam signal.',
    weight: 22,
    test: ({ raw: r, folded: f }) =>
      /\b(guaranteed|guarantee|risk[- ]free|fixed return|fixed apy)\b/i.test(r) ||
      /\b(\d{1,3}%)\s*(daily|per day|weekly|a day|each day)\b/i.test(f),
  },
  {
    id: 'passive-income-hype',
    title: 'Passive income / “money while you sleep” hype',
    detail: 'Often paired with recruitment or locked deposits. Treat with extreme skepticism.',
    weight: 14,
    test: ({ raw: r }) =>
      /\b(passive income|earn while you sleep|make money while|autopilot income)\b/i.test(
        r,
      ),
  },
  {
    id: 'multiplier-madness',
    title: 'Wild multipliers (100x, 1000x)',
    detail: 'Extreme upside promises are used to bypass critical thinking.',
    weight: 16,
    test: ({ raw: r }) =>
      /\b(100x|1000x|10x|10000x|million percent|sure\s*thing)\b/i.test(r),
  },
  {
    id: 'pyramid-recruit',
    title: 'Recruitment / referral-only earnings',
    detail:
      'If income mainly comes from bringing new people, that’s pyramid-shaped math.',
    weight: 20,
    test: ({ raw: r }) =>
      /\b(referral|recruit|downline|mlm|network marketing|binary tree)\b/i.test(r) ||
      /\b(only way to earn|invite friends to earn|bring 3 people)\b/i.test(r),
  },
  {
    id: 'fomo-pressure',
    title: 'Urgency / FOMO pressure',
    detail:
      '“Last chance”, “ending tonight”, “only X spots” — pressure to skip due diligence.',
    weight: 12,
    test: ({ raw: r }) =>
      /\b(last chance|ending soon|limited spots|only \d+ left|don't miss|dont miss|act now|before it's too late)\b/i.test(
        r,
      ),
  },
  {
    id: 'trust-me-bro',
    title: '“Trust me” / vibes over verification',
    detail: 'Trust should come from code, audits, and track record — not charisma.',
    weight: 10,
    test: ({ raw: r }) =>
      /\b(trust me|believe me|just trust|no risk|can't lose|cant lose)\b/i.test(r),
  },
  {
    id: 'anonymous-team',
    title: 'Anonymous founder / team',
    detail:
      'Anonymous founders aren’t automatically bad — but they’re harder to hold accountable when things go wrong.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, anonymousFounder),
  },
  {
    id: 'no-audit',
    title: 'No audit / “audit soon”',
    detail: 'Unaudited contracts handling money deserve extra scrutiny.',
    weight: 13,
    test: ({ raw: r }) =>
      /\b(no audit|unaudited|audit soon|audit pending|will be audited)\b/i.test(r),
  },
  {
    id: 'withdrawal-issues',
    title: 'Withdrawal problems / locked funds language',
    detail: 'Excuses for why you can’t withdraw often precede rugs.',
    weight: 18,
    test: ({ raw: r }) =>
      /\b(can't withdraw|cannot withdraw|withdrawal (disabled|paused|issue)|locked funds|temporary maintenance)\b/i.test(
        r,
      ),
  },
  {
    id: 'connect-approve-phish',
    title: 'Connect wallet + urgent approval',
    detail: 'Phishing often pairs urgency with unlimited token approvals.',
    weight: 17,
    test: ({ raw: r }) =>
      /\b(connect your wallet|connect wallet)\b/i.test(r) &&
      /\b(approve|sign (this|the) (message|transaction)|verify your wallet)\b/i.test(r),
  },
  {
    id: 'fake-giveaway',
    title: 'Giveaway / “send to verify” pattern',
    detail: 'Fake Binance/Twitter giveaways ask you to send crypto to “verify”.',
    weight: 21,
    test: ({ raw: r }) =>
      /\b(giveaway|airdrop)\b/i.test(r) &&
      /\b(send \d|send eth|send btc|verify (by )?sending)\b/i.test(r),
  },
  {
    id: 'double-your-crypto',
    title: 'Double / triple your deposit',
    detail: 'There is no magic doubler. It’s an old scam template.',
    weight: 23,
    test: ({ raw: r }) =>
      /\b(double your|triple your|2x your|3x your)\b.*\b(btc|eth|crypto|deposit|send)\b/i.test(
        r,
      ),
  },
  {
    id: 'nfa-shill',
    title: '“Not financial advice” + hype',
    detail:
      'NFA disclaimers are real — but paired with aggressive shilling, it’s often liability theater.',
    weight: 8,
    test: ({ raw: r }) =>
      /\b(not financial advice|nfa|dyor)\b/i.test(r) &&
      /\b(moon|gem|100x|aped|lambo|buy now)\b/i.test(r),
  },
  {
    id: 'pump-signal',
    title: 'Pump / insider “alpha”',
    detail: 'Coordinated pumps hurt retail. “Insider” tips are often exit liquidity.',
    weight: 12,
    test: ({ raw: r }) =>
      /\b(pump group|pump signal|insider info|alpha leak|coordinated buy)\b/i.test(r),
  },
  {
    id: 'exclusive-dm',
    title: '“DM me” / off-platform deal',
    detail: 'Scammers move you to DMs to avoid public scrutiny.',
    weight: 11,
    test: ({ raw: r }) =>
      /\b(dm me|message me privately|ask in dm|telegram only|whatsapp only)\b/i.test(r),
  },
  {
    id: 'celebrity-deepfake',
    title: 'Fake endorsement / deepfake vibes',
    detail: 'Elon/Musk/CZ “live” streams promising doubles are a known scam format.',
    weight: 15,
    test: ({ raw: r }) =>
      /\b(elon|musk|cz|live (event|stream|broadcast))\b/i.test(r) &&
      /\b(double|giveaway|send)\b/i.test(r),
  },
  {
    id: 'honeypot-words',
    title: 'Suspicious contract language',
    detail: 'If the pitch avoids explaining how value is created, ask harder questions.',
    weight: 9,
    test: ({ raw: r }) =>
      /\b(honeypot|can't sell|cannot sell|sell tax 99|max wallet 0)\b/i.test(r),
  },
  {
    id: 'otc-scam',
    title: 'OTC / escrow tricks',
    detail: 'Fake escrow and “OTC middleman” scams are common in P2P.',
    weight: 14,
    test: ({ raw: r }) =>
      /\b(otc deal|escrow service|middleman fee|release after payment)\b/i.test(r) &&
      /\b(send first|you send first)\b/i.test(r),
  },
  {
    id: 'staking-unreal',
    title: 'Unrealistic staking APY',
    detail: 'Triple-digit sustained APY on “stable” products rarely ages well.',
    weight: 15,
    test: ({ raw: r }) =>
      /\b(apr|apy|yield)\b/i.test(r) &&
      /\b(\d{2,3}%|\d{3,}%)\b/.test(r) &&
      /\b(staking|stake|farm)\b/i.test(r),
  },
  {
    id: 'web3-buzzword-salad',
    title: 'Buzzword salad',
    detail: 'AI + Web3 + Metaverse + “synergy” without a clear product is a pattern.',
    weight: 7,
    test: ({ folded: f }) => {
      const words = [
        'web3',
        'metaverse',
        '\\bai\\b',
        'nft',
        'dao',
        'tokenomics',
        'ecosystem',
      ]
      let n = 0
      for (const w of words) {
        if (new RegExp(w, 'i').test(f)) n++
      }
      return n >= 4 && f.length < 400
    },
  },
  // --- Subjective project / culture flags (micro-phrases in redFlagLexicon.ts) ---
  {
    id: 'user-no-working-product',
    title: 'No working product',
    detail: 'Slides and promises without a shipped product users can try.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, noWorkingProduct),
  },
  {
    id: 'user-whitepaper-vague',
    title: 'Whitepaper vague or generic',
    detail: 'Copy-paste vision docs with no concrete mechanics or milestones.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, whitepaperVague),
  },
  {
    id: 'user-roadmap-weak',
    title: 'Roadmap issues (no dates / keeps changing)',
    detail: 'Undated roadmaps or constant pivots make accountability impossible.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, roadmapIssues),
  },
  {
    id: 'user-no-use-case',
    title: 'No clear use case',
    detail: 'Token or chain without a crisp answer to “what is this for?”.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, noUseCase),
  },
  {
    id: 'user-revolutionary-no-explain',
    title: '“Revolutionary” but can’t explain how',
    detail: 'Big adjectives, thin technical explanation.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, revolutionaryVague),
  },
  {
    id: 'user-token-unlock-pressure',
    title: 'Token unlock / vesting pressure',
    detail: 'Large upcoming unlocks can move markets — watch supply overhang.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, tokenUnlockPressure),
  },
  {
    id: 'user-vc-insider-supply',
    title: 'Heavy VC or insider allocation',
    detail: 'When most supply sits with insiders, retail can be exit liquidity.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, vcInsiderSupply),
  },
  {
    id: 'user-no-token-utility',
    title: 'No clear token utility',
    detail: 'Governance-only or “future utility” can be a placeholder.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, noTokenUtility),
  },
  {
    id: 'user-staking-unsustainable',
    title: 'Staking rewards feel unsustainable',
    detail: 'Yields paid from minting or ponzinomics tend to break.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, stakingUnsustainable),
  },
  {
    id: 'user-airdrop-farming',
    title: 'Airdrop farming behavior',
    detail: 'Sybil armies and mercenary capital often leave after incentives dry up.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, airdropFarming),
  },
  {
    id: 'user-price-marketing',
    title: 'Price-driven marketing only',
    detail: 'If all messaging is chart and ticker, product narrative may be empty.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, priceMarketing),
  },
  {
    id: 'user-token-soon-forever',
    title: '“Token soon” for months',
    detail: 'Perpetual “soon” on TGE or mainnet erodes trust.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, tokenSoonForever),
  },
  {
    id: 'user-github-dead',
    title: 'No GitHub activity / empty or copied',
    detail: 'Open-source claims should match public commit history.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, githubIssues),
  },
  {
    id: 'user-big-update-delays',
    title: '“Big update soon” / shipping delays & excuses',
    detail: 'Pattern of missed deadlines and vague excuses.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, bigUpdateDelays),
  },
  {
    id: 'user-testnet-forever',
    title: 'Testnet only forever',
    detail: 'Years on testnet with “mainnet soon” can signal execution risk.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, testnetForever),
  },
  {
    id: 'user-rebrand-pivot',
    title: 'Rebranding / pivoting too often',
    detail: 'Frequent new names or directions without shipping.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, rebrandPivot),
  },
  {
    id: 'user-influencer-coord',
    title: 'Influencers shilling at the same time',
    detail: 'Coordinated KOL waves can be paid campaigns — verify disclosures.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, influencerCoord),
  },
  {
    id: 'user-giveaway-engagement-farm',
    title: 'Giveaway spam / engagement farming',
    detail: 'Reply contests and follow-gates can inflate hollow metrics.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, giveawayEngagement),
  },
  {
    id: 'user-bots-sudden-hype',
    title: 'Bots in replies / sudden hype',
    detail: 'Bot-like replies or hype from nowhere can be manufactured.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, botsHype),
  },
  {
    id: 'user-meme-over-product',
    title: 'Meme > product / “next big thing”',
    detail: 'Narrative and memes without substance age fast.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, memeNextBig),
  },
  {
    id: 'user-gm-only-culture',
    title: 'Only “gm” culture / no real discussions',
    detail: 'All vibes, no technical debate — weak signal for depth.',
    weight: 8,
    test: ({ folded: f }) => matchesAny(f, gmCulture),
  },
  {
    id: 'user-mods-censor',
    title: 'Mods delete criticism / toxic positivity',
    detail: 'Healthy projects tolerate hard questions.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, modsCensor),
  },
  {
    id: 'user-community-rewards-only',
    title: 'Community only there for rewards',
    detail: 'Points farmers may vanish when incentives end.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, communityRewardsOnly),
  },
  {
    id: 'user-questions-ignored',
    title: 'Questions go unanswered',
    detail: 'Silence on hard questions is a signal.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, questionsIgnored),
  },
  {
    id: 'user-fake-engagement',
    title: 'Fake engagement / same people everywhere',
    detail: 'Astroturfing and duplicate accounts inflate social proof.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, fakeEngagement),
  },
  {
    id: 'user-founder-avoid-drama',
    title: 'Founder avoids questions / overpromises / blames market / victim card',
    detail: 'Leadership patterns: dodge accountability, blame externals, play victim.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, founderBehavior),
  },
  {
    id: 'user-talk-not-build',
    title: 'Talks more than builds / always “early stage”',
    detail: 'Spaces and threads ≠ shipping; “early” can be an infinite excuse.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, talkNotBuild),
  },
  {
    id: 'user-audit-unknown',
    title: 'Audit from unknown firm / contracts not public',
    detail: 'Obscure auditors or hidden bytecode deserve extra scrutiny.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, auditContracts),
  },
  {
    id: 'user-upgradeable-unclear',
    title: 'Upgradeable contracts without clarity',
    detail: 'Proxies and admin keys need transparent governance and timelocks.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, upgradeableUnclear),
  },
  {
    id: 'user-wallet-treasury',
    title: 'Weird wallet movements / treasury not transparent',
    detail: 'Opaque treasuries and odd transfers break trust.',
    weight: 12,
    test: ({ folded: f }) => matchesAny(f, walletTreasury),
  },
  {
    id: 'user-not-decentralized',
    title: 'Not as decentralized as claimed',
    detail: 'Small validator set, multisig control, or corporate nodes — verify reality.',
    weight: 11,
    test: ({ folded: f }) => matchesAny(f, notDecentralized),
  },
  {
    id: 'user-tech-no-users',
    title: 'Too much tech, not enough users / chain unused',
    detail: 'Low real usage vs marketing noise is a common gap.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, techNoUsers),
  },
  {
    id: 'user-marketing-inconsistent',
    title: 'Community / marketing inconsistency',
    detail: 'Mismatched messaging across channels often means narrative drift.',
    weight: 9,
    test: ({ folded: f }) => matchesAny(f, marketingInconsistent),
  },
  {
    id: 'user-doesnt-care-community',
    title: 'Doesn’t care about community',
    detail: 'Ignored feedback and silent Discord/TG mods erode retention.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, doesntCareCommunity),
  },
  {
    id: 'user-no-community',
    title: 'No community / weak community',
    detail:
      'A common subjective red flag: no users, empty channels, or “no community” as a gut check.',
    weight: 10,
    test: ({ folded: f }) => matchesAny(f, noCommunity),
  },
  {
    id: 'user-quote-phrases',
    title: 'Matching common skeptical “vibe check” phrases',
    detail:
      'These lines often show up when people summarize doubt — still not proof.',
    weight: 13,
    test: ({ folded: f }) => matchesAny(f, vibeCheckQuotes),
  },
]

export function scanWeb3RedFlags(text: string): ScanResult {
  const raw = text.trim()
  if (raw.length < 8) {
    return {
      score: 0,
      severity: 'clear',
      hits: [],
      summary:
        'Paste or type a bit more text — project copy, your own notes, or a quick take (8+ characters).',
    }
  }

  const folded = fold(raw)
  const hits: RedFlagHit[] = []
  const seen = new Set<string>()

  for (const rule of RULES) {
    if (seen.has(rule.id)) continue
    if (rule.test({ raw, folded })) {
      seen.add(rule.id)
      hits.push({
        id: rule.id,
        title: rule.title,
        detail: rule.detail,
        weight: rule.weight,
      })
    }
  }

  let score = hits.reduce((a, h) => a + h.weight, 0)
  score = Math.min(100, score)

  let severity: ScanResult['severity'] = 'clear'
  if (score >= 72 || hits.some((h) => h.weight >= 26)) severity = 'critical'
  else if (score >= 45) severity = 'high'
  else if (score >= 18) severity = 'caution'
  else severity = 'clear'

  let summary: string
  if (hits.length === 0) {
    summary =
      'No keyword patterns matched. Try different wording (synonyms, shorter phrases), or check for typos — this tool only does simple English matching. Still DYOR.'
  } else if (severity === 'critical') {
    summary =
      'Several strong scam-style signals. Stop, don’t send funds or share keys, and verify through independent sources.'
  } else if (severity === 'high') {
    summary =
      'Multiple red flags. Slow down, research the contract and team, and assume high risk until proven otherwise.'
  } else if (severity === 'caution') {
    summary =
      'Some cautionary patterns. Worth extra verification before money or approvals.'
  } else {
    summary =
      'A few mild signals — could be sloppy marketing. Still verify anything that touches your wallet.'
  }

  return { score, severity, hits, summary }
}
