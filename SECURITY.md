# Security & safe use

This document describes **limitations and safe-use expectations** for the Web3 Red Flag Detector. It is **not** a guarantee about the code or any deployment environment.

## Not financial or security advice

This project is an **entertainment / gut-check pattern matcher**. It does **not**:

- Provide investment, legal, or tax advice  
- Replace a smart-contract audit, formal due diligence, or professional review  
- Predict scams or “safe” projects  

**Treat every score as meaningless without your own research (DYOR).**

## Sensitive data — do not paste

The app runs in **your browser**. Still, you should **not** paste into the tool (or into any untrusted site):

- **Seed phrases**, **recovery words**, or **private keys**  
- **Full wallet export** data or **API keys**  
- Highly sensitive **personal data** you would not want in page memory, screenshots, or exports  

If you already pasted something sensitive: rotate credentials, move funds if appropriate, and treat the session as potentially exposed depending on your threat model.

## How the app handles text (default build)

The **default** implementation processes text **locally in the browser** for pattern matching. It does **not** include a bundled server that sends your input to a third party.

If you **fork** the project and add analytics, APIs, or backends, that changes the story — document it clearly for your users.

## Reporting security issues in this repository

- **Code / dependency vulnerabilities:** open a [GitHub Security Advisory](https://github.com/neseliolfu2re/web3redflag/security/advisories) (private) or a public issue if the maintainer prefers low-severity discussion.  
- **Abuse of pattern lists** (e.g. harmful regex): use [Issues](https://github.com/neseliolfu2re/web3redflag/issues) or a PR.

We are grateful for responsible disclosure; please allow reasonable time to review fixes.

## Disclaimer

Software is provided **“as is”** under the [LICENSE](./LICENSE). Maintainers are not liable for decisions made using this tool.
