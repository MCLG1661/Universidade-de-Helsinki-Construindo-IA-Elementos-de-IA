let appData = null;

const state = {
    input: "",
    matches: []
};

document.addEventListener("DOMContentLoaded", async () => {
    await initializeApp();
});

async function initializeApp() {
    try {
        appData = await loadAppData();
        renderProjectIdentity();
        renderExamples();
        renderPipeline();
        renderConcepts();
        renderResponsibleAI();
        setupEventListeners();
        registerServiceWorker();
    } catch (error) {
        console.error("Erro ao inicializar o HealthGuardian AI:", error);
        showApplicationError();
    }
}

async function loadAppData() {
    const response = await fetch("data.json");

    if (!response.ok) {
        throw new Error(`Falha ao carregar data.json: ${response.status}`);
    }

    return response.json();
}

function renderProjectIdentity() {
    const title = document.querySelector("[data-project-name]");
    const subtitle = document.querySelector("[data-project-subtitle]");
    const context = document.querySelector("[data-project-context]");
    const engine = document.querySelector("[data-project-engine]");

    if (title) {
        title.textContent = appData.project.name;
    }

    if (subtitle) {
        subtitle.textContent = appData.project.subtitle;
    }

    if (context) {
        context.textContent = appData.project.context;
    }

    if (engine) {
        engine.textContent = appData.project.engine;
    }
}

function renderExamples() {
    const container = document.getElementById("exampleInputs");

    if (!container) return;

    container.innerHTML = "";

    appData.example_inputs.forEach((example) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "example-card";
        button.innerHTML = `
            <span class="example-label">${escapeHTML(example.title)}</span>
            <span class="example-text">${escapeHTML(example.text)}</span>
        `;

        button.addEventListener("click", () => {
            const input = document.getElementById("textInput");

            if (!input) return;

            input.value = example.text;
            updateCharacterCount();
            input.focus();
        });

        container.appendChild(button);
    });
}

function renderPipeline() {
    const container = document.getElementById("pipelineSteps");

    if (!container) return;

    container.innerHTML = "";

    appData.pipeline.forEach((item) => {
        const step = document.createElement("article");
        step.className = "pipeline-step";

        step.innerHTML = `
            <div class="pipeline-number">${item.step}</div>
            <div>
                <h3>${escapeHTML(item.name)}</h3>
                <p>${escapeHTML(item.description)}</p>
            </div>
        `;

        container.appendChild(step);
    });
}

function renderConcepts() {
    const container = document.getElementById("conceptsGrid");

    if (!container) return;

    container.innerHTML = "";

    appData.concepts.forEach((concept) => {
        const card = document.createElement("article");
        card.className = "concept-card";

        card.innerHTML = `
            <span class="concept-short">${escapeHTML(concept.short_name)}</span>
            <h3>${escapeHTML(concept.name)}</h3>
            <p>${escapeHTML(concept.description)}</p>
        `;

        container.appendChild(card);
    });
}

function renderResponsibleAI() {
    const container = document.getElementById("responsibleAIGrid");

    if (!container) return;

    container.innerHTML = "";

    appData.responsible_ai.principles.forEach((principle) => {
        const card = document.createElement("article");
        card.className = "responsible-card";

        card.innerHTML = `
            <h3>${escapeHTML(principle.name)}</h3>
            <p>${escapeHTML(principle.description)}</p>
        `;

        container.appendChild(card);
    });
}

function setupEventListeners() {
    const analyzeButton = document.getElementById("analyzeButton");
    const clearButton = document.getElementById("clearButton");
    const textInput = document.getElementById("textInput");

    if (analyzeButton) {
        analyzeButton.addEventListener("click", analyzeText);
    }

    if (clearButton) {
        clearButton.addEventListener("click", clearAnalysis);
    }

    if (textInput) {
        textInput.addEventListener("input", updateCharacterCount);

        textInput.addEventListener("keydown", (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                analyzeText();
            }
        });
    }
}

function analyzeText() {
    const input = document.getElementById("textInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) {
        showNotification("Digite uma frase para executar a classificação.", "warning");
        return;
    }

    if (text.length < 5) {
        showNotification("Use uma frase um pouco mais descritiva.", "warning");
        return;
    }

    state.input = text;

    const normalizedText = normalizeText(text);
    const tokens = tokenize(normalizedText);
    const matches = classifyText(normalizedText, tokens);

    state.matches = matches;

    renderAnalysisProcess(text, normalizedText, tokens);
    renderResults(matches);
}

function classifyText(normalizedText, tokens) {
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

function renderAnalysisProcess(originalText, normalizedText, tokens) {
    const section = document.getElementById("analysisSection");
    const original = document.getElementById("originalText");
    const normalized = document.getElementById("normalizedText");
    const tokensContainer = document.getElementById("tokensOutput");

    if (!section || !original || !normalized || !tokensContainer) return;

    original.textContent = originalText;
    normalized.textContent = normalizedText;

    tokensContainer.innerHTML = "";

    tokens.forEach((token) => {
        const tag = document.createElement("span");
        tag.className = "token-tag";
        tag.textContent = token;
        tokensContainer.appendChild(tag);
    });

    section.classList.remove("hidden");
}

function renderResults(matches) {
    const resultsSection = document.getElementById("resultsSection");
    const resultsGrid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyResult");

    if (!resultsSection || !resultsGrid || !emptyState) return;

    resultsSection.classList.remove("hidden");
    resultsGrid.innerHTML = "";

    if (matches.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    matches.forEach((result, index) => {
        const card = document.createElement("article");
        card.className = index === 0
            ? "result-card primary-result"
            : "result-card";

        const interpretation = getSimilarityInterpretation(result.similarity);
        const percent = Math.round(result.similarity * 100);

        const keywordsHTML = result.matchedKeywords.length
            ? result.matchedKeywords
                .map(
                    (keyword) =>
                        `<span class="match-tag">${escapeHTML(keyword)}</span>`
                )
                .join("")
            : `<span class="muted-text">Nenhum termo explícito identificado.</span>`;

        card.innerHTML = `
            <div class="result-card-header">
                <div class="result-rank">#${index + 1}</div>
                <div>
                    <span class="result-type">Categoria experimental</span>
                    <h3>${escapeHTML(result.category.label)}</h3>
                </div>
            </div>

            <p class="result-description">
                ${escapeHTML(result.category.description)}
            </p>

            <div class="result-metric">
                <div>
                    <span class="metric-label">Similaridade lexical</span>
                    <strong>${percent}%</strong>
                </div>
                <span class="similarity-label">
                    ${escapeHTML(interpretation)}
                </span>
            </div>

            <div class="progress-track" aria-hidden="true">
                <div
                    class="progress-bar"
                    style="width: ${Math.min(percent, 100)}%"
                ></div>
            </div>

            <div class="matched-keywords">
                <span class="section-mini-label">Termos correspondentes</span>
                <div class="match-tags">
                    ${keywordsHTML}
                </div>
            </div>

            <div class="explanation-box">
                <span class="section-mini-label">Como o resultado foi obtido</span>
                <p>
                    A categoria recebeu <strong>${result.score} ponto(s)</strong>
                    a partir das correspondências encontradas entre o texto informado
                    e o vocabulário previamente definido.
                </p>
            </div>

            <div class="educational-note">
                <strong>Nota educacional:</strong>
                ${escapeHTML(result.category.educational_note)}
            </div>
        `;

        resultsGrid.appendChild(card);
    });

    renderResultSummary(matches[0]);
}

function renderResultSummary(bestResult) {
    const summary = document.getElementById("resultSummary");

    if (!summary) return;

    const percent = Math.round(bestResult.similarity * 100);

    summary.innerHTML = `
        <div class="summary-icon">
            <i class="fas fa-diagram-project"></i>
        </div>

        <div>
            <span class="summary-label">Resultado principal</span>
            <h3>${escapeHTML(bestResult.category.label)}</h3>
            <p>
                O texto apresentou ${percent}% de similaridade lexical com esta
                categoria experimental. Esse percentual representa apenas a
                relação entre os termos digitados e o vocabulário cadastrado.
            </p>
        </div>
    `;
}

function getSimilarityInterpretation(similarity) {
    const interpretation = appData.engine.interpretation;

    if (similarity >= interpretation.high.min) {
        return interpretation.high.label;
    }

    if (similarity >= interpretation.medium.min) {
        return interpretation.medium.label;
    }

    return interpretation.low.label;
}

function clearAnalysis() {
    const input = document.getElementById("textInput");
    const analysisSection = document.getElementById("analysisSection");
    const resultsSection = document.getElementById("resultsSection");
    const resultsGrid = document.getElementById("resultsGrid");
    const resultSummary = document.getElementById("resultSummary");

    state.input = "";
    state.matches = [];

    if (input) {
        input.value = "";
        input.focus();
    }

    if (analysisSection) {
        analysisSection.classList.add("hidden");
    }

    if (resultsSection) {
        resultsSection.classList.add("hidden");
    }

    if (resultsGrid) {
        resultsGrid.innerHTML = "";
    }

    if (resultSummary) {
        resultSummary.innerHTML = "";
    }

    updateCharacterCount();
}

function updateCharacterCount() {
    const input = document.getElementById("textInput");
    const counter = document.getElementById("characterCount");

    if (!input || !counter) return;

    counter.textContent = `${input.value.length}/500`;
}

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

function showNotification(message, type = "info") {
    const existing = document.querySelector(".app-notification");

    if (existing) {
        existing.remove();
    }

    const notification = document.createElement("div");
    notification.className = `app-notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add("visible");
    });

    setTimeout(() => {
        notification.classList.remove("visible");

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3500);
}

function showApplicationError() {
    document.body.innerHTML = `
        <main class="fatal-error">
            <div class="fatal-error-card">
                <i class="fas fa-triangle-exclamation"></i>
                <h1>Não foi possível carregar o laboratório</h1>
                <p>
                    Verifique se o arquivo <strong>data.json</strong> está disponível
                    e tente recarregar a página.
                </p>
            </div>
        </main>
    `;
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
        .register("./sw.js")
        .catch((error) => {
            console.warn("Service Worker não registrado:", error);
        });
}
