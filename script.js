// Banco de dados médico expandido e aprimorado
const medicalDatabase = {
    conditions: [
        {
            name: "resfriado comum",
            symptoms: ["febre", "dor de cabeça", "coriza", "dor no corpo", "calafrios", "espirros", "tosse leve"],
            urgency: "baixa",
            description: "Infecção respiratória viral comum",
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
            name: "influenza (gripe)",
            symptoms: ["febre alta", "calafrios", "dor no corpo", "fadiga", "tosse", "dor de garganta", "dor de cabeça"],
            urgency: "média",
            description: "Infecção viral mais severa que o resfriado comum",
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
            symptoms: ["dor no peito", "falta de ar", "suor frio", "náusea", "dor no braço", "tontura", "palpitações"],
            urgency: "alta",
            description: "Condição cardíaca potencialmente grave",
            recommendations: [
                "BUSQUE ATENDIMENTO MÉDICO IMEDIATO",
                "Ligue SAMU 192",
                "Não dirija até o hospital",
                "Mantenha repouso absoluto",
                "Informe histórico médico ao atendente"
            ],
            icon: "❤️‍🩹"
        },
        {
            name: "gastroenterite",
            symptoms: ["dor abdominal", "náusea", "vômito", "diarreia", "febre", "cólicas", "perda de apetite"],
            urgency: "média",
            description: "Inflamação do sistema digestivo",
            recommendations: [
                "Hidratação com soro caseiro",
                "Dieta leve (banana, arroz, maçã, torrada)",
                "Repouso digestivo",
                "Evitar laticínios e alimentos gordurosos",
                "Consulta médica se sintomas persistirem"
            ],
            icon: "🤢"
        },
        {
            name: "suspeita de covid-19",
            symptoms: ["febre", "tosse seca", "falta de ar", "perda de paladar", "fadiga", "dor no corpo", "dor de cabeça"],
            urgency: "alta",
            description: "Suspeita de infecção por COVID-19",
            recommendations: [
                "Isolamento imediato",
                "Teste para COVID-19 recomendado",
                "Monitorar saturação de oxigênio",
                "Consulta médica urgente",
                "Informar contatos recentes"
            ],
            icon: "🦠"
        },
        {
            name: "enxaqueca",
            symptoms: ["dor de cabeça", "náusea", "sensibilidade à luz", "tontura", "visão turva", "náusea"],
            urgency: "baixa",
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
            name: "suspeita de dengue",
            symptoms: ["febre alta", "manchas na pele", "dor no corpo", "dor atrás dos olhos", "náusea", "fadiga", "dor de cabeça"],
            urgency: "alta",
            description: "Suspeita de infecção por dengue",
            recommendations: [
                "Repouso absoluto",
                "Hidratação intensiva",
                "NÃO tomar anti-inflamatórios",
                "Procure atendimento urgente",
                "Monitore sinais de alarme"
            ],
            icon: "🩸"
        },
        {
            name: "amigdalite",
            symptoms: ["dor de garganta", "febre", "dificuldade para engolir", "tosse", "mal-estar", "ínguas inchadas"],
            urgency: "média",
            description: "Inflamação das amígdalas",
            recommendations: [
                "Gargarejo com água morna e sal",
                "Hidratação com líquidos mornos",
                "Alimentos macios",
                "Analgésico para dor",
                "Consulta médica para avaliação"
            ],
            icon: "🦷"
        },
        {
            name: "crise hipertensiva",
            symptoms: ["tontura", "visão turva", "náusea", "dor de cabeça", "falta de ar", "dor no peito", "confusão mental"],
            urgency: "alta",
            description: "Elevação severa da pressão arterial",
            recommendations: [
                "BUSQUE ATENDIMENTO MÉDICO IMEDIATO",
                "Mantenha repouso sentado",
                "Meça pressão arterial se possível",
                "Não tome medicação por conta própria",
                "Ligue para emergência se sintomas graves"
            ],
            icon: "🫀"
        },
        {
            name: "otite média",
            symptoms: ["dor de ouvido", "febre", "coceira no ouvido", "perda auditiva", "secreção", "irritabilidade"],
            urgency: "média",
            description: "Infecção do ouvido médio",
            recommendations: [
                "Compressa morna no ouvido",
                "Analgésico para dor",
                "Não introduza objetos no ouvido",
                "Mantenha ouvido seco",
                "Consulta com otorrinolaringologista"
            ],
            icon: "👂"
        },
        {
            name: "ansiedade aguda",
            symptoms: ["falta de ar", "palpitações", "suor frio", "tremores", "medo", "tontura", "formigamento"],
            urgency: "média",
            description: "Crise de ansiedade ou ataque de pânico",
            recommendations: [
                "Respiração lenta e profunda",
                "Ambiente calmo e seguro",
                "Técnicas de aterramento",
                "Acompanhamento psicológico",
                "Consulta médica para avaliação"
            ],
            icon: "😰"
        },
        {
            name: "alergia respiratória",
            symptoms: ["espirros", "coriza", "coceira no nariz", "olhos vermelhos", "tosse", "coceira na garganta"],
            urgency: "baixa",
            description: "Reação alérgica respiratória",
            recommendations: [
                "Evite alérgenos conhecidos",
                "Ambiente ventilado e limpo",
                "Anti-histamínico se prescrito",
                "Lavagem nasal com soro",
                "Consulta com alergista se recorrente"
            ],
            icon: "🌸"
        }
    ]
};

// Configurações de urgência expandidas
const urgencyConfig = {
    baixa: {
        emoji: "🟢",
        level: "URGÊNCIA BAIXA",
        description: "Pode aguardar consulta em 48-72 horas",
        color: "#22c55e",
        icon: "🟢"
    },
    média: {
        emoji: "🟡",
        level: "URGÊNCIA MÉDIA",
        description: "Consulta recomendada em 24-48 horas",
        color: "#f59e0b",
        icon: "🟡"
    },
    alta: {
        emoji: "🔴",
        level: "URGÊNCIA ALTA",
        description: "Busque atendimento médico IMEDIATO",
        color: "#ef4444",
        icon: "🔴"
    }
};

// Elementos DOM
const symptomsInput = document.getElementById('symptomsInput');
const analyzeButton = document.getElementById('analyzeButton');
const symptomsSection = document.getElementById('symptomsSection');
const resultsSection = document.getElementById('resultsSection');
const loadingScreen = document.getElementById('loadingScreen');
const emergencyModal = document.getElementById('emergencyModal');
const registrationModal = document.getElementById('registrationModal');
const btnOpenRegister = document.getElementById('btnOpenRegister');
const charCount = document.querySelector('.char-count');
const historyList = document.getElementById('historyList');

// Histórico de análises
let analysisHistory = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupQuickSymptoms();
    loadHistory();
    setupTheme();
    registerServiceWorker();
});

// Inicializar aplicação
function initializeApp() {
    // Simular carregamento
    console.log("Versão 3.0 carregada com sucesso!");
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);

    // Configurar contador de caracteres
    symptomsInput.addEventListener('input', updateCharCount);
}

// Configurar event listeners
function setupEventListeners() {
    analyzeButton.addEventListener('click', analyzeSymptoms);
    
    // Mover os 'onclick' do HTML para cá, centralizando os eventos
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.contact-card[data-action]').forEach(card => {
        card.addEventListener('click', () => window.location.href = card.dataset.action);
    });

    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    if(newAnalysisBtn) newAnalysisBtn.addEventListener('click', showSymptomsSection);

    const themeSwitcher = document.getElementById('theme-switcher');
    if(themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);

    symptomsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeSymptoms();
        }
    });

    // Fechar modal ao clicar fora
    emergencyModal.addEventListener('click', function(e) {
        if (e.target === emergencyModal) closeAllModals();
    });
    
    registrationModal.addEventListener('click', function(e) {
        if (e.target === registrationModal) closeAllModals();
    });

    // Eventos de Cadastro
    if(btnOpenRegister) {
        btnOpenRegister.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botão de cadastro clicado');
            const modal = document.getElementById('registrationModal');
            if(modal) modal.classList.remove('hidden');
            else alert('Erro: Modal de cadastro não encontrado. Tente recarregar a página (Ctrl+F5).');
        });
    }
    
    const registrationForm = document.getElementById('registrationForm');
    if(registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
}

function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const age = document.getElementById('regAge').value;
    
    // Atualizar UI
    document.getElementById('sidebarPatientName').textContent = name;
    document.getElementById('patientName').value = name;
    document.getElementById('patientAge').value = age;
    
    // Fechar modal e notificar
    closeAllModals();
    showNotification('✅ Cadastro realizado com sucesso!', 'success');
    
    // Focar no campo de sintomas
    symptomsInput.focus();
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
    } else if (count > 250) {
        charCount.style.color = '#f59e0b';
    } else {
        charCount.style.color = 'var(--text-secondary)';
    }
}

// Adicionar sintoma ao campo de entrada
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
                // Dar mais peso a correspondências exatas
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
    const patientName = document.getElementById('patientName').value.trim();
    const patientAge = document.getElementById('patientAge').value.trim();
    
    if (!patientName || !patientAge) {
        showNotification('⚠️ Por favor, identifique o paciente (Nome e Idade).', 'error');
        return;
    }
    
    if (!symptomsText) {
        showNotification('❌ Por favor, descreva seus sintomas para análise.', 'error');
        return;
    }
    
    if (symptomsText.length < 10) {
        showNotification('❌ Por favor, seja mais específico sobre seus sintomas.', 'error');
        return;
    }
    
    // Mostrar carregamento
    analyzeButton.classList.add('loading');
    const btnLoading = analyzeButton.querySelector('.btn-loading');
    btnLoading.classList.remove('hidden');
    
    // Simular processamento (em app real seria instantâneo)
    setTimeout(() => {
        processAnalysis(symptomsText, patientName, patientAge);
        analyzeButton.classList.remove('loading');
        btnLoading.classList.add('hidden');
    }, 1500);
}

// Processar análise
function processAnalysis(symptomsText, patientName, patientAge) {
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
    
    // Obter melhor correspondência
    const bestMatch = matches[0];
    const secondaryMatches = matches.slice(1, 3); // Top 3 secundárias
    
    // Salvar no histórico
    saveToHistory(symptomsText, bestMatch, patientName, patientAge);
    
    // Exibir resultados
    displayResults(bestMatch, secondaryMatches);
    displayHistory(); // Atualizar histórico na barra lateral
}

// Encontrar correspondências de condições
function findConditionMatches(inputSymptoms) {
    const matches = [];
    
    medicalDatabase.conditions.forEach(condition => {
        const similarity = calculateSimilarity(inputSymptoms, condition.symptoms);
        
        if (similarity > 0.1) { // Limite mínimo de similaridade
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
    symptomsSection.classList.add('hidden');
    resultsSection.classList.add('fade-in');
    
    const resultGrid = resultsSection.querySelector('.result-grid');
    resultGrid.innerHTML = `
        <div class="result-card">
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
        </div>
        <div class="result-card">
            <div class="card-header">
                <i class="fas fa-stethoscope"></i>
                <h3>Recomendação Geral</h3>
            </div>
            <div class="card-content">
                <p>Recomendamos que você:</p>
                <ul style="margin-top: 1rem; padding-left: 1.5rem;">
                    <li>Descreva os sintomas com mais detalhes</li>
                    <li>Mencione duração e intensidade</li>
                    <li>Informe medicamentos em uso</li>
                    <li>Consulte um médico para avaliação precisa</li>
                </ul>
            </div>
        </div>
    `;
    
    // Rolar para resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Exibir resultados
function displayResults(bestMatch, secondaryMatches) {
    // Alternar visibilidade das seções
    symptomsSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('fade-in');
    
    const condition = bestMatch.condition;
    const urgency = urgencyConfig[condition.urgency];
    const confidence = Math.min(95, Math.round(bestMatch.similarity * 100));
    
    const resultGrid = resultsSection.querySelector('.result-grid');
    resultGrid.innerHTML = ''; // Limpar resultados anteriores

    // Configurar card de urgência
    const urgencyLevel = document.createElement('div');
    urgencyLevel.className = 'result-card';
    urgencyLevel.innerHTML = `
        <div class="card-header">
            <i class="fas fa-exclamation-triangle" style="color: ${urgency.color};"></i>
            <h3>Nível de Urgência</h3>
        </div>
        <div class="card-content">
            <div class="urgency-content">
                <div class="urgency-icon">${urgency.icon}</div>
                <div class="urgency-details">
                    <h4 style="color: ${urgency.color};">${urgency.level}</h4>
                    <p>${urgency.description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Configurar card de condição
    const conditionResult = document.createElement('div');
    conditionResult.className = 'result-card';
    let conditionHTML = `
        <div class="card-header">
            <i class="fas fa-stethoscope"></i>
            <h3>Condições Identificadas</h3>
        </div>
        <div class="card-content">
            <div class="condition-content">
                <div class="condition-icon">${condition.icon}</div>
                <div class="condition-details">
                    <h4>${condition.name.toUpperCase()}</h4>
                    <p>${condition.description}</p>
                    <div>
                        <span class="confidence-badge">${confidence}% de confiança</span>
                    </div>
                </div>
            </div>
    `;
    
    // Adicionar condições secundárias se existirem
    if (secondaryMatches.length > 0) {
        conditionHTML += `<div class="secondary-conditions">`;
        conditionHTML += `<h5>Outras possibilidades:</h5>`;
        conditionHTML += `<div class="secondary-tags">`;
        
        secondaryMatches.forEach(match => {
            const secConfidence = Math.min(90, Math.round(match.similarity * 100));
            conditionHTML += `
                <span class="secondary-tag">
                    ${match.condition.icon} ${match.condition.name} (${secConfidence}%)
                </span>
            `;
        });
        
        conditionHTML += `</div></div>`;
    }
    
    conditionHTML += `</div>`;
    conditionResult.innerHTML = conditionHTML;
    
    // Configurar recomendações
    const recommendationsCard = document.createElement('div');
    recommendationsCard.id = 'recommendationsCard';
    recommendationsCard.className = 'result-card';
    recommendationsCard.innerHTML = `
        <div class="card-header">
            <i class="fas fa-list-check"></i>
            <h3>Recomendações</h3>
        </div>
        <div class="card-content"><ul id="recommendationsList"></ul></div>
    `;
    const recommendationsList = recommendationsCard.querySelector('#recommendationsList');
    recommendationsList.innerHTML = '';
    condition.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.className = 'recommendation-item';
        li.innerHTML = `<i class="fas fa-check-circle"></i>${rec}`;
        recommendationsList.appendChild(li);
    });
    
    // Adicionar dinamicamente card de aviso à grade
    const warningCard = document.createElement('div');
    warningCard.className = 'result-card warning-card';
    warningCard.innerHTML = `
        <div class="warning-card-content">
            <div class="warning-icon">
                <i class="fas fa-triangle-exclamation"></i>
            </div>
            <div class="warning-content">
                <h4>⚠️ Aviso Importante</h4>
                <p>
                    Este é um sistema de triagem preliminar e <strong>NÃO SUBSTITUI</strong> 
                    a avaliação de um profissional de saúde qualificado. 
                    Os resultados são baseados em algoritmos e devem ser interpretados 
                    apenas como orientação inicial.
                </p>
            </div>
        </div>
    `;

    // Adicionar todos os cards à grade
    resultGrid.append(urgencyLevel, conditionResult, recommendationsCard, warningCard);

    // Mostrar notificação de sucesso
    showNotification('✅ Análise concluída com sucesso!', 'success');
    
    // Rolar para resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Função para retornar à tela de sintomas
function showSymptomsSection() {
    resultsSection.classList.add('hidden');
    symptomsSection.classList.remove('hidden');
    symptomsSection.classList.add('fade-in');
    symptomsInput.value = ''; // Limpar campo de texto
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
}

// Salvar no histórico
function saveToHistory(symptoms, match, name, age) {
    const analysis = {
        timestamp: new Date().toISOString(),
        symptoms: symptoms,
        patientName: name,
        patientAge: age,
        condition: match.condition.name,
        urgency: match.condition.urgency,
        confidence: Math.round(match.similarity * 100)
    };
    
    analysisHistory.unshift(analysis); // Adicionar ao início
    if (analysisHistory.length > 10) {
        analysisHistory.pop(); // Manter apenas os 10 mais recentes
    }
    
    localStorage.setItem('healthGuardianHistory', JSON.stringify(analysisHistory));
    displayHistory();
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

function closeAllModals() {
    emergencyModal.classList.add('hidden');
    registrationModal.classList.add('hidden');
}

// Carregar histórico do localStorage
function loadHistory() {
    const saved = localStorage.getItem('healthGuardianHistory');
    if (saved) {
        analysisHistory = JSON.parse(saved);
    }
    displayHistory();
}

// Exibir histórico na barra lateral
function displayHistory() {
    historyList.innerHTML = ''; // Limpar lista

    if (analysisHistory.length === 0) {
        historyList.innerHTML = '<li class="history-item-none">Nenhuma análise recente.</li>';
        return;
    }

    analysisHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        const urgencyIcon = urgencyConfig[item.urgency]?.icon || '⚪️';
        const date = new Date(item.timestamp);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;

        li.innerHTML = `
            <div class="history-info">
                <span class="history-patient">${item.patientName || 'Paciente'} (${item.patientAge || '?'} anos)</span>
                <span>${urgencyIcon} ${item.condition}</span>
            </div>
            <span class="history-item-date">${formattedDate}</span>
        `;
        historyList.appendChild(li);
    });
}

// Tema (Claro/Escuro)
function setupTheme() {
    const savedTheme = localStorage.getItem('healthGuardianTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('healthGuardianTheme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeSwitcher = document.getElementById('theme-switcher');
    if (theme === 'dark') {
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Inicializar histórico
loadHistory();

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(console.error);
    }
}

console.log("🏥 HealthGuardian AI Premium inicializado!");
