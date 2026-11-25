# HealthGuardian Evolution — experimental contract

The independent validator accepts synthetic source text and an array of nonempty lexical terms. It returns schemaVersion 0.2.0, per-term status, exact source excerpts and UTF-16 offsets. All results require human review. A lexical match does not establish truth, clinical relevance or semantic entailment.

Statuses: lexical_match, not_found, negated, uncertain, historical, third_party, ambiguous, mixed.

Context is a bounded Portuguese heuristic, not a trained model. Negation scope, coordination, double negatives, morphology, attribution and temporal expressions remain incomplete. Do not use real patient data or clinical workflows. No external service or network is required by the core.

Example:
```js
import {buildReport} from './core/validator.mjs';
console.log(buildReport('Tenho tosse. Sem febre.', ['tosse','febre','náusea']));
```

Run all tests with `node --test tests/*.test.mjs` (Node 22).
Legacy engine and fixtures remain available for comparison. No external MediFlow code was copied; integration and license review remain pending.

Quality fields: occurrenceCount, exactSourceOffsets, distinctContexts, conflictingContexts, contextualMarkers. These describe observable evidence properties, not calibrated confidence or factual correctness. The browser displays only claims with occurrences; the independent contract retains missing claims.
