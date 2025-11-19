// Base de dados médica expandida e melhorada
const medicalDatabase = {
    conditions: [
        {
            name: "gripe comum",
            symptoms: ["febre", "dor cabeça", "coriza", "dor corpo", "calafrios", "espirros", "tosse leve"],
            urgency: "low",
            description: "Infecção viral respiratória comum",
            recommendations: [
                "Repouso e hidratação adequada",
                "Medicação para febre se necessário",
                "Alimentação leve e nutritiva",
                "Monitorar temperatura corporal",
                "Consultar médico se sintomas persistirem por mais de 3 dias"
            ],
            icon: "🤧"
        },
        {
            name: "influenza",
            symptoms: ["febre alta", "calafrios", "dor corpo", "fadiga", "tosse", "dor garganta", "dor cabeça"],
            urgency: "medium",
            description: "Infecção viral mais severa que a gripe comum",
            recommendations: [
                "Repouso absoluto",
                "Hidratação intensiva",
                "Medicação antiviral se prescrita",
                "Isolamento para evitar contágio",
                "Consulta médica em 24-48 horas"
            ],
            icon: "🤒"
        },
        {
            name: "emergência cardíaca",
            symptoms: ["dor peito", "falta ar", "suor frio", "náusea", "dor braço", "tontura", "palpitações"],
            urgency: "high",
            description: "Condição cardíaca potencialmente grave",
            recommendations: [
                "PROCURAR ATENDIMENTO IMEDIATO",
                "Chamar SAMU 192",
                "Não dirigir até o hospital",
                "Manter repouso absoluto",
                "Informar histórico médico ao atendente"
            ],
            icon: "❤️‍🩹"
        },
        {
            name: "gastroenterite",
            symptoms: ["dor abdominal", "náusea", "vômito", "diarreia", "febre", "cólica", "perda apetite"],
            urgency: "medium",
            description: "Inflamação do sistema digestivo",
            recommendations: [
                "Hidratação com soro caseiro",
                "Dieta leve (banana, arroz, maçã, torrada)",
                "Repouso digestivo",
                "Evitar lácteos e gordurosos",
                "Consulta médica se sintomas persistirem"
            ],
            icon: "🤢"
        },
        {
            name: "covid-19 suspeita",
            symptoms: ["febre", "tosse seca", "falta ar", "perda paladar", "fadiga", "dor corpo", "dor cabeça"],
            urgency: "high",
            description: "Suspeita de infecção por COVID-19",
            recommendations: [
                "Isolamento imediato",
                "Teste COVID-19 recomendado",
                "Monitorar saturação de oxigênio",
                "Consulta médica urgente",
                "Informar contatos recentes"
            ],
            icon: "🦠"
        },
        {
            name: "enxaqueca",
            symptoms: ["dor cabeça", "enjoo", "sensibilidade luz", "tontura", "visão turva", "náusea"],
            urgency: "low",
            description: "Dor de cabeça intensa e recorrente",
            recommendations: [
                "Repouso em ambiente escuro e silencioso",
                "Hidratação adequada",
                "Analgésico se prescrito",
                "Compressa fria na testa",
                "Consulta neurológica se recorrente"
            ],
            icon: "😫"
        },
        {
            name: "dengue suspeita",
            symptoms: ["febre alta", "manchas pele", "dor corpo", "dor olhos", "náusea", "fadiga", "dor cabeça"],
            urgency: "high",
            description: "Suspeita de infecção por dengue",
            recommendations: [
                "Repouso absoluto",
                "Hidratação intensiva",
                "NÃO tomar anti-inflamatórios",
                "Procurar atendimento urgente",
                "Monitorar sinais de alarme"
            ],
            icon: "🩸"
        },
        {
            name: "amigdalite",
            symptoms: ["dor garganta", "febre", "dificuldade engolir", "tosse", "mal estar", "inchaço gânglios"],
            urgency: "medium",
            description: "Inflamação das amígdalas",
            recommendations: [
                "Gargarejo com água morna e sal",
                "Hidratação com líquidos mornos",
                "Alimentos pastosos",
                "Analgésico para dor",
                "Consulta médica para avaliação"
            ],
            icon: "🦷"
        },
        {
            name: "crise hipertensiva",
            symptoms: ["tontura", "visão turva", "náusea", "dor cabeça", "falta ar", "dor peito", "confusão"],
            urgency: "high",
            description: "Elevação grave da pressão arterial",
            recommendations: [
                "PROCURAR ATENDIMENTO IMEDIATO",
                "Manter repouso sentado",
                "Medir pressão arterial se possível",
                "Não tomar medicação por conta própria",
                "Chamar emergência se sintomas graves"
            ],
            icon: "🫀"
        },
        {
            name: "otite média",
            symptoms: ["dor ouvido", "febre", "coceira ouvido", "diminuição audição", "secreção", "irritabilidade"],
            urgency: "medium",
            description: "Infecção no ouvido médio",
            recommendations: [
                "Compressa morna no ouvido",
                "Analgésico para dor",
                "Não introduzir objetos no ouvido",
                "Manter ouvido seco",
                "Consulta com otorrinolaringologista"
            ],
            icon: "👂"
        },
        {
            name: "ansiedade aguda",
            symptoms: ["falta ar", "palpitações", "suor frio", "tremores", "medo", "tontura", "formigamento"],
            urgency: "medium",
            description: "Crise de ansiedade ou ataque de pânico",
            recommendations: [
                "Respiração lenta e profunda",
                "Ambiente calmo e seguro",
                "Técnicas de grounding",
                "Acompanhamento psicológico",
                "Consulta médica para avaliação"
            ],
            icon: "😰"
        },
        {
            name: "alergia respiratória",
            symptoms: ["espirros", "coriza", "coceira nariz", "olhos vermelhos", "tosse", "coceira garganta"],
            urgency: "low",
            description: "Reação alérgica respiratória",
            recommendations: [
                "Evitar alérgenos conhecidos",
                "Ambiente ventilado e limpo",
                "Antialérgico se prescrito",
                "Lavagem nasal com soro",
                "Consulta alergista se recorrente"
            ],
            icon: "🌸"
        }
    ]
};

// Configurações de urgência expandidas
const urgencyConfig = {
    low: {
        emoji: "🟢",
        level: "BAIXA URGÊNCIA",
        description: "Pode aguardar consulta em 48-72 horas",
        color: "#22c55e",
        icon: "🟢"
    },
    medium: {
        emoji: "🟡",
        level: "URGÊNCIA MÉDIA",
        description: "Recomendada consulta em 24-48 horas",
        color: "#f59e0b",
        icon: "🟡"
    },
    high: {
        emoji: "🔴",
        level: "ALTA URGÊNCIA",
        description: "Procure atendimento médico IMEDIATO",
        color: "#ef4444",
        icon: "🔴"
    }
};

// Elementos DOM
const symptomsInput = document.getElementById('symptomsInput');
const analyzeButton = document.getElementById('analyzeButton');
const resultsSection = document.getElementById('resultsSection');
const urgencyLevel = document.getElementById('urgencyLevel');
const conditionResult = document.getElementById('conditionResult');
const recommendationsCard = document.getElementById('recommendationsCard');
const recommendationsList = document.getElementById('recommendationsList');
const loadingScreen = document.getElementById('loadingScreen');
const emergencyModal = document.getElementById('emergencyModal');
const charCount = document.querySelector('.char-count');

// Histórico de análises
let analysisHistory = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupQuickSymptoms();
});

// Inicializar aplicação
function initializeApp() {
    // Simular carregamento
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);

    // Configurar contador de caracteres
    symptomsInput.addEventListener('input', updateCharCount);
}

// Configurar event listeners
function setupEventListeners() {
    analyzeButton.addEventListener('click', analyzeSymptoms);
    
    symptomsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeSymptoms();
        }
    });

    // Fechar modal ao clicar fora
    emergencyModal.addEventListener('click', function(e) {
        if (e.target === emergencyModal) {
            closeModal();
        }
    });
}

// Configurar sintomas rápidos
function setupQuickSymptoms() {
    const symptomTags = document.querySelectorAll('.symptom-tag');
    symptomTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const symptom = this.getAttribute('data-symptom');
            addSymptomToInput(symptom);
        });
    });
}

// Atualizar contador de caracteres
function updateCharCount() {
    const count = symptomsInput.value.length;
    charCount.textContent = `${count}/500 caracteres`;
    
    if (count > 400) {
        charCount.style.color = '#ef4444';
    } else if (count > 300) {
        charCount.style.color = '#f59e0b';
    } else {
        charCount.style.color = '#6b7280';
    }
}

// Adicionar sintoma ao input
function addSymptomToInput(symptom) {
    const currentText = symptomsInput.value.trim();
    if (currentText) {
        symptomsInput.value = currentText + ', ' + symptom;
    } else {
        symptomsInput.value = symptom;
    }
    symptomsInput.focus();
    updateCharCount();
}

// Função para pré-processar texto
function preprocessText(text) {
    return text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// Função para calcular similaridade entre sintomas
function calculateSimilarity(inputSymptoms, conditionSymptoms) {
    const inputWords = inputSymptoms.split(' ');
    const conditionWords = conditionSymptoms;
    
    let matches = 0;
    let weightedMatches = 0;
    
    inputWords.forEach(word => {
        if (word.length < 3) return; // Ignorar palavras muito curtas
        
        let found = false;
        conditionWords.forEach(conditionWord => {
            // Verificar correspondência exata ou parcial
            if (conditionWord.includes(word) || word.includes(conditionWord)) {
                found = true;
                // Dar mais peso para correspondências exatas
                if (conditionWord === word) {
                    weightedMatches += 2;
                } else {
                    weightedMatches += 1;
                }
            }
        });
        
        if (found) matches++;
    });
    
    const baseSimilarity = matches / Math.max(inputWords.length, conditionWords.length);
    const weightedSimilarity = weightedMatches / (conditionWords.length * 2);
    
    return (baseSimilarity + weightedSimilarity) / 2;
}

// Função principal de análise
function analyzeSymptoms() {
    const symptomsText = symptomsInput.value.trim();
    
    if (!symptomsText) {
        showNotification('❌ Por favor, descreva seus sintomas para análise.', 'error');
        return;
    }
    
    if (symptomsText.length < 10) {
        showNotification('❌ Por favor, seja mais específico sobre seus sintomas.', 'error');
        return;
    }
    
    // Mostrar loading
    analyzeButton.classList.add('loading');
    const btnLoading = analyzeButton.querySelector('.btn-loading');
    btnLoading.classList.remove('hidden');
    
    // Simular processamento (em app real seria instantâneo)
    setTimeout(() => {
        processAnalysis(symptomsText);
        analyzeButton.classList.remove('loading');
        btnLoading.classList.add('hidden');
    }, 1500);
}

// Processar análise
function processAnalysis(symptomsText) {
    // Pré-processar entrada
    const processedInput = preprocessText(symptomsText);
    
    // Encontrar condições similares
    const matches = findConditionMatches(processedInput);
    
    if (matches.length === 0) {
        showNoMatchesResults();
        return;
    }
    
    // Ordenar por similaridade
    matches.sort((a, b) => b.similarity - a.similarity);
    
    // Pegar melhor match
    const bestMatch = matches[0];
    const secondaryMatches = matches.slice(1, 3); // Top 3 secundárias
    
    // Salvar no histórico
    saveToHistory(symptomsText, bestMatch);
    
    // Exibir resultados
    displayResults(bestMatch, secondaryMatches);
}

// Encontrar correspondências de condições
function findConditionMatches(inputSymptoms) {
    const matches = [];
    
    medicalDatabase.conditions.forEach(condition => {
        const similarity = calculateSimilarity(inputSymptoms, condition.symptoms);
        
        if (similarity > 0.1) { // Threshold mínimo de similaridade
            matches.push({
                condition: condition,
                similarity: similarity
            });
        }
    });
    
    return matches;
}

// Exibir resultados quando não há correspondências
function showNoMatchesResults() {
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('fade-in');
    
    urgencyLevel.innerHTML = `
        <div class="card-header">
            <i class="fas fa-question-circle"></i>
            <h3>Nível de Urgência</h3>
        </div>
        <div class="card-content">
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #6b7280; margin-bottom: 1rem;"></i>
                <h4 style="color: #6b7280; margin-bottom: 0.5rem;">Análise Inconclusiva</h4>
                <p style="color: #6b7280;">Não foi possível identificar uma condição específica com os sintomas descritos.</p>
            </div>
        </div>
    `;
    
    conditionResult.innerHTML = `
        <div class="card-header">
            <i class="fas fa-stethoscope"></i>
            <h3>Recomendação Geral</h3>
        </div>
        <div class="card-content">
            <p>Recomendamos que você:</p>
            <ul style="margin-top: 1rem; padding-left: 1.5rem;">
                <li>Descreva os sintomas com mais detalhes</li>
                <li>Mencione a duração e intensidade</li>
                <li>Informe medicamentos em uso</li>
                <li>Consulte um médico para avaliação precisa</li>
            </ul>
        </div>
    `;
    
    recommendationsCard.classList.add('hidden');
    
    // Rolar para resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Exibir resultados
function displayResults(bestMatch, secondaryMatches) {
    // Mostrar seção de resultados
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('fade-in');
    recommendationsCard.classList.remove('hidden');
    
    const condition = bestMatch.condition;
    const urgency = urgencyConfig[condition.urgency];
    const confidence = Math.min(95, Math.round(bestMatch.similarity * 100));
    
    // Configurar card de urgência
    urgencyLevel.innerHTML = `
        <div class="card-header">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Nível de Urgência</h3>
        </div>
        <div class="card-content">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="font-size: 3rem;">${urgency.icon}</div>
                <div>
                    <h4 style="color: ${urgency.color}; margin: 0; font-size: 1.5rem;">${urgency.level}</h4>
                    <p style="margin: 0.25rem 0 0 0; color: #6b7280;">${urgency.description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Configurar card de condição
    let conditionHTML = `
        <div class="card-header">
            <i class="fas fa-stethoscope"></i>
            <h3>Condições Identificadas</h3>
        </div>
        <div class="card-content">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="font-size: 2.5rem;">${condition.icon}</div>
                <div>
                    <h4 style="margin: 0; color: #1f2937;">${condition.name.toUpperCase()}</h4>
                    <p style="margin: 0.25rem 0 0 0; color: #6b7280;">${condition.description}</p>
                    <div style="margin-top: 0.5rem;">
                        <span style="background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem;">
                            ${confidence}% de confiança
                        </span>
                    </div>
                </div>
            </div>
    `;
    
    // Adicionar condições secundárias se existirem
    if (secondaryMatches.length > 0) {
        conditionHTML += `<div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">`;
        conditionHTML += `<h5 style="margin-bottom: 1rem; color: #6b7280;">Outras possibilidades:</h5>`;
        conditionHTML += `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">`;
        
        secondaryMatches.forEach(match => {
            const secConfidence = Math.min(90, Math.round(match.similarity * 100));
            conditionHTML += `
                <span style="background: #f3f4f6; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; border: 1px solid #e5e7eb;">
                    ${match.condition.icon} ${match.condition.name} (${secConfidence}%)
                </span>
            `;
        });
        
        conditionHTML += `</div></div>`;
    }
    
    conditionHTML += `</div>`;
    conditionResult.innerHTML = conditionHTML;
    
    // Configurar recomendações
    recommendationsList.innerHTML = '';
    condition.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle" style="color: #10b981; margin-right: 0.5rem;"></i>${rec}`;
        li.style.marginBottom = '0.5rem';
        li.style.padding = '0.5rem';
        li.style.background = '#f0fdf4';
        li.style.borderRadius = '8px';
        li.style.borderLeft = '3px solid #10b981';
        recommendationsList.appendChild(li);
    });
    
    // Mostrar notificação de sucesso
    showNotification('✅ Análise concluída com sucesso!', 'success');
    
    // Rolar para resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Salvar no histórico
function saveToHistory(symptoms, match) {
    const analysis = {
        timestamp: new Date().toISOString(),
        symptoms: symptoms,
        condition: match.condition.name,
        urgency: match.condition.urgency,
        confidence: Math.round(match.similarity * 100)
    };
    
    analysisHistory.unshift(analysis); // Adicionar no início
    if (analysisHistory.length > 10) {
        analysisHistory.pop(); // Manter apenas os 10 mais recentes
    }
    
    localStorage.setItem('healthGuardianHistory', JSON.stringify(analysisHistory));
}

// Mostrar notificação
function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'error') {
        notification.style.background = '#ef4444';
    } else if (type === 'success') {
        notification.style.background = '#10b981';
    } else {
        notification.style.background = '#6b7280';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Funções de modal
function callEmergency() {
    emergencyModal.classList.remove('hidden');
}

function findDoctors() {
    showNotification('🔍 Buscando médicos próximos... (Funcionalidade em desenvolvimento)', 'info');
}

function closeModal() {
    emergencyModal.classList.add('hidden');
}

// Carregar histórico do localStorage
function loadHistory() {
    const saved = localStorage.getItem('healthGuardianHistory');
    if (saved) {
        analysisHistory = JSON.parse(saved);
    }
}

// Inicializar histórico
loadHistory();

// Service Worker simulado (para PWA)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}

console.log("🏥 HealthGuardian AI Premium inicializado!");
