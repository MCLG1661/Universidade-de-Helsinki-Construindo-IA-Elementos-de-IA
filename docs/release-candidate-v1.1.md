# HealthGuardian AI v1.1 — Release candidate checklist

Status: candidate preparation, not a published release.

## Verified
- 91 Node tests: https://github.com/MCLG1661/Universidade-de-Helsinki-Construindo-IA-Elementos-de-IA/actions/runs/45508156730
- Chromium smoke including offline reload and HTML-like input: https://github.com/MCLG1661/Universidade-de-Helsinki-Construindo-IA-Elementos-de-IA/actions/runs/45508156854
- Lexical synthetic development benchmark: precision 84.62% to 100%, recall 100%, F1 91.67% to 100%.
- Context development 15/15 after tuning; frozen separate synthetic evaluation 11/16 (68.75%).
- Report contract v0.2.0, source offsets in UTF-16, mandatory human review.

## Limitations
Rule-based lexical coverage is not calibrated confidence. Context heuristics can misclassify negation, temporality, uncertainty and third-party attribution. No clinical use or real patient data. No external validation. No MediFlow integration or API yet. Browser test covers selected scenarios in Chromium, not a comprehensive security audit. Vercel headers are configured but not verified on deployed candidate.

## Release gates
- [x] Node CI and Chromium smoke
- [x] Offline scenario and HTML-like input rendering
- [x] Document known benchmark limitations
- [ ] Review README and user-facing terminology
- [ ] Review deployment preview and actual response headers
- [ ] Review pull request before merging
- [ ] Publish release only after approval

## Changes
Exact lexical matching, normalized alias deduplication, contextual evidence annotations, independent report builder, JSON Schema, objective evidence quality indicators, automated evaluation, PWA cache isolation, CSP and permissions configuration.

## Bilingual healthcare identity validation

- Commit `f249f8f`: NLP workflow 45515524714 and Chromium workflow 45515511851 passed.
- Verified PT/EN hero and document title, language persistence, sliding control, mobile viewport 390 × 844 without horizontal overflow, and offline analysis.
- Preview headers workflow 45515511895 failed; external preview validation remains incomplete. Manual visual confirmation of the latest deployment and owner approval remain release gates.
- Interface bilingual; NLP engine remains Portuguese-only and deterministic. Synthetic inputs only.
