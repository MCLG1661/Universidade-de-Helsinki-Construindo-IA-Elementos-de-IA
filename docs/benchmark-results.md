# Lexical benchmark — initial development set

CI run: https://github.com/MCLG1661/Universidade-de-Helsinki-Construindo-IA-Elementos-de-IA/actions/runs/45502626665

12 synthetic cases, 11 expected category assignments. Micro-averaged multi-label metrics.

| Engine | TP | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|
| Legacy | 11 | 2 | 0 | 0.846154 | 1 | 0.916667 |
| Precise | 11 | 0 | 0 | 1 | 1 | 1 |

67 tests passed. This is a deliberately selected development set, not an independent holdout or clinical evaluation. No generalization claim is supported. Contextual validation is not included in these metrics.

Reproduce: node --test tests/evaluation.test.mjs
