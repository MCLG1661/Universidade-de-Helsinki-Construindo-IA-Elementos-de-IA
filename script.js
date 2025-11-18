// Base de dados de sintomas e condições
const medicalDatabase = {
    conditions: [
        {
            name: "gripe",
            symptoms: ["febre", "dor cabeça", "coriza", "dor corpo", "calafrios"],
            urgency: "low",
            description: "Infecção viral respiratória comum"
        },
        {
            name: "influenza",
            symptoms: ["febre alta", "calafrios", "dor corpo", "fadiga", "tosse"],
            urgency: "medium",
            description: "Infecção viral mais severa"
        },
        {
            name: "emergência cardíaca",
            symptoms: ["dor peito", "falta ar", "suor frio", "náusea", "dor braço"],
            urgency: "high",
            description: "Condição cardíaca potencialmente grave"
        },
        {
            name: "gastroenterite",
            symptoms: ["dor abdominal", "náusea", "vômito", "diarreia", "febre"],
            urgency: "medium",
            description: "Inflamação do sistema digestivo"
        },
        {
            name: "covid-19 suspeita",
            symptoms: ["febre", "tosse seca", "falta ar", "perda paladar", "fadiga"],
            urgency: "high",
            description: "Suspeita de infecção por COVID-19"
        },
        {
            name: "cefaléia",
            symptoms: ["dor cabeça", "enjoo", "sensibilidade luz", "tontura"],
            urgency: "low",
            description: "Dor de cabeça comum"
        },
        {
            name: "dengue suspeita",
            symptoms: ["febre alta", "manchas pele", "dor corpo", "dor olhos", "náusea"],
            urgency: "high",
            description: "Suspeita de infecção por dengue"
        },
        {
            name: "amigdalite",
            symptoms: ["dor garganta", "febre", "dificuldade engolir", "tosse"],
            urgency: "medium",
            description: "Inflamação das amígdalas"
        },
        {
            name: "problema pressão arterial",
            symptoms: ["tontura", "visão turva", "náusea", "dor cabeça"],
            urgency: "high",
            description: "Possível alteração na pressão arterial"
        },
        {
            name: "otite",
            symptoms: ["dor ouvido", "febre", "coceira ouvido", "diminuição audição"],
            urgency: "medium",
            description: "Infecção no ouvido"
        }
    ]
};

// Configurações de urgência
const urgencyConfig = {
    low: {
        emoji: "🟢",
        level: "BAIXA",
        description: "Consulta em 48-72h",
        color: "#27ae60"
    },
    medium: {
        emoji: "🟡",
        level: "MÉDIA",
        description: "Consulta em 24-48h",
        color: "#f39c12"
    },
    high: {
        emoji: "🔴",
        level: "ALTA",
        description: "Procurar atendimento imediato",
        color: "#e74c3c"
    }
};

// Elementos DOM
const symptomsInput = document.getElementById('symptomsInput');
const analyzeButton = document.getElementById('analyzeButton');
const resultsSection = document.getElementById('resultsSection');
const urgencyLevel = document.getElementById('urgencyLevel');
const conditionResult = document.getElementById('conditionResult');

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
    inputWords.forEach(word => {
        if (conditionWords.some(conditionWord => 
            conditionWord.includes(word) || word.includes(conditionWord))) {
            matches++;
        }
    });
    
    return matches / Math.max(inputWords.length, conditionWords.length);
}

// Função principal de análise
function analyzeSymptoms() {
    const symptomsText = symptomsInput.value.trim();
    
    if (!symptomsText) {
        alert('❌ Por favor, descreva seus sintomas para análise.');
        return;
    }
    
    // Pré-processar entrada
    const processedInput = preprocessText(symptomsText);
    
    // Encontrar condição mais similar
    let bestMatch = null;
    let highestSimilarity = 0;
    
    medicalDatabase.conditions.forEach(condition => {
        const similarity = calculateSimilarity(processedInput, condition.symptoms);
        
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = condition;
        }
    });
    
    // Exibir resultados
    displayResults(bestMatch, highestSimilarity);
}

// Função para exibir resultados
function displayResults(condition, similarity) {
    // Mostrar seção de resultados
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('fade-in');
    
    // Configurar urgência
    const urgency = urgencyConfig[condition.urgency];
    urgencyLevel.innerHTML = `
        <div class="urgency-level">${urgency.emoji} NÍVEL DE URGÊNCIA: ${urgency.level}</div>
        <div class="urgency-description">${urgency.description}</div>
    `;
    
    // Configurar condição
    const confidence = Math.min(100, Math.round(similarity * 100));
    conditionResult.innerHTML = `
        <div class="condition-name">🩺 POSSÍVEIS CONDIÇÕES: ${condition.name.toUpperCase()}</div>
        <div class="condition-description">
            ${condition.description}<br>
            <small>Confiança da análise: ${confidence}%</small>
        </div>
    `;
    
    // Rolar para resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
analyzeButton.addEventListener('click', analyzeSymptoms);

symptomsInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        analyzeSymptoms();
    }
});

// Efeito de digitação no placeholder
let placeholderIndex = 0;
const placeholders = [
    "Exemplo: febre, dor de cabeça, coriza...",
    "Exemplo: náusea, vômito, dor abdominal...",
    "Exemplo: tosse, falta de ar, febre...",
    "Exemplo: tontura, visão turva, dor cabeça..."
];

function rotatePlaceholder() {
    symptomsInput.placeholder = placeholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
}

// Rotação automática do placeholder
setInterval(rotatePlaceholder, 3000);

// Inicialização
console.log("🏥 HealthGuardian AI inicializado!");