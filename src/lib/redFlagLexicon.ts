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
  /\broad\s*map\b.*\b(keeps changing|changed again|shifting goalposts|slip|slipped)\b/i,
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
  /\bmods?\b.*\b(delete|purge|ban)\b/i,
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
  /\btransferred funds\b/i,
  /\bstrange (wallet )?activity/i,
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

/** Heavy VC influence (narrative / control, not only allocation %) */
export const heavyVcInfluence: RegExp[] = [
  /\bheavy vc influence\b/i,
  /\bvc influence\b/i,
  /\bheavily vc[- ]backed\b/i,
  /\bvc[- ]driven narrative\b/i,
  /\bvc narrative\b/i,
  /\bvc (money|money'?s) (shapes|controls|drives)\b/i,
  /\bvc (board|pressure|agenda)\b/i,
  /\binfluenced by (the )?vcs?\b/i,
  /\bventure (capital|firms?) (call|the shots|control)\b/i,
  /\binsider vc (deal|round)\b/i,
  /\bvc (overhang|overhangs)\b/i,
  /\btoo much vc\b/i,
  /\bvc (money )?speaks\b/i,
]

/** Controversial or criticized tokenomics */
export const controversialTokenomics: RegExp[] = [
  /\bcontroversial tokenomics\b/i,
  /\bunfair tokenomics\b/i,
  /\bpredatory tokenomics\b/i,
  /\btokenomics (backlash|controversy|debate)\b/i,
  /\bsketchy tokenomics\b/i,
  /\b(token|emission) (schedule )?unfair\b/i,
  /\binflation (too high|out of control)\b/i,
  /\binsider[- ]heavy (allocation|supply)\b/i,
  /\bteam (allocation|share) (too high|too large)\b/i,
  /\bunlock (schedule )?(unfair|sketchy)\b/i,
  /\bvesting (is |was )?(unfair|predatory)\b/i,
  /\bdump(ing)? on retail\b/i,
  /\bretail (gets|got) (dumped|rekt)\b/i,
  /\bopaque tokenomics\b/i,
  /\bchanging tokenomics\b/i,
]

/** User activity driven mainly by airdrops / quests */
export const airdropDrivenActivity: RegExp[] = [
  /\bairdrop[- ]driven\b/i,
  /\bdriven by (the )?airdrop\b/i,
  /\bairdrop[- ]driven user\b/i,
  /\buser activity.*\b(airdrop|points|quests)\b/i,
  /\bactivity (is |mostly |largely )\b.*\b(farm|farming|quests)\b/i,
  /\bmercenary (liquidity|users|capital)\b/i,
  /\bonly (here )?for (the )?(points|quests|airdrop)\b/i,
  /\bfarm(ing)? (the )?(points|quests|campaign)\b/i,
  /\bquest[- ]only (users|activity)\b/i,
  /\bincentivized (testnet )?activity\b/i,
  /\bsybil (farm|farming|activity)\b/i,
  /\bnot organic (usage|activity|growth)\b/i,
]

/** Copy-paste / fork ecosystem projects */
export const copyPasteEcosystem: RegExp[] = [
  /\bcopy[- ]paste (ecosystem )?project\b/i,
  /\bcopy[- ]paste (from|of)\b/i,
  /\b(template|cookie[- ]cutter) (defi|nft|dao)\b/i,
  /\bfork of (ethereum|eth|solana|uniswap)\b/i,
  /\bunoriginal fork\b/i,
  /\becosystem (clone|copy)\b/i,
  /\bderivative (protocol|project|dex)\b/i,
  /\bsame (code|ui) as\b/i,
  /\brebranded fork\b/i,
  /\bclone of\b.*\b(on|from)\b/i,
  /\bethereum (clone|copy) on\b/i,
  /\bthinly veiled fork\b/i,
]

/**
 * Weak ecosystem support for learning chain languages — funding/docs/onboarding gaps,
 * not “this language is bad.” Includes Move alongside other stacks when named.
 */
export const inadequateDevLearningSupport: RegExp[] = [
  /\bdoesn'?t help\b.*\b(dev|developer|builder)s?\b.*\blearn\b/i,
  /\bno (real )?help\b.*\b(learning|onboarding|new devs|first[- ]time devs)\b/i,
  /\blearning (resources|materials|content)\b.*\b(lacking|missing|absent|thin|underfunded)\b/i,
  /\beducational (content|resources)\b.*\b(insufficient|missing|stale)\b/i,
  /\bdev (education|training|enablement)\b.*\b(neglected|underfunded|missing|afterthought)\b/i,
  /\bno (mentorship|mentors?|office hours)\b.*\b(for )?(dev|developer|builder)s?\b/i,
  /\bfoundation\b.*\b(doesn'?t invest in|won'?t fund|cut)\b.*\b(education|learning|training)\b/i,
  /\bno (funded )?(tutorials|courses|workshops)\b.*\b(for )?(dev|developer)\b/i,
  /\bon your own\b.*\b(learn|figure (it )?out|read the code)\b/i,
  /\bbad (dev )?onboarding\b/i,
  /\bdocs (are )?(empty|missing|outdated|useless)\b.*\b(for )?(new|first)\b/i,
  /\bno (clear )?getting started\b/i,
  /\bno starter (examples|templates|sample (apps|projects))\b/i,
  /\bsdk (docs|onboarding)\b.*\b(lacking|missing|broken)\b/i,
  /\bgrant(s)? for\b.*\b(learning|education)\b.*\b(no|none|zero)\b/i,
  /\b(no|thin|lacking) (docs|tutorials|courses)\b.*\b(solidity|rust|vyper|cairo|haskell|plutus|michelson|scilla)\b/i,
  /\b(solidity|rust|vyper|cairo|haskell|plutus|michelson|scilla)\b.*\b(underdocumented|no docs|docs missing|where are the docs)\b/i,
  /\bmove language\b.*\b(underdocumented|no docs|docs missing|thin tutorials)\b/i,
  /\b(learning move|learn move)\b.*\b(no (good )?resources|unsupported|on your own)\b/i,
  /\bno\b.*\b(official )?(course|curriculum)\b.*\b(move language|solidity|rust|cairo)\b/i,
]

/** Validator centralization / stake concentration */
export const validatorCentralization: RegExp[] = [
  /\bvalidator centrali[sz]ation\b/i,
  /\bcentrali[sz]ed validators\b/i,
  /\bfew validators (control|own|run)\b/i,
  /\bvalidator concentration\b/i,
  /\bstake (concentration|skewed|centralized)\b/i,
  /\btop (10|5|3) validators\b/i,
  /\bsuperminority\b/i,
  /\bnakamoto coefficient\b/i,
  /\bstake (too )?concentrated\b/i,
  /\bwhale validators\b/i,
  /\bmajority (of )?stake (in|with)\b/i,
  /\bgeo[- ]centrali[sz]ed validators\b/i,
  /\bcloud validators\b/i,
]

/** Narrative-driven growth / story over substance */
export const narrativeDrivenGrowth: RegExp[] = [
  /\bnarrative[- ]driven (growth|pump|rally)\b/i,
  /\bgrowth (is |was )?all narrative\b/i,
  /\bnarrative (pump|trade|coin)\b/i,
  /\ball (hype|price) (is |was )?narrative\b/i,
  /\bstory stock\b/i,
  /\bhype narrative\b/i,
  /\bmarketing (over|beats) product\b/i,
  /\bnarrative (first|only)\b/i,
  /\bprice follows (the )?narrative\b/i,
  /\btwitter (drives|is) the (product|roadmap)\b/i,
  /\bno fundamentals (just|only) (narrative|story)\b/i,
  /\brotating narratives\b/i,
]

/** Weak long-term sustainability / runway */
export const weakLongTermSustainability: RegExp[] = [
  /\bweak long[- ]term sustainability\b/i,
  /\blong[- ]term sustainability\b.*\b(weak|poor|doubtful)\b/i,
  /\bunsustainable (in the )?long (run|term)\b/i,
  /\bno (clear )?long[- ]term (plan|revenue)\b/i,
  /\bwon'?t survive (the )?(bear|downturn)\b/i,
  /\brunway (ends?|running out|short)\b/i,
  /\btreasury (deplet|dry|running low)\b/i,
  /\bno (recurring )?revenue\b/i,
  /\bburn rate (too high|unsustainable)\b/i,
  /\bunsustainable (business|model|project)\b/i,
  /\bshort[- ]term incentives (only)?\b/i,
  /\bcan'?t fund (itself|development)\b/i,
  /\bdependent on (new )?raises\b/i,
]

/** Incentivized users vs organic community */
export const incentiveVsRealCommunity: RegExp[] = [
  /\bincentive(s)? vs (real |organic )?community\b/i,
  /\breal community vs (incentives|points)\b/i,
  /\bmercenary community\b/i,
  /\bincentivized users (not|aren'?t) (real|organic)\b/i,
  /\bpoints (not|instead of) community\b/i,
  /\bnot (an )?organic community\b/i,
  /\bpaid (community|engagement) (only|farm)\b/i,
  /\bfarmers not (fans|believers|users)\b/i,
  /\bcommunity (is |was )?(fake|hollow|paid)\b/i,
  /\bartificial community\b/i,
  /\bsybil (community|users)\b/i,
  /\bliquidity (mining )?mercenar/i,
  /\bwhen incentives end\b/i,
  /\bghost town after (airdrop|incentives)\b/i,
]

/** Extreme downtrend from all-time high */
export const extremeDowntrendFromAth: RegExp[] = [
  /\bextreme downtrend\b.*\b(ath|all[- ]time high)\b/i,
  /\b(down|crashed|dumped) (-)?\d{1,3}% (from|off) (the )?ath\b/i,
  /\b(far|way) below (the )?ath\b/i,
  /\bnever (reclaimed|recovered) (the )?ath\b/i,
  /\bath (was|is) (ages|years) ago\b/i,
  /\bbrutal drawdown\b.*\b(from ath|from peak)\b/i,
  /\b-\d{2,3}% from ath\b/i,
  /\bdown bad from ath\b/i,
  /\bath to (now|here)\b.*\b(down|ugly|brutal)\b/i,
  /\bcollapsed from (the )?peak\b/i,
  /\bpeak to trough\b/i,
  /\bstill (down|under) (the )?ath\b/i,
]

/** Weak reaction to positive / bullish news */
export const weakReactionPositiveNews: RegExp[] = [
  /\bweak reaction to (good|positive|bullish) news\b/i,
  /\b(positive|good) news\b.*\b(no rally|didn'?t pump|flat|dumped|sold off)\b/i,
  /\bsell the news\b/i,
  /\bmuted reaction\b.*\b(announcement|partnership|listing)\b/i,
  /\bno follow[- ]through (on|after) (the )?news\b/i,
  /\brally failed\b.*\b(despite|even with)\b/i,
  /\bpriced in (already)?\b.*\b(no bounce|flat tape|dead)\b/i,
  /\bgood news.*bad price\b/i,
  /\bannouncement.*(dump|red candle)\b/i,
  /\bno bounce on (the )?catalyst\b/i,
]

/** Continuous bearish price structure */
export const continuousBearishStructure: RegExp[] = [
  /\bcontinuous bearish (structure|price action)\b/i,
  /\bbearish (market )?structure\b/i,
  /\blower highs\b.*\b(lower lows|downtrend)\b/i,
  /\bseries of lower highs\b/i,
  /\bdeath (spiral|by) (a )?thousand cuts\b/i,
  /\b(stair|staircase) step( )?down\b/i,
  /\bstructurally bearish\b/i,
  /\bone[- ]sided (sell|distribution)\b/i,
  /\bpersistent (downtrend|bleed|sell pressure)\b/i,
  /\bbreakdown (after|on) breakdown\b/i,
  /\bno higher highs\b/i,
]

/** Lack of sustained buy pressure */
export const lackSustainedBuyPressure: RegExp[] = [
  /\black of sustained buy (pressure|demand)\b/i,
  /\bno sustained (buyers|bids|accumulation)\b/i,
  /\bbuy (pressure|side) (weak|thin|dried up)\b/i,
  /\bthin (order )?book\b.*\b(bids|buy side)\b/i,
  /\babsorption failed\b/i,
  /\bno follow[- ]through buying\b/i,
  /\bbounces (keep )?failing\b/i,
  /\bsells (into|on) every (bounce|rip)\b/i,
  /\bcan'?t hold (gains|the bid)\b/i,
  /\bconstant (overhead|supply)\b/i,
]

/** High early valuation vs real demand mismatch */
export const highValuationDemandMismatch: RegExp[] = [
  /\bhigh (early )?valuation\b.*\b(real demand|volume|usage)\b/i,
  /\bvaluation (mismatch|disconnect)\b/i,
  /\bfdv (vs|versus)\b.*\b(volume|liquidity|demand)\b/i,
  /\bovervalued (at|vs)\b.*\b(real|actual) (usage|adoption|demand)\b/i,
  /\brich valuation\b.*\b(thin|weak) (liquidity|volume)\b/i,
  /\bfully diluted.*\b(unrealistic|absurd)\b/i,
  /\bprice (implies|assumes)\b.*\b(no users|no revenue)\b/i,
  /\bhype (vs|versus) fundamentals\b/i,
  /\bmarket cap (not|doesn'?t) match\b/i,
  /\bpriced for perfection\b/i,
]

/** Liquidity exit pressure after launch / TGE */
export const liquidityExitAfterLaunch: RegExp[] = [
  /\bliquidity exit\b.*\b(after launch|post[- ]tge|post launch)\b/i,
  /\bpost[- ]?(tge|launch) (dump|sell[- ]off|pressure)\b/i,
  /\bexit liquidity\b.*\b(at|on) (launch|listing|tge)\b/i,
  /\bsellers (at|on) (launch|day one|tge)\b/i,
  /\bdump (on|at) (launch|listing|open)\b/i,
  /\binsiders? (sold|dumped) (at|on|after)\b/i,
  /\bfirst (day|hour) (dump|sell)\b/i,
  /\blistings? (then )?dump\b/i,
  /\btge (bloodbath|rug|dump)\b/i,
  /\bpulled liquidity\b.*\b(after|post)\b/i,
]

/** Weak marketing / GTM execution */
export const weakMarketingExecution: RegExp[] = [
  /\bweak marketing (execution|team)?\b/i,
  /\bmarketing (execution )?(is |was )?(weak|poor|bad)\b/i,
  /\b(poor|bad|nonexistent) (go[- ]to[- ]market|gtm|marketing)\b/i,
  /\bincoherent (marketing|messaging|brand)\b/i,
  /\binvisible (project|brand) (on )?(crypto )?twitter\b/i,
  /\bno coherent (narrative|story|brand)\b/i,
  /\bmarketing (failure|flop|miss)\b/i,
  /\bcan'?t (get|cut) through (the )?noise\b/i,
  /\bzero (marketing|outreach|pr)\b/i,
  /\bundermarketed\b/i,
]

/** Inefficient ecosystem / grants management */
export const inefficientEcosystemManagement: RegExp[] = [
  /\binefficient ecosystem (management|ops)\b/i,
  /\b(ecosystem )?grants? (mess|mismanaged|broken|opaque)\b/i,
  /\bgrants? (committee|program)\b.*\b(ineffective|slow|political)\b/i,
  /\becosystem fund\b.*\b(misused|wasted|poorly allocated)\b/i,
  /\b(builder|dev) support\b.*\b(lacking|missing|slow)\b/i,
  /\bno (clear )?(ecosystem )?strategy\b/i,
  /\bfund (allocation|decisions)\b.*\b(opaque|crony|random)\b/i,
  /\bpet projects\b.*\b(grants|fund)\b/i,
  /\bprocess (is )?(broken|a mess)\b/i,
]

/** Perceived nepotism / insider favoritism */
export const perceivedNepotismInsiderFavoritism: RegExp[] = [
  /\b(perceived )?nepotism\b/i,
  /\binsider favoritism\b/i,
  /\bfriends and family (round|allocation|deal)\b/i,
  /\bcrony (capital|allocation|deal)\b/i,
  /\bconnected insiders\b/i,
  /\binsider (deals?|round)\b.*\b(favor|unfair)\b/i,
  /\brevolving door\b.*\b(insider|team|vc)\b/i,
  /\ballocation (went|goes) to (friends|insiders)\b/i,
  /\bwho you know\b.*\b(allocation|grant|deal)\b/i,
  /\bopaque (allocation|hiring)\b.*\b(insider|related)\b/i,
  /\bconflict of interest\b.*\b(allocation|grant)\b/i,
]

/** Lack of ecosystem project support */
export const lackEcosystemProjectSupport: RegExp[] = [
  /\black of ecosystem (project )?support\b/i,
  /\bno support for ecosystem projects\b/i,
  /\becosystem projects?\b.*\b(abandoned|left behind|on their own)\b/i,
  /\bbuilders?\b.*\b(left hanging|no backing|no support)\b/i,
  /\becosystem (funding|grants?)\b.*\b(cut|dried up|paused|stopped)\b/i,
  /\bno (real )?ecosystem support\b/i,
  /\bfund (doesn'?t|won'?t) support\b.*\b(builders|projects)\b/i,
  /\bgrant (program )?(ended|pulled)\b/i,
  /\becosystem (teams?|projects?)\b.*\b(ignored|neglected)\b/i,
]

/** Insufficient developer support & engagement */
export const insufficientDeveloperSupportEngagement: RegExp[] = [
  /\binsufficient developer support\b/i,
  /\bdeveloper support\b.*\b(lacking|missing|weak|poor)\b/i,
  /\bpoor (dev|developer) engagement\b/i,
  /\bno (real )?(devrel|developer relations)\b/i,
  /\bdevs?\b.*\b(ignored|ghosted|unheard)\b/i,
  /\bno technical support for (dev|developer|builder)s?\b/i,
  /\bfoundation\b.*\b(ignores|snubs) (dev|developer|builder)s?\b/i,
  /\black of\b.*\b(dev|developer) (outreach|support|engagement)\b/i,
  /\bbuilder (questions?|requests?)\b.*\b(unanswered|ignored)\b/i,
]

/** Weak internal team support & recognition */
export const weakInternalTeamSupportRecognition: RegExp[] = [
  /\bweak internal (team )?support\b/i,
  /\bno recognition for (the )?(team|contributors|engineers)\b/i,
  /\bcontributors?\b.*\b(unrecognized|no credit|stolen credit)\b/i,
  /\btoxic internal (culture|politics)\b/i,
  /\bburnout\b.*\b(ignored|denied)\b/i,
  /\binternal (team )?churn\b/i,
  /\bteam morale\b.*\b(low|bad|toxic)\b/i,
  /\bleadership (takes|took) (all )?credit\b/i,
  /\bno internal (support|recognition)\b/i,
  /\bemployees?\b.*\b(undervalued|overworked|unheard)\b/i,
]

/** Low community value alignment */
export const lowCommunityValueAlignment: RegExp[] = [
  /\blow community value alignment\b/i,
  /\b(misaligned|not aligned) with (the )?community\b/i,
  /\bcommunity values\b.*\b(ignored|disregarded|violated)\b/i,
  /\bvalues (don'?t|do not) match (the )?community\b/i,
  /\bnot listening to (the )?community\b/i,
  /\bcommunity (doesn'?t|does not) trust\b/i,
  /\bout of touch with (the )?community\b/i,
  /\bcommunity (backlash|revolt)\b.*\b(values|direction|vision)\b/i,
  /\bdiscordant with community (values|expectations)\b/i,
]

/** Limited on-chain user retention */
export const limitedOnChainUserRetention: RegExp[] = [
  /\blimited on[- ]chain (user )?retention\b/i,
  /\b(poor|low|weak) (user )?retention\b.*\b(on[- ]chain|chain|wallet)\b/i,
  /\busers (don'?t|do not) stick\b/i,
  /\bhigh churn\b.*\b(users|wallets|addresses)\b/i,
  /\bone[- ]and[- ]done users\b/i,
  /\bno sticky (users|behavior|usage)\b/i,
  /\bdau (down|dropping|collapsed)\b/i,
  /\bmercenary (users|capital)\b.*\b(leave|left|gone)\b/i,
  /\bretention (is |was )?(bad|weak|terrible)\b/i,
  /\bcan'?t retain\b.*\b(users|wallets)\b/i,
]

/** Sustained token unlock pressure over months/years (beyond one-off cliff) */
export const tokenUnlockPressureOverTime: RegExp[] = [
  /\bunlock pressure\b.*\b(over time|for years|ongoing|continuous)\b/i,
  /\b(years|months) of (unlocks|vesting|supply hitting the market)\b/i,
  /\blinear (unlock|vesting|emissions?)\b.*\b(years|ongoing)\b/i,
  /\bprolonged (unlock|vesting) (schedule|overhang)\b/i,
  /\brolling unlocks\b/i,
  /\bconstant (supply|token) (influx|hit|pressure)\b/i,
  /\bunlock (schedule|calendar)\b.*\b(heavy|packed|years)\b/i,
  /\bsustained sell pressure\b.*\b(unlock|vest|emission)\b/i,
  /\boverhang\b.*\b(quarters|years)\b/i,
]

/** Ecosystem fragmentation — many projects, low cohesion */
export const ecosystemFragmentation: RegExp[] = [
  /\becosystem fragmentation\b/i,
  /\bfragmented ecosystem\b/i,
  /\b(many|tons of) projects\b.*\b(low cohesion|no cohesion|don'?t work together)\b/i,
  /\bbalkanized ecosystem\b/i,
  /\bsiloed (projects|teams|apps)\b/i,
  /\bno unified (vision|stack|roadmap)\b/i,
  /\beveryone (building|building their) own\b/i,
  /\bduplicative (dapps|projects|apps)\b/i,
  /\blow cohesion\b.*\b(ecosystem|community)\b/i,
  /\bscatter(ed|shot) (grants|incentives)\b/i,
]

/** Weak product–market fit in core DeFi apps */
export const weakProductMarketFitDefi: RegExp[] = [
  /\bweak product[- ]market fit\b/i,
  /\b(poor|no) pmf\b.*\b(defi|dex|lending|perps)\b/i,
  /\bcore (defi )?apps?\b.*\b(not used|unused|ghost)\b/i,
  /\bdefi (tvl|volume)\b.*\b(fake|incentivized|empty)\b/i,
  /\bno real demand\b.*\b(product|protocol|app)\b/i,
  /\bsolution (looking for|without) (users|demand)\b/i,
  /\bproduct doesn'?t fit (the )?market\b/i,
  /\bghost (protocol|tvl|usage)\b/i,
  /\busage (is |was )?(anemic|hollow)\b/i,
]

/** Slow adaptation to market cycles */
export const slowAdaptationMarketCycles: RegExp[] = [
  /\bslow adaptation\b.*\b(market|bull|bear|cycle)\b/i,
  /\b(missed|behind) the (cycle|market)\b/i,
  /\btoo slow to (pivot|adapt)\b/i,
  /\bdidn'?t adapt\b.*\b(bear|bull|regime)\b/i,
  /\bbehind (the )?market\b/i,
  /\bstill building\b.*\b(what (the )?market wanted|last cycle)\b/i,
  /\bwrong cycle (timing|thesis)\b/i,
  /\bslow (to respond|response)\b.*\b(macro|liquidity|sentiment)\b/i,
]

/** Partnership hype without tangible outcomes */
export const partnershipHypeNoOutcomes: RegExp[] = [
  /\bpartnership(s)?\b.*\b(no (real )?outcome|vapor|nothing shipped)\b/i,
  /\boverhyp(ed|ing)?\b.*\b(partnership|mou|collab|integration)\b/i,
  /\bmou\b.*\b(only|no product|no integration)\b/i,
  /\bannouncement(s)?\b.*\b(no follow[- ]through|followed by nothing)\b/i,
  /\bstrategic (partnership|collab)\b.*\b(hollow|meaningless|pr only)\b/i,
  /\blogo (deal|partnership)\b/i,
  /\bpress release\b.*\b(no (real )?integration|no launch)\b/i,
  /\bpartnership (marketing|theater)\b/i,
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
