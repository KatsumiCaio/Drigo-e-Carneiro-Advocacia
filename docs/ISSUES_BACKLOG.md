# 📋 Catálogo de Tarefas e Backlog de Issues - Drigo & Carneiro

Este documento centraliza as **Issues estruturadas** para o roadmap e manutenção contínua do projeto, categorizadas estritamente como **Correção**, **Melhoria** ou **Nova função**.

---

## 🐛 1. Categoria: Correções (Bugfixes)

### Issue #101: `[CORREÇÃO]` Ajuste de overflow e toque mínimo em controles do mobile
- **Status:** Planejada / Backlog
- **Prioridade:** Média
- **Descrição:** Em viewports ultra-compactos (< 360px de largura), garantir que botões de ação mantenham o touch target mínimo de 44px conforme diretrizes WCAG AA.
- **Arquivos-chave:** `src/components/Header.tsx`, `src/components/FloatingWhatsApp.tsx`
- **Critérios de Aceite:**
  - [ ] Nenhum elemento gera overflow horizontal indesejado.
  - [ ] Touch targets medem >= 44x44px.

### Issue #102: `[CORREÇÃO]` Prevenção de fechamento acidental de formulário com dados preenchidos
- **Status:** Planejada / Backlog
- **Prioridade:** Baixa
- **Descrição:** Adicionar confirmação ao fechar o modal de agendamento caso o usuário já tenha preenchido nome ou telefone, evitando perda do preenchimento.
- **Arquivos-chave:** `src/components/ConsultationModal.tsx`
- **Critérios de Aceite:**
  - [ ] Alerta sutil caso campos tenham sido preenchidos antes do fechamento.

---

## ⚡ 2. Categoria: Melhorias (Enhancements & Performance)

### Issue #201: `[MELHORIA]` Otimização de Performance e Pré-carregamento de Fontes Cinzel e Serif
- **Status:** Em Andamento
- **Prioridade:** Alta
- **Descrição:** Adicionar `rel="preconnect"` e `font-display: swap` para as fontes Cinzel e Plus Jakarta Sans no `index.html` para reduzir o First Contentful Paint (FCP).
- **Arquivos-chave:** `index.html`, `lighthouserc.json`
- **Critérios de Aceite:**
  - [ ] FCP < 1.4s no teste de Lighthouse.
  - [ ] Zero FOIT (Flash of Invisible Text) no carregamento inicial.

### Issue #202: `[MELHORIA]` Refinamento de acessibilidade com tags ARIA em seções colapsáveis (FAQ)
- **Status:** Concluída (v1.0)
- **Prioridade:** Média
- **Descrição:** Enriquecer o componente `FaqSection` com `aria-expanded`, `aria-controls` e navegação via teclado e animação suave com `AnimatePresence`.
- **Arquivos-chave:** `src/components/FaqSection.tsx`
- **Critérios de Aceite:**
  - [x] Expansão fluida com transição de altura sem cortes bruscos.
  - [x] Rotação suave de 180 graus no ícone chevron indicador.

### Issue #203: `[MELHORIA]` Expansão da cobertura de testes de integração da Calculadora de Triagem
- **Status:** Concluída (v1.0)
- **Prioridade:** Alta
- **Descrição:** Garantir suíte de testes com cobertura de 100% dos ramos de decisão da triagem jurídica interativa.
- **Arquivos-chave:** `src/__tests__/triageCalculator.test.ts`, `src/components/TriageCalculator.tsx`
- **Critérios de Aceite:**
  - [x] Todas as 5 áreas de atuação possuem validação de cálculo e direcionamento ao WhatsApp.

### Issue #204: `[MELHORIA]` Refinamento de Micro-interações e Princípios de Motion (Kyle Zantos / Design Principles)
- **Status:** Concluída (v1.0)
- **Prioridade:** Alta
- **Descrição:** Eliminar qualquer sensação de interface brusca, travada ou genérica através de curvas de aceleração de alta precisão (`[0.16, 1, 0.3, 1]`), skeletons com shimmer, micro-interações táteis `whileTap`/`whileHover`, transições de modais via `AnimatePresence` e interstitial de diagnóstico prévio.
- **Arquivos-chave:** `src/components/Hero.tsx`, `src/components/PracticeAreasBento.tsx`, `src/components/TriageCalculator.tsx`, `src/components/FaqSection.tsx`, `src/components/ConsultationModal.tsx`, `src/components/LegalTermsModal.tsx`, `src/components/Skeleton.tsx`, `src/components/FloatingWhatsApp.tsx`
- **Critérios de Aceite:**
  - [x] Lazy loading e skeletons luxuosos para carregamento de cartões e blocos pesados.
  - [x] Transições consistentes com easing suave em todos os modais, acordeons e etapas do wizard.
  - [x] Feedback visual refinado em todas as ações de clique e seleção.

---

## ✨ 3. Categoria: Novas Funções (Features)

### Issue #301: `[NOVA FUNÇÃO]` Calculadora de Prazos Processuais e Prescrição Trabalhista
- **Status:** Planejada / Roadmap
- **Prioridade:** Média
- **Descrição:** Módulo interativo auxiliar que permite ao trabalhador informar a data da demissão e verificar instantaneamente o prazo bienal (2 anos) e quinquenal (5 anos) para propositura da ação.
- **Arquivos-chave:** `src/components/LaborPrescriptionCalculator.tsx`, `src/data/legalData.ts`
- **Critérios de Aceite:**
  - [ ] Cálculo matemático preciso com base no Art. 7º, XXIX da Constituição Federal.
  - [ ] Redirecionamento direto com resumo para o WhatsApp do escritório.

### Issue #302: `[NOVA FUNÇÃO]` Integração direta de agendamento com Google Calendar / Calendly
- **Status:** Planejada / Roadmap
- **Prioridade:** Média
- **Descrição:** Permitir a escolha de horário diretamente no modal de consulta para reuniões virtuais (Google Meet) ou presenciais na Avenida Paulista.
- **Arquivos-chave:** `src/components/ConsultationModal.tsx`, `src/lib/calendar.ts`
- **Critérios de Aceite:**
  - [ ] Sincronização segura de horários disponíveis dos sócios fundadores.
  - [ ] Confirmação automática via e-mail e WhatsApp.

### Issue #303: `[NOVA FUNÇÃO]` Central de Artigos e Pareceres Jurídicos Educativos
- **Status:** Planejada / Roadmap
- **Prioridade:** Baixa
- **Descrição:** Feed de artigos institucionais e análises de jurisprudências recentes dos tribunais (STF, TST, STJ) para autoridade técnica de SEO e conformidade OAB.
- **Arquivos-chave:** `src/components/ArticlesSection.tsx`, `src/data/articlesData.ts`
- **Critérios de Aceite:**
  - [ ] Renderização em Markdown segura via `react-markdown`.
  - [ ] Metadados de SEO (OpenGraph / Schema.org) para indexação no Google.

---

## 🔄 Fluxo de Trabalho e Regras de Pull Request

Ao trabalhar em qualquer uma das issues acima:

1. **Branch Nomeada com o Padrão:**
   - Correções: `fix/issue-101-mobile-overflow`
   - Melhorias: `perf/issue-201-font-preconnect` ou `refactor/issue-204-motion-principles`
   - Novas Funções: `feat/issue-301-prescription-calculator`
2. **Abrir Pull Request** utilizando o template de `.github/pull_request_template.md`.
3. **Executar a Esteira de Qualidade (Quality Gate):**
   ```bash
   npm run lint  # Verificação de tipos TypeScript (tsc --noEmit)
   npm run test  # Suíte de testes unitários e de integração (vitest run)
   npm run build # Compilação de produção (vite build)
   ```
4. **Registrar a validação e riscos** no corpo do Pull Request antes de mesclar na `main`.
