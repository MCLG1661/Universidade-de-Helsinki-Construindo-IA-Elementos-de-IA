import { normalizeText, tokenize, classifyText } from "./core/lexical-engine.mjs";

import { buildReport } from "./core/validator.mjs";

import {chooseLanguage,applyLanguage,translate} from "./core/i18n.mjs";
let language = chooseLanguage(null,navigator.language);
try { language=chooseLanguage(localStorage.getItem("hg-language"),navigator.language); } catch {}
let appData = null;
const t=(pt,en)=>language==="en"?en:pt;
const englishLabels={"Exemplo Respiratório":"Respiratory example","Exemplo Digestivo":"Digestive example","Exemplo Energia":"Energy example","Exemplo Estresse":"Stress example","Vocabulário Respiratório":"Respiratory vocabulary","Vocabulário Digestivo":"Digestive vocabulary","Vocabulário de Dor de Cabeça":"Headache vocabulary","Vocabulário de Energia e Disposição":"Energy vocabulary","Vocabulário de Estresse e Tensão":"Stress and tension vocabulary","Vocabulário de Desconforto Geral":"General discomfort vocabulary","Alta similaridade lexical":"High lexical similarity","Similaridade lexical moderada":"Moderate lexical similarity","Baixa similaridade lexical":"Low lexical similarity","Entrada":"Input","Normalização":"Normalization","Tokenização":"Tokenization","Correspondência":"Matching","Pontuação":"Scoring","Classificação":"Classification","Transparência":"Transparency","Explicabilidade":"Explainability","Limitação de escopo":"Scope limitation","Privacidade":"Privacy","Categoria experimental associada a termos frequentemente utilizados em descrições relacionadas ao sistema respiratório.":"Experimental category for respiratory vocabulary.","A presença desses termos indica somente proximidade lexical com esta categoria.":"These terms indicate lexical proximity only.","Categoria experimental relacionada a palavras utilizadas em descrições do sistema digestivo.":"Experimental category for digestive vocabulary.","O resultado não representa identificação de uma condição médica.":"The result does not identify a medical condition.","Categoria experimental composta por termos relacionados a descrições de dor de cabeça e sensações associadas.":"Experimental category for headache-related vocabulary.","Termos semelhantes podem ocorrer em diferentes contextos e não permitem conclusão clínica.":"Similar terms may occur in different contexts and do not support clinical conclusions.","Categoria educacional relacionada a termos de energia, disposição e sensação de cansaço.":"Educational category for energy and fatigue vocabulary.","A classificação indica apenas ocorrência de termos associados à categoria.":"Classification only indicates occurrence of associated terms.","Categoria experimental para palavras relacionadas a tensão, pressão e estado emocional autodeclarado.":"Experimental category for tension, pressure and self-reported emotional states.","Esta categoria não representa avaliação psicológica ou de saúde mental.":"This category is not a psychological or mental health assessment.","Categoria experimental destinada a descrições genéricas que não se concentram em um único conjunto de termos.":"Experimental category for general descriptions.","A categoria funciona apenas como agrupamento lexical genérico.":"This category is only a generic lexical grouping.","O usuário fornece uma frase ou conjunto de palavras.":"The user supplies a sentence or words.","O texto é convertido para um formato padronizado para facilitar a comparação.":"Text is standardized for comparison.","O texto é separado em termos relevantes.":"Text is separated into relevant terms.","Os termos são comparados com vocabulários associados a categorias experimentais.":"Terms are compared with experimental vocabularies.","Cada categoria recebe uma pontuação baseada na quantidade e relevância das correspondências.":"Each category receives a score based on matches.","A categoria com maior similaridade lexical é apresentada como resultado educacional.":"The highest lexical similarity is presented as an educational result.","Área da Inteligência Artificial dedicada ao processamento e análise computacional da linguagem.":"AI field concerned with computational language processing and analysis.","Processo de padronização do texto antes de sua análise.":"Standardizing text before analysis.","Separação de um texto em unidades menores utilizadas durante a análise.":"Separating text into smaller units for analysis.","Comparação entre termos presentes no texto e características previamente definidas.":"Comparing text terms with predefined features.","Processo de associação de uma entrada a uma ou mais categorias.":"Associating input with one or more categories.","Capacidade de apresentar ao usuário os fatores que contribuíram para determinado resultado.":"Showing the factors contributing to a result.","A interface deve deixar claro que a classificação utiliza regras e não um modelo clínico.":"The interface makes clear that classification uses rules, not a clinical model.","Os termos responsáveis por cada correspondência devem ser apresentados ao usuário.":"Terms responsible for each match are shown.","A aplicação não deve transformar similaridade textual em diagnóstico ou recomendação médica.":"Text similarity must not become a diagnosis or medical recommendation.","A versão atual deve processar as entradas localmente, sem banco de dados.":"Inputs are processed locally without a database."};
const localized=value=>language==="en"?(englishLabels[value]??value):value;
function refreshLanguage(){
 renderProjectIdentity(); renderExamples(); renderPipeline(); renderConcepts(); renderResponsibleAI();
 applyLanguage(document,language);
 if(state.input) renderResults(state.matches);
}


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
        refreshLanguage();
        const selectors=document.querySelectorAll('input[name="interfaceLanguage"]');
        selectors.forEach(selector=>{
            selector.checked=selector.value===language;
            selector.addEventListener("change",()=>{
                if(!selector.checked)return;
                language=chooseLanguage(selector.value,navigator.language);
                try{localStorage.setItem("hg-language",language);}catch{}
                refreshLanguage();
            });
        });
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
        subtitle.textContent = translate(appData.project.subtitle,language);
    }

    if (context) {
        context.textContent = translate(appData.project.context,language);
    }

    if (engine) {
        engine.textContent = translate(appData.project.engine,language);
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
            <span class="example-label">${escapeHTML(localized(example.title))}</span>
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
                <h3>${escapeHTML(localized(item.name))}</h3>
                <p>${escapeHTML(localized(item.description))}</p>
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
            <p>${escapeHTML(localized(concept.description))}</p>
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
            <h3>${escapeHTML(localized(principle.name))}</h3>
            <p>${escapeHTML(localized(principle.description))}</p>
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
        showNotification(t("Digite uma frase para executar a classificação.","Enter a sentence to run classification."), "warning");
        return;
    }

    if (text.length < 5) {
        showNotification(t("Use uma frase um pouco mais descritiva.","Use a slightly more descriptive sentence."), "warning");
        return;
    }

    state.input = text;

    const normalizedText = normalizeText(text);
    const tokens = tokenize(normalizedText);
    const matches = classifyText(normalizedText, tokens, appData);

    state.matches = matches;

    renderAnalysisProcess(text, normalizedText, tokens);
    renderResults(matches);
    renderEvidence(text);
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
        const summary = document.getElementById("resultSummary");
        if (summary) summary.textContent = "";
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
            : `<span class="muted-text">${t("Nenhum termo explícito identificado.","No explicit term identified.")}</span>`;

        card.innerHTML = `
            <div class="result-card-header">
                <div class="result-rank">#${index + 1}</div>
                <div>
                    <span class="result-type">${t("Categoria experimental","Experimental category")}</span>
                    <h3>${escapeHTML(localized(result.category.label))}</h3>
                </div>
            </div>

            <p class="result-description">
                ${escapeHTML(localized(result.category.description))}
            </p>

            <div class="result-metric">
                <div>
                    <span class="metric-label">${t("Similaridade lexical","Lexical similarity")}</span>
                    <strong>${percent}%</strong>
                </div>
                <span class="similarity-label">
                    ${escapeHTML(localized(interpretation))}
                </span>
            </div>

            <div class="progress-track" aria-hidden="true">
                <div
                    class="progress-bar"
                    style="width: ${Math.min(percent, 100)}%"
                ></div>
            </div>

            <div class="matched-keywords">
                <span class="section-mini-label">${t("Termos correspondentes","Matched terms")}</span>
                <div class="match-tags">
                    ${keywordsHTML}
                </div>
            </div>

            <div class="explanation-box">
                <span class="section-mini-label">${t("Como o resultado foi obtido","How the result was obtained")}</span>
                <p>
                    ${t("Pontuação por correspondências lexicais:","Lexical match score:")} <strong>${result.score}</strong>.
                </p>
            </div>

            <div class="educational-note">
                <strong>${t("Nota educacional:","Educational note:")}</strong>
                ${escapeHTML(localized(result.category.educational_note))}
            </div>
        `;

        resultsGrid.appendChild(card);
    });

    renderResultSummary(matches[0]);
}

function renderEvidence(text) {
    const output = document.getElementById("evidenceOutput");
    if (!output) return;
    const keywords = [...new Map(appData.categories.flatMap(c => c.keywords).map(k => [normalizeText(k), k])).values()];
    const report = buildReport(text, keywords);
    report.claims = report.claims.filter(c => c.evidence.length);
    output.textContent = JSON.stringify(report, null, 2);
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
            <span class="summary-label">${t("Resultado principal","Main result")}</span>
            <h3>${escapeHTML(localized(bestResult.category.label))}</h3>
            <p>
                ${percent}% ${t("de similaridade lexical com o vocabulário experimental, sem significado clínico.","lexical similarity to the experimental vocabulary, with no clinical meaning.")}
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
    const evidence = document.getElementById("evidenceOutput");
    if (evidence) evidence.textContent = "";

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
