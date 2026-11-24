import { normalizeText, tokenize } from './legacy-engine.mjs';

export { normalizeText, tokenize };

export function classifyText(normalizedText, tokens, appData) {
    const words = normalizedText.split(' ').filter(Boolean);
    const results = appData.categories.map(category => {
        const matchedKeywords = [];
        let score = 0;
        for (const keyword of category.keywords) {
            const phrase = normalizeText(keyword).split(' ').filter(Boolean);
            if (!phrase.length) continue;
            const matched = words.some((_, i) =>
                phrase.every((word, j) => words[i + j] === word));
            if (matched) {
                matchedKeywords.push(keyword);
                score += appData.engine.scoring.exact_match;
            }
        }
        const maximum = category.keywords.length * appData.engine.scoring.exact_match;
        return { category, score, similarity: maximum > 0 ? score / maximum : 0,
            matchedKeywords: [...new Set(matchedKeywords)] };
    });
    return results.filter(r => r.similarity >= appData.engine.threshold)
        .sort((a,b) => b.similarity - a.similarity || b.score - a.score)
        .slice(0, appData.engine.max_results);
}
