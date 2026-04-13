# Contributing patterns

Thanks for helping improve the [Web3 Red Flag Detector](https://github.com/neseliolfu2re/web3redflag). This project is a **keyword toy**, not financial or security advice.

## Quick path

1. **Fork** the repo and create a branch, e.g. `add-patterns-xyz`.
2. Edit **`src/lib/redFlagLexicon.ts`** — add one or more `RegExp` entries to the array that fits your phrase (see file for examples: `export const noWorkingProduct`, `export const noCommunity`, etc.).
3. If you need a **new category**, add a new `export const myCategory: RegExp[] = [...]` and wire it in **`src/lib/web3RedFlags.ts`** (new rule object with `matchesAny(f, myCategory)`).
4. Run locally:
   ```bash
   npm install
   npm run dev
   ```
   Try your new phrases in the UI.
5. Run **`npm run build`** and fix any TypeScript/ESLint issues.
6. Open a **Pull Request** with a short description: what phrases should match and why (optional: false positives to avoid).

## Pattern guidelines

- **English only** in the lexicon (UI is English).
- Prefer **specific** phrases over huge catch-alls — overly broad regex causes noise.
- One line per regex is fine; short comments above a tricky line help reviewers.
- No slurs, hate targeting groups, or illegal content — keep it professional.

## Questions

Open an [issue](https://github.com/neseliolfu2re/web3redflag/issues) if you’re unsure where a pattern should live.
