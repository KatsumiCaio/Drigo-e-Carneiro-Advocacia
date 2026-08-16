# Diretrizes de Engenharia e Padrão de Trabalho - Drigo & Carneiro Advocacia

Este documento estabelece as regras mandatórias de desenvolvimento, governança de código, rastreabilidade e fluxo de trabalho com Git / GitHub para qualquer agente ou desenvolvedor que atue neste repositório.

---

## 1. Fluxo de Trabalho com Issues e Pull Requests

Todo trabalho no repositório **DEVE** ser precedido ou vinculado a uma Issue rastreável e entregue através de Pull Requests estruturados.

### Classificação Obrigatória de Issues
Toda Issue deve ser categorizada estritamente em uma das 3 classificações:
1. **🐛 Correção (Bugfix)**: Correção de falhas, erros de renderização, regressões visuais, links quebrados ou bugs funcionais.
2. **⚡ Melhoria (Improvement / Enhancement)**: Otimização de performance, refinamento de acessibilidade/responsividade, refatoração arquitetural, aumento de cobertura de testes ou melhoria de UX/UI existente sem alterar o escopo principal.
3. **✨ Nova função (Feature)**: Novas funcionalidades, novos módulos interativos, novas integrações de API ou novas seções de negócio.

---

## 2. Padrão Obrigatório de Pull Request (PR)

Antes de integrar qualquer código na branch principal (`main`), todo Pull Request **DEVE** preencher o seguinte template:

```markdown
## 📌 Issue Relacionada
- Closes #<NUMERO_DA_ISSUE> ou Refs #<NUMERO_DA_ISSUE>
- Tipo: [ ] Correção | [ ] Melhoria | [ ] Nova função

## 📝 O que mudou?
- Descrição concisa e objetiva das alterações técnicas e de interface realizadas.

## 🧪 Como foi validado?
- [ ] Testes unitários e de integração (`npm run test`)
- [ ] Verificação estrita de tipagem e lint (`npm run lint`)
- [ ] Teste de compilação de produção (`npm run build`)
- [ ] Testes end-to-end / visual preview

## ⚠️ Riscos e Limitações
- Impactos potenciais, dependências externas ou restrições conhecidas da mudança.

## 🚀 Próximos Passos
- Tarefas de acompanhamento, próximos módulos ou refinamentos planejados.
```

---

## 3. Esteira de Qualidade Obrigatória (Quality Gate)

Nenhum código pode ser integrado sem passar com **100% de sucesso** nas seguintes etapas:
- **Lint & Tipos:** `npm run lint` (`tsc --noEmit`)
- **Suíte de Testes:** `npm run test` (`vitest run`)
- **Compilação de Produção:** `npm run build` (`vite build`)
- **Observabilidade:** Garantir que novos fluxos usem `telemetry.addBreadcrumb()` ou `telemetry.captureException()` quando cabível.
- **Segurança:** Utilizar `RateLimiter`, `sanitizeInput()` e validação de URLs externas (`isSafeExternalUrl`) para novos inputs de formulários ou chamadas externas.

---

## 4. Princípios de Arquitetura e Engenharia Limpa
- **Evitar Overengineering:** Construa exatamente o escopo demandado com alta elegância e estabilidade.
- **Componentização:** Modularize novos componentes em `/src/components` e lógica auxiliar em `/src/lib`.
- **DRY sem abstração prematura:** Reutilize componentes visuais já existentes (`LogoMonogram`, `ConsultationModal`, `LegalTermsModal`, `CookieBanner`) em vez de recriá-los.
- **Conformidade OAB e LGPD:** Qualquer alteração no conteúdo jurídico ou coleta de dados deve respeitar a LGPD (Lei 13.709/2018) e o Provimento CFOAB 205/2021.
