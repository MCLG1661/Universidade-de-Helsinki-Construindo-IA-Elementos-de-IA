# 🧠 HealthGuardian AI — Healthcare AI & NLP Lab

> Laboratório educacional de IA aplicada à saúde, com **Natural Language Processing (NLP)**, classificação lexical e identificação experimental de evidências textuais. Interface PT/EN; motor linguístico em português. Não destinado ao uso clínico.

[![Status](https://img.shields.io/badge/status-MVP-success)]()
[![Version](https://img.shields.io/badge/version-1.1.0--rc-blue)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)]()
[![NLP](https://img.shields.io/badge/NLP-Lexical%20Classification-6d7cff)]()
[![Responsible AI](https://img.shields.io/badge/Responsible%20AI-Educational-b9f227)]()
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black)]()

## 🔗 Demo

**Aplicação publicada (versão original; esta branch contém a candidata v1.1):**

https://universidade-de-helsinki-construind.vercel.app/

---

## 📌 Sobre o projeto

O **HealthGuardian AI** é um laboratório educacional desenvolvido para demonstrar, de forma visual e interativa, como uma entrada em linguagem natural pode ser transformada em dados e submetida a um processo simples de classificação.

A aplicação permite observar etapas como:

```text
Texto
  ↓
Normalização
  ↓
Tokenização
  ↓
Correspondência lexical
  ↓
Pontuação
  ↓
Ranking
  ↓
Resultado explicável
```

O objetivo principal não é construir um sistema médico ou um modelo preditivo de produção.

O projeto utiliza um domínio relacionado a descrições de sintomas como **contexto experimental para estudar processamento de linguagem**, classificação e explicabilidade.

> **Importante:** a aplicação não realiza diagnóstico, triagem clínica, avaliação médica, cálculo de risco ou recomendação de tratamento.

---

## 🎓 Contexto educacional

O projeto foi desenvolvido como aplicação prática e evolução de conceitos estudados nos cursos:

- **Elements of AI**
- **Building AI**

da **University of Helsinki**.

A implementação busca transformar conceitos teóricos relacionados à Inteligência Artificial em uma experiência funcional e observável.

Entre os temas explorados estão:

- representação de informação;
- processamento de linguagem;
- classificação;
- definição de regras;
- interpretação de resultados;
- explicabilidade;
- limitações de sistemas de IA;
- Responsible AI.

Este repositório é um **projeto pessoal de portfólio e aprendizagem**. Não representa produto, pesquisa, parceria ou iniciativa oficial da University of Helsinki.

---

## 🧪 Como funciona

O usuário fornece uma frase, por exemplo:

```text
Estou com tosse, coriza e nariz congestionado.
```

O sistema executa uma sequência de transformações.

### 1. Entrada

A frase original é capturada pela aplicação.

### 2. Normalização

O texto é convertido para uma representação padronizada, reduzindo diferenças que dificultariam a comparação lexical.

Exemplo:

```text
Estou com tosse, coriza e nariz congestionado.
```

torna-se:

```text
estou com tosse coriza e nariz congestionado
```

### 3. Tokenização

O texto normalizado é separado em unidades menores:

```text
estou
com
tosse
coriza
nariz
congestionado
```

### 4. Correspondência lexical

Os tokens são comparados com vocabulários experimentais definidos no dataset.

### 5. Scoring

As correspondências encontradas geram pontuações determinísticas para diferentes categorias.

### 6. Ranking

As categorias são ordenadas de acordo com a similaridade lexical encontrada.

### 7. Explainability

A interface mostra os termos que contribuíram para o resultado, permitindo compreender **por que determinada categoria recebeu maior pontuação**.

---

## 🔍 Explainability

Uma das principais decisões de design do projeto foi evitar uma experiência do tipo:

```text
INPUT → BLACK BOX → RESULT
```

O objetivo é trabalhar com uma estrutura mais transparente:

```text
INPUT
  ↓
TOKENS
  ↓
MATCHES
  ↓
SCORES
  ↓
RANKING
  ↓
EXPLANATION
```

Isso permite visualizar a relação entre determinadas palavras e as categorias do experimento.

Exemplo conceitual:

```text
"tosse"   ─────────► respiratory
"coriza"  ─────────► respiratory
"cansaço" ─────────► energy
```

Essa abordagem torna o comportamento do sistema mais auditável e didático.

---

## 🧠 O que existe — e o que não existe — de IA

A versão atual utiliza um mecanismo de **classificação lexical baseado em regras**.

Portanto, o projeto **não utiliza um modelo de Machine Learning treinado**.

O motor atual pode ser representado como:

```text
data.json
    │
    ▼
JavaScript
    │
    ▼
Normalização
    │
    ▼
Tokenização
    │
    ▼
Lexical Matching
    │
    ▼
Scoring
    │
    ▼
Ranking
    │
    ▼
Explainable UI
```

Essa decisão é deliberada.

O MVP permite compreender primeiro a lógica fundamental de um problema de classificação antes de introduzir modelos estatísticos ou técnicas mais avançadas de NLP.

---

## ⚙️ Arquitetura

A aplicação executa o processamento textual no navegador, sem backend ou banco de dados.

- `core/legacy-engine.mjs`: baseline preservado.
- `core/lexical-engine.mjs`: correspondência de palavras e expressões completas, deduplicação normalizada.
- `core/context.mjs`: heurísticas contextuais experimentais.
- `core/validator.mjs`: relatório independente com evidências, offsets UTF-16 e indicadores objetivos.
- `schemas/evidence-report-v0.2.0.json`: contrato estruturado.
- `core/evaluation.mjs`: métricas de avaliação.
- `script.js`: interface e apresentação dos resultados.

O ranking lexical não incorpora as anotações contextuais; uma ocorrência negada pode aparecer no ranking. O score mede cobertura do vocabulário, não confiança clínica.

## Qualidade e avaliação

| Avaliação sintética | Resultado |
|---|---|
| Precision lexical (baseline → evolução) | 84,62% → 100% |
| F1 lexical | 91,67% → 100% |
| Contexto: desenvolvimento após ajustes | 15/15 |
| Contexto: conjunto separado | 11/16 (68,75%) |

Conjuntos pequenos, elaborados pelo mesmo desenvolvedor, sem validação externa. Os resultados não demonstram eficácia clínica.

91 testes Node e smoke test Chromium (incluindo offline e entrada HTML) aprovados na candidata. Execute `node --test tests/*.test.mjs`. Consulte [evidências e critérios de release](docs/release-candidate-v1.1.md).

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Interface experimental e responsiva |
| JavaScript | Motor de processamento e interação |
| JSON | Dataset e configuração do experimento |
| PWA | Manifest e service worker |
| Vercel | Deploy da aplicação |
| Git/GitHub | Versionamento e documentação |

---

## 🗂️ Estrutura do projeto

```text
.
├── core/
├── schemas/
├── tests/
├── docs/
├── .github/workflows/
├── index.html
├── style.css
├── script.js
├── data.json
├── manifest.json
├── sw.js
├── robots.txt
├── vercel.json
├── README.md
└── .gitignore
```

---

## 💡 Interface experimental

A identidade visual foi construída para representar um **AI/NLP Laboratory**, evitando a aparência tradicional de dashboard corporativo.

A experiência utiliza:

- processing console;
- token stream;
- lexical similarity map;
- processing monitor;
- architecture terminal;
- explainability diagram;
- visualização do pipeline;
- separação explícita entre capacidade e limitação do sistema.

O objetivo é fazer com que a própria interface contribua para a compreensão do funcionamento do algoritmo.

---

## ⚖️ Responsible AI

Como o dataset utiliza termos relacionados à saúde, limitar claramente o escopo da aplicação é requisito de projeto.

### O sistema faz

```text
✓ processa texto
✓ normaliza linguagem
✓ identifica correspondências lexicais
✓ calcula scores determinísticos
✓ ordena categorias
✓ apresenta evidências do resultado
```

### O sistema não faz

```text
✗ diagnóstico médico
✗ triagem clínica
✗ avaliação de risco
✗ recomendação terapêutica
✗ prescrição
✗ substituição de profissionais de saúde
```

Uma correspondência lexical indica somente que determinadas palavras estão relacionadas ao vocabulário configurado para uma categoria.

Ela **não representa probabilidade de doença ou conclusão clínica**.

---

## 🔐 Privacidade

A versão atual funciona no navegador e não possui backend ou banco de dados para persistência das entradas do laboratório.

Use exclusivamente textos sintéticos, sem dados pessoais ou de pacientes. A interface carrega fontes e ícones externos, que podem receber metadados de navegação. Os textos informados são utilizados para executar o experimento durante a interação com a aplicação.

Essa arquitetura reduz deliberadamente a coleta de dados no MVP.

---

## ▶️ Executando localmente

Clone o repositório:

```bash
git clone https://github.com/MCLG1661/Universidade-de-Helsinki-Construindo-IA-Elementos-de-IA.git
```

Entre na pasta:

```bash
cd Universidade-de-Helsinki-Construindo-IA-Elementos-de-IA
```

Como a aplicação carrega o `data.json` via `fetch()`, utilize um servidor HTTP local.

Com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

---

## 📱 Progressive Web App

O projeto possui estrutura básica de PWA:

```text
manifest.json
sw.js
```

O service worker mantém em cache os principais arquivos estáticos da aplicação:

```text
index.html
style.css
script.js
data.json
manifest.json
```

Isso também serve como exercício de arquitetura frontend e funcionamento offline de aplicações web.

---

## 🚧 Limitações atuais

O MVP possui limitações intencionais importantes.

A classificação depende de um vocabulário previamente definido e não compreende linguagem da mesma forma que modelos modernos de NLP.

Entre as limitações estão:

- dependência de palavras previamente configuradas;
- dificuldade com contexto complexo;
- ausência de compreensão semântica profunda;
- ausência de embeddings;
- ausência de modelo treinado;
- ausência de análise contextual avançada;
- dataset experimental limitado.

Essas limitações fazem parte do aprendizado proporcionado pelo projeto.

---

## 🗺️ Roadmap

- v1.0 — laboratório educacional original.
- v1.1 — fundação NLP, confiabilidade e testes (candidata).
- v1.2 — evolução do validador independente e avaliação contextual.
- v2.0 — API e interoperabilidade.
- v2.5 — hipótese de prova de conceito MediFlow, sem integração existente.
- v3.0 — experimentos híbridos com NLP estatístico e semântico.

## 🎯 Objetivo de portfólio

O HealthGuardian AI foi estruturado para demonstrar competências relacionadas a:

**Artificial Intelligence • NLP • Data Processing • Algorithmic Thinking • Explainability • Responsible AI • JavaScript • Product Thinking • Frontend Development • Data Governance**

Mais do que apresentar uma interface, o projeto procura demonstrar a capacidade de transformar um conceito estudado em um **MVP funcional, documentado, explicável e tecnicamente evolutivo**.

---

## 👤 Autor

**Marcus Corrêa Lopes Guedes**

Marketing • Data • Artificial Intelligence • Project Management • Product Thinking

GitHub:  
https://github.com/MCLG1661

---

## 📄 Aviso

Este projeto possui finalidade exclusivamente **educacional e demonstrativa**.

Não deve ser utilizado para diagnóstico, triagem, decisão clínica ou qualquer outra finalidade relacionada à prestação de serviços de saúde.
