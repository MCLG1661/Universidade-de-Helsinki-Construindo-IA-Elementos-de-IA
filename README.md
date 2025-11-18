![HealthGuardian AI](https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80)

# HealthGuardian AI - Sistema de Triagem Médica
“Building AI course project”

[![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)](https://streamlit.io/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)

## 🎯 Resumo

O HealthGuardian AI é um sistema inteligente de triagem médica que utiliza aprendizado de máquina para analisar sintomas de pacientes e fornecer avaliações médicas preliminares. O sistema processa descrições em linguagem natural dos sintomas, classifica possíveis condições, determina níveis de urgência e oferece recomendações iniciais. Desenvolvido com Python e Streamlit, demonstra aplicações práticas de NLP e algoritmos de classificação em tecnologia da saúde.

## 🏥 Contexto e Definição do Problema

Este projeto aborda o problema de acessibilidade à saúde e superlotação de pronto-socorros, fornecendo uma ferramenta de avaliação inicial de sintomas. Muitas pessoas buscam atendimento de emergência para condições não urgentes devido à falta de orientação preliminar. Minha motivação vem da observação dos desafios de saúde em comunidades carentes e do potencial da IA para preencher lacunas de acessibilidade.

## 💡 Como é Utilizado?

Os usuários interagem com o sistema através de uma interface web onde descrevem seus sintomas em linguagem natural. A IA processa o texto, analisa padrões de sintomas e retorna:
- Possíveis condições médicas
- Nível de urgência (baixo/médio/alto)
- Recomendações preliminares
- Orientação sobre quando procurar atendimento médico

O sistema é projetado para avaliação inicial antes de consultar profissionais de saúde.

## 📊 Fontes de Dados e Métodos de IA

**Fontes de Dados:**
- Dados sintéticos de sintomas médicos
- Conjuntos de dados de saúde pública
- Padrões da literatura médica

**Métodos de IA:**
- Processamento de Linguagem Natural (NLP)
- Vetorização TF-IDF
- Classificação Random Forest
- Modelos de predição multi-classe

## ⚠️ Importante

Este projeto não:
- Substitui diagnóstico médico profissional
- Lida com situações de emergência
- Processa imagens médicas ou resultados laboratoriais
- Fornece prescrições de tratamento

Limitações incluem tamanho do conjunto de dados, restrições de idioma e a necessidade de validação clínica.

## 🚀 Próximos Passos

Áreas de crescimento potencial:
- Integração com prontuários eletrônicos
- Suporte a múltiplos idiomas
- Desenvolvimento de aplicativo móvel
- Validação em ensaios clínicos
- Módulos especializados para condições crônicas

## 🙏 Agradecimentos

- Comunidades Scikit-learn e Streamlit
- Provedores de conjuntos de dados médicos
- Bibliotecas de IA de código aberto

## 📁 Estrutura do Projeto
healthguardian-ai/
│
├── app.py
├── requirements.txt
├── data/
│ └── symptom_conditions.csv
├── models/
│ └── triage_model.pkl
└── README.md

text

## ⚠️ Aviso Importante

Este projeto é desenvolvido **apenas para fins educacionais**. O sistema não é certificado para uso médico e não deve substituir a consulta com profissionais de saúde. Sempre busque orientação de profissionais médicos qualificados para decisões relacionadas à saúde.

## 📬 Contato

Projeto desenvolvido por Marcus  
📧 Email: mclguedes@gmail.com  
📱 LinkedIn: https://www.linkedin.com/in/marcusguedes
