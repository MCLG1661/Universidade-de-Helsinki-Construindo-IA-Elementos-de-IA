function normalizeText(text) {
    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function tokenize(text) {
    if (!text) return [];

    return text
        .split(" ")
        .map((token) => token.trim())
        .filter((token) => token.length >= 3);
}

function classifyText(normalizedText, tokens, appData) {
    const results = appData.categories.map((category) => {
        const matchedKeywords = [];
        let score = 0;

        category.keywords.forEach((keyword) => {
            const normalizedKeyword = normalizeText(keyword);

            if (!normalizedKeyword) return;

            if (normalizedText.includes(normalizedKeyword)) {
                matchedKeywords.push(keyword);
                score += appData.engine.scoring.exact_match;
                return;
            }

            const keywordTokens = tokenize(normalizedKeyword);

            const partialMatches = keywordTokens.filter((keywordToken) =>
                tokens.some((token) =>
                    token.includes(keywordToken) ||
                    keywordToken.includes(token)
                )
            );

            if (partialMatches.length > 0) {
                matchedKeywords.push(keyword);
                score += appData.engine.scoring.partial_match;
            }
        });

        const maximumPossibleScore =
            category.keywords.length * appData.engine.scoring.exact_match;

        const similarity =
            maximumPossibleScore > 0
                ? score / maximumPossibleScore
                : 0;

        return {
            category,
            score,
            similarity,
            matchedKeywords: [...new Set(matchedKeywords)]
        };
    });

    return results
        .filter((result) => result.similarity >= appData.engine.threshold)
        .sort((a, b) => {
            if (b.similarity !== a.similarity) {
                return b.similarity - a.similarity;
            }

            return b.score - a.score;
        })
        .slice(0, appData.engine.max_results);
}

export { normalizeText, tokenize, classifyText };
