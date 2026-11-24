import { normalizeText, tokenize } from './legacy-engine.mjs';

export { normalizeText, tokenize };

export function classifyText(normalizedText, tokens, appData) {
    const words = normalizedText.split(' ').filter(Boolean);
    const results = appData.categories.map(category => {
        const matchedKeywords = [];
        let score = 0;
        const unique = new Map();
        for (const keyword of category.keywords) {
            const normalized = normalizeText(keyword);
            if (normalized && !unique.has(normalized)) unique.set(normalized, keyword);
        }
        for (const [normalized, keyword] of unique) {
            const phrase = normalized.split(' ');
            if (!phrase.length) continue;
            const matched = words.some((_, i) =>
                phrase.every((word, j) => words[i + j] === word));
            if (matched) {
                matchedKeywords.push(keyword);
                score += appData.engine.scoring.exact_match;
            }
        }
        const maximum = unique.size * appData.engine.scoring.exact_match;
        return { category, score, similarity: maximum > 0 ? score / maximum : 0,
            matchedKeywords: [...new Set(matchedKeywords)] };
    });
    return results.filter(r => r.similarity >= appData.engine.threshold)
        .sort((a,b) => b.similarity - a.similarity || b.score - a.score)
        .slice(0, appData.engine.max_results);
}
