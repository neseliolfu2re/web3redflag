/**
 * Micro-variants for subjective Web3 red-flag detection (English).
 * Many short alternations — high recall, some false positives possible.
 */

export function matchesAny(text: string, patterns: readonly RegExp[]): boolean {
  for (const p of patterns) {
    if (p.test(text)) return true
  }
  return false
}

/** Anonymous founder / team */
export const anonymousFounder: RegExp[] = [
  /\banonymous founder\b/i,
  /\banon founder\b/i,
  /\bfounder is anon\b/i,
  /\bfounder undoxxed\b/i,
  /\bteam is anon\b/i,
  /\banonymous team\b/i,
  /\bunknown devs?\b/i,
  /\bmystery founder\b/i,
  /\bno doxx\b/i,
  /\bwe stay anon\b/i,
  /\bpseudonymous founder\b/i,
  /\bno public face\b/i,
  /\bteam hidden\b/i,
]

/** No working product */
export const noWorkingProduct: RegExp[] = [
  /\bno working product\b/i,
  /\bno real product\b/i,
  /\bno product yet\b/i,
  /\bno shipped product\b/i,
  /\bno live product\b/i,
  /\bno mvp\b/i,
  /\bno demo\b/i,
  /\bno launch\b/i,
  /\bnothing shipped\b/i,
  /\bnothing to (use|try|download)\b/i,
  /\bvaporware\b/i,
  /\bslideware\b/i,
  /\bidea only\b/i,
  /\bstill building\b/i,
  /\bproduct soon\b/i,
  /\bno app\b/i,
  /\bno release\b/i,
  /\bno working (software|protocol|thing)\b/i,
  /\bhasn'?t shipped\b/i,
  /\bzero product\b/i,
]

/** Whitepaper / docs vague */
export const whitepaperVague: RegExp[] = [
  /\bwhitepaper\b.*\b(vague|generic|fluff|thin|empty)\b/i,
  /\b(vague|generic)\b.*\b(whitepaper|litepaper)\b/i,
  /\blitepaper\b.*\b(vague|generic)\b/i,
  /\bcopy.?paste\b.*\b(whitepaper|deck|docs)\b/i,
  /\bwhitepaper\b.*\b(buzzword|template)\b/i,
  /\bgeneric pitch\b/i,
  /\bhand.?wavey?\b.*\b(docs|paper)\b/i,
]

/** Roadmap: no dates / changing */
export const roadmapIssues: RegExp[] = [
  /\broad\s*map\b.*\b(no dates|without dates|no timeline|undated|tbd)\b/i,
  /\b(no dates|no timeline)\b.*\broad\s*map\b/i,
  /\broad\s*map\b.*\b(keeps changing|changed again|moving goalposts|slip|slipped)\b/i,
  /\bshifting road\s*map\b/i,
  /\broad\s*map\b.*\b(pivot|pivoted)\b/i,
  /\broad\s*map\b.*\b(constantly|always)\b.*\b(chang|updat)\b/i,
]

/** No clear use case */
export const noUseCase: RegExp[] = [
  /\bno clear use case\b/i,
  /\bno real use case\b/i,
  /\bunclear use case\b/i,
  /\bno use case\b/i,
  /\bwhat is it (even )?for\b/i,
  /\bwhy would anyone use\b/i,
  /\bsolution looking for a problem\b/i,
  /\bno moat\b/i,
]

/** Revolutionary but can't explain */
export const revolutionaryVague: RegExp[] = [
  /\b(revolutionary|game.?changer|paradigm shift)\b.*\b(can'?t explain|doesn'?t explain|vague|no one (gets|understands))\b/i,
  /\b(can'?t explain|doesn'?t explain)\b.*\b(how|why|what it does)\b/i,
  /\bworld.?changing\b.*\b(but|yet)\b.*\b(vague|thin|empty)\b/i,
  /\bhand.?wav(e|ing)\b/i,
  /\bbuzzwords?\s+only\b/i,
  /\brevolutionary\b.*\b(vague|empty|meaningless)\b/i,
  /\bcan'?t explain how\b/i,
  /\bno real explanation\b/i,
]

/** Token unlock / vesting pressure */
export const tokenUnlockPressure: RegExp[] = [
  /\btoken unlock\b.*\b(soon|coming|next|pressure|sell|dump)\b/i,
  /\bunlock\b.*\b(soon|coming|pressure|overhang)\b/i,
  /\bvesting\b.*\b(cliff|soon|unlock)\b/i,
  /\bsupply overhang\b/i,
  /\bunlock pressure\b/i,
  /\blarge unlock\b/i,
  /\bcliff unlock\b/i,
  /\btge unlock\b/i,
  /\bcoming unlock\b/i,
  /\bsell pressure\b.*\b(unlock|vest)\b/i,
]

/** Heavy VC / insiders */
export const vcInsiderSupply: RegExp[] = [
  /\bheavy vc\b/i,
  /\bvc allocation\b/i,
  /\blarge vc\b/i,
  /\bhigh vc\b/i,
  /\binsiders?\b.*\b(most|majority|bulk|hold)\b/i,
  /\bmost (of the )?supply\b.*\b(team|insider|vc|insiders)\b/i,
  /\bteam (holds|has|got)\b.*\b(most|majority)\b/i,
  /\bteam allocation\b.*\b(high|large|most|huge)\b/i,
  /\binsider allocation\b/i,
  /\binvestors?\b.*\b(too much|most|majority)\b/i,
  /\binsiders hold\b/i,
]

/** No token utility */
export const noTokenUtility: RegExp[] = [
  /\bno (clear )?token utility\b/i,
  /\bno clear utility\b/i,
  /\bunclear utility\b/i,
  /\buseless token\b/i,
  /\bgovernance only\b/i,
  /\bno value accrual\b/i,
  /\butility (is )?unclear\b/i,
]

/** Staking unsustainable */
export const stakingUnsustainable: RegExp[] = [
  /\bstaking\b.*\b(unsustainable|ponzi|too good)\b/i,
  /\b(rewards?|emissions?)\b.*\b(unsustainable|infinite|print)\b/i,
  /\binfinite apy\b/i,
  /\bponz(i|inomics)\b/i,
  /\byield\b.*\b(can'?t|cannot)\s+sustain\b/i,
]

/** Airdrop farming */
export const airdropFarming: RegExp[] = [
  /\bairdrop farm/i,
  /\bfarming (the )?airdrop\b/i,
  /\bfarm(ing)? (for|the) airdrop\b/i,
  /\bsybil\b/i,
  /\bmulti.?wallet\b/i,
  /\bmercenary\b/i,
  /\bairdrop hunter/i,
]

/** Price-only marketing */
export const priceMarketing: RegExp[] = [
  /\bprice[- ]driven\b/i,
  /\bprice\b.*\b(only|marketing|focus)\b/i,
  /\b(chart|ticker)\b.*\b(only|marketing)\b/i,
  /\bonly (the )?price\b/i,
  /\bnumber go up\b/i,
  /\bmarketing\b.*\b(only|just)\b.*\b(price|chart|pump)\b/i,
  /\ball (they )?(talk|post) about\b.*\b(price|chart)\b/i,
]

/** Token soon forever */
export const tokenSoonForever: RegExp[] = [
  /\btoken soon\b/i,
  /\btge soon\b/i,
  /\blaunching soon\b/i,
  /\bfor months\b/i,
  /\bstill soon\b/i,
  /\bsoon™/i,
  /\bcoming soon\b.*\b(months|years)\b/i,
  /\bdelayed tge\b/i,
]

/** GitHub dead / copied */
export const githubIssues: RegExp[] = [
  /\bgithub\b.*\b(empty|dead|no commits?|stale|inactive)\b/i,
  /\b(no|zero) (activity|commits?)\b.*\bgithub\b/i,
  /\bgithub\b.*\b(copied|fork|plagiar|fake)\b/i,
  /\bempty repo\b/i,
  /\bdead repo\b/i,
  /\bno source (code)?\b/i,
  /\bprivate repo only\b/i,
]

/** Big update / delays / excuses */
export const bigUpdateDelays: RegExp[] = [
  /\bbig update soon\b/i,
  /\bmajor announcement soon\b/i,
  /\bshipping (soon|delayed)\b/i,
  /\bdelayed again\b/i,
  /\bpush(ing)? back\b/i,
  /\bexcuses?\b/i,
  /\bshipping delays?\b/i,
  /\bmissed deadline/i,
  /\bconstant delays?\b/i,
]

/** Testnet forever */
export const testnetForever: RegExp[] = [
  /\btestnet only\b/i,
  /\bstill on testnet\b/i,
  /\bforever testnet\b/i,
  /\bmainnet soon\b/i,
  /\bno mainnet\b/i,
  /\byears?\s+on testnet\b/i,
]

/** Rebrand / pivot */
export const rebrandPivot: RegExp[] = [
  /\brebrand(ing)?\b/i,
  /\bnew logo\b/i,
  /\bpivot(ing)?\b/i,
  /\bchanged (the )?vision\b/i,
  /\banother pivot\b/i,
  /\bpivot too often\b/i,
  /\bevery few months\b.*\b(rebrand|new name)\b/i,
]

/** Influencers coordinated */
export const influencerCoord: RegExp[] = [
  /\binfluencers?\b.*\b(same time|at once|together|coordinated)\b/i,
  /\bkol(s)?\b.*\b(same|paid|shill|tweet)\b/i,
  /\bpaid (promo|shill|influencer)\b/i,
  /\bsame time\b.*\b(shill|tweet|post|youtube)\b/i,
  /\bcoordinated\b.*\b(influencer|kol|shill|campaign)\b/i,
  /\ball (the )?influencers\b.*\b(same|once|together)\b/i,
  /\bshill(ing)?\b.*\b(same time|coordinated)\b/i,
]

/** Giveaway / engagement farming */
export const giveawayEngagement: RegExp[] = [
  /\bgiveaway spam\b/i,
  /\bengagement farm/i,
  /\bengagement bait\b/i,
  /\blike (and )?(rt|retweet)\b/i,
  /\bfollow to enter\b/i,
  /\breply (to )?win\b/i,
  /\bfarm(ing)? engagement\b/i,
]

/** Bots / sudden hype */
export const botsHype: RegExp[] = [
  /\bbot(s)? in replies\b/i,
  /\breply bots\b/i,
  /\bfake followers\b/i,
  /\bsudden hype\b/i,
  /\bout of nowhere\b/i,
  /\bcame from nowhere\b/i,
  /\bartificial hype\b/i,
]

/** Meme > product / next big thing */
export const memeNextBig: RegExp[] = [
  /\bmeme\s*>\s*product\b/i,
  /\bmeme over product\b/i,
  /\bnext big thing\b/i,
  /\bnext eth\b/i,
  /\beth killer\b/i,
  /\bmeme coin\b.*\b(no|without)\b.*\b(product|utility)\b/i,
]

/** GM-only culture */
export const gmCulture: RegExp[] = [
  /\bonly gm\b/i,
  /\bgm only\b/i,
  /\bgm culture\b/i,
  /\bno real discussion\b/i,
  /\bsurface level\b/i,
  /\bno tech talk\b/i,
  /\bonly (gm|gn)\b/i,
]

/** Mods / toxic positivity */
export const modsCensor: RegExp[] = [
  /\bmods?\b.*\b(delete|remove|ban)\b/i,
  /\bdelete(s|d)? criticism\b/i,
  /\bban(ned)? for fud\b/i,
  /\bcensor(ship)?\b/i,
  /\bgood vibes only\b/i,
  /\btoxic positivity\b/i,
  /\bno (negativity|fud allowed)\b/i,
  /\bwagmi only\b/i,
]

/** Community rewards only */
export const communityRewardsOnly: RegExp[] = [
  /\bonly (for |here for )(the )?rewards\b/i,
  /\brewards only\b/i,
  /\bpoints farm\b/i,
  /\bfarm points\b/i,
  /\bcommunity\b.*\b(only|just)\b.*\b(rewards|points|airdrop)\b/i,
]

/** Questions unanswered */
export const questionsIgnored: RegExp[] = [
  /\bquestions?\b.*\b(unanswered|ignored|no answer)\b/i,
  /\bno answer\b/i,
  /\bwon'?t answer\b/i,
  /\bavoid(s|ing|ed)?\b.*\b(hard )?questions?\b/i,
  /\bgoes unanswered\b/i,
]

/** Fake engagement */
export const fakeEngagement: RegExp[] = [
  /\bfake engagement\b/i,
  /\bsame people everywhere\b/i,
  /\bastroturf/i,
  /\bcopy.?paste replies\b/i,
  /\bsock puppet/i,
  /\bbot farm/i,
]

/** Founder behavior */
export const founderBehavior: RegExp[] = [
  /\bfounder\b.*\b(avoid|dodge|ignore|silent)\b/i,
  /\bama cancelled\b/i,
  /\bover.?promis/i,
  /\bblames?\b.*\b(the )?market\b/i,
  /\bbear market excuse\b/i,
  /\bplay(s|ing)? victim\b/i,
  /\bhaters\b/i,
  /\bfudsters\b/i,
  /\bvictim (card|complex)\b/i,
  /\bblames? (everything )?on\b/i,
]

/** Talk not build / early stage */
export const talkNotBuild: RegExp[] = [
  /\btalks more than builds\b/i,
  /\ball talk\b/i,
  /\btwitter spaces\b/i,
  /\balways early stage\b/i,
  /\bstill early\b/i,
  /\bearly stage excuse\b/i,
  /\byears?\s+early\b/i,
  /\bmore talk than ship/i,
]

/** Audit / contracts */
export const auditContracts: RegExp[] = [
  /\bno audit\b/i,
  /\bunaudited\b/i,
  /\baudit soon\b/i,
  /\bunknown (auditor|audit firm)\b/i,
  /\bobscure auditor\b/i,
  /\bcontracts? not public\b/i,
  /\bnot verified on (etherscan|explorer)\b/i,
  /\bclosed source\b/i,
  /\bhidden bytecode\b/i,
]

/** Upgradeable unclear */
export const upgradeableUnclear: RegExp[] = [
  /\bupgradeable\b.*\b(no timelock|unclear|opaque|without clarity)\b/i,
  /\bproxy\b.*\b(unclear|opaque|no timelock|without clarity)\b/i,
  /\badmin key\b.*\b(unclear|opaque|hidden)\b/i,
  /\bowner can change\b.*\b(anything|everything|without)\b/i,
  /\bupgradeable contract\b.*\b(why|unclear|opaque)\b/i,
]

/** Wallet / treasury */
export const walletTreasury: RegExp[] = [
  /\bweird wallet\b/i,
  /\bsuspicious transfer/i,
  /\btreasury not transparent\b/i,
  /\bopaque treasury\b/i,
  /\bmoved funds\b/i,
  /\bstrange (wallet )?movement/i,
]

/** Not decentralized */
export const notDecentralized: RegExp[] = [
  /\bnot (really )?decentralized\b/i,
  /\bdecentralization theater\b/i,
  /\bfew validators\b/i,
  /\bcorporate nodes\b/i,
  /\bmultisig control\b/i,
  /\bnot as decentralized\b/i,
  /\bfake decentrali/i,
]

/** Tech vs users */
export const techNoUsers: RegExp[] = [
  /\bnot enough users\b/i,
  /\bno users\b/i,
  /\busers don'?t use\b/i,
  /\bghost chain\b/i,
  /\bempty chain\b/i,
  /\btoo much tech\b/i,
  /\btech without users\b/i,
  /\bchain (is )?unused\b/i,
  /\bno adoption\b/i,
  /\blow adoption\b/i,
]

/** Marketing inconsistency */
export const marketingInconsistent: RegExp[] = [
  /\bmarketing inconsistent\b/i,
  /\bcommunity inconsistent\b/i,
  /\bmixed messages\b/i,
  /\bdoesn'?t match\b.*\b(roadmap|story)\b/i,
  /\binconsistent\b.*\b(marketing|community|message)\b/i,
  /\bstory keeps changing\b/i,
]

/** Doesn't care about community */
export const doesntCareCommunity: RegExp[] = [
  /\bdoesn'?t care about (the )?community\b/i,
  /\bdoesnt care about community\b/i,
  /\bignores community\b/i,
  /\bcommunity neglected\b/i,
  /\bcommunity last\b/i,
  /\bdoesn'?t care about holders\b/i,
]

/** No / weak community */
export const noCommunity: RegExp[] = [
  /\bno community\b/i,
  /\bno real community\b/i,
  /\bdoesn'?t have (a )?community\b/i,
  /\bdoesnt have (a )?community\b/i,
  /\bwithout (a )?community\b/i,
  /\black(ing)? (of )?(a )?community\b/i,
  /\bempty (discord|telegram|tg)\b/i,
  /\bdead community\b/i,
  /\bghost town\b/i,
  /\bweak community\b/i,
  /\blacks community\b/i,
  /\bno real users\b/i,
  /\bcommunity (is )?(dead|empty|gone)\b/i,
]

/** Skeptical one-liners (expanded) */
export const vibeCheckQuotes: RegExp[] = [
  /feels like exit liquidity/i,
  /here for the airdrop/i,
  /not the product/i,
  /everyone sounds smart/i,
  /no one ships/i,
  /more branding than building/i,
  /community stronger than the tech/i,
  /disappear overnight/i,
  /you don'?t understand/i,
  /neither do they/i,
  /\bexit liquidity\b/i,
  /\bairdrop not the product\b/i,
  /\bbranding than building\b/i,
  /\bstronger than the tech\b/i,
  /\bovernight\b.*\b(disappear|gone|rug)\b/i,
  /\bsmarter than the tech\b/i,
]
