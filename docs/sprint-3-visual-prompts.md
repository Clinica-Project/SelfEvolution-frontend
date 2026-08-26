# Sprint 3 — Prompts Kimi K3 · Melhoria Visual do Dashboard

> **Destino:** Kimi K3 (cole um prompt por vez, na ordem)  
> **Projeto:** SelfEvolution MVP 1.0 — frontend  
> **Stack:** Next.js 15 · React 19 · Tailwind · TypeScript · Framer Motion  
> **Pré-requisito:** Sprint 3 integração já implementada (consultas, pacientes, evolução, dashboard)  
> **Referências visuais:** `components/home/*`, `components/auth/LoginForm.tsx`, `components/institucional/*`, `tailwind.config.js`

---

## Ordem de execução

| # | Prompt | Entrega |
|---|--------|---------|
| V0 | Design system dashboard | Componentes compartilhados extraídos |
| V1 | Shell + PageHeader | Sidebar, header, toolbar |
| V2 | Dashboard | Métricas, welcome, atalhos |
| V3 | Consultas (3 telas) | Listagem, agendar, detalhe |
| V4 | Pacientes (3 telas) | Listagem, cadastro, detalhe |
| V5 | Evolução clínica | Form + contexto |
| V6 | Polish + placeholders | ComingSoon, a11y, mobile |

> **Regra:** NÃO alterar integração API, hooks ou regras de negócio — apenas UI/UX e componentização.  
> **Validação:** `npm run lint` deve passar. Evitar `npm run build` com `npm run dev` rodando ao mesmo tempo.

---

## Prompt V0 — Design system do dashboard (componentes compartilhados)

```text
Extraia e crie o design system compartilhado do dashboard SelfEvolution (Next.js 15, TypeScript, Tailwind).

CONTEXTO:
- Rotas Sprint 3 já funcionam com API real: /dashboard, /consultas, /consultas/nova, /consultas/[id], /pacientes, /pacientes/novo, /pacientes/[id], /pacientes/[id]/evolucao
- Hoje há MUITA duplicação: banners, breadcrumbs, status badges, skeletons, empty states copiados em 3–4 arquivos
- Home/login usam Reveal, shadow-lift, ease-expo — dashboard ainda não
- Tokens em tailwind.config.js: brand.primary #6B4E91, brand.secondary #6297F5, surface.background #FDFBF2, border #E8E4DA

CRIAR em components/dashboard/ e components/ui/:

1. AlertBanner.tsx — variantes: success | error | warning | info
   - border-l-4, ícone Lucide, role="alert" ou role="status"
   - Substituir banners inline em: consultas/page, consultas/[id], EvolucaoForm, novo paciente

2. Breadcrumb.tsx — items: { label, href? }[]
   - ChevronRight entre itens; último item sem link
   - Substituir breadcrumbs copiados em pacientes/novo, pacientes/[id], consultas/[id]

3. EmptyState.tsx — props: icon, title, description, action?: { label, href }
4. ErrorState.tsx — props: title, message, onRetry?, backHref?
5. PermissionState.tsx — props: title, description, backHref (403)

6. StatusBadge.tsx + lib/constants/consulta-status.ts
   - Centralizar STATUS_LABELS e STATUS_BADGES (AGENDADA=info, REALIZADA=success, CANCELADA=default)
   - Remover duplicatas em consultas/page, consultas/[id], pacientes/[id]

7. SelectField.tsx e TextareaField.tsx em components/ui/
   - Mesmo estilo visual do Input.tsx existente (border #E8E4DA, focus ring roxo)
   - Usar nos forms e filtros

8. TableSkeleton.tsx e PageSkeleton.tsx
9. ConfirmDialog.tsx em components/ui/ — extrair de consultas/[id]/page.tsx
10. DefinitionGrid.tsx + DefinitionItem.tsx — substituir ResumoItem/DadoItem
11. ActionLink.tsx — link "Ver" padronizado (Eye icon)
12. FormActions.tsx — Cancelar (ghost) + Submit (primary) alinhados à direita

REFATORAR (substituir inline pelos novos componentes, sem mudar comportamento):
- app/(dashboard)/consultas/page.tsx
- app/(dashboard)/consultas/[id]/page.tsx
- app/(dashboard)/pacientes/page.tsx
- app/(dashboard)/pacientes/novo/page.tsx
- app/(dashboard)/pacientes/[id]/page.tsx
- components/forms/AppointmentForm.tsx (parcial: SelectField, AlertBanner)
- components/forms/EvolucaoForm.tsx (parcial: AlertBanner, TextareaField)

NÃO mudar lógica de API, hooks ou permissões. Lint deve passar com zero warnings.
```

---

## Prompt V1 — Shell do dashboard + PageHeader

```text
Melhore o visual do shell do dashboard SelfEvolution (Sidebar, Header, PageHeader) mantendo funcionalidade intacta.

PRÉ-REQUISITO: Prompt V0 concluído (componentes dashboard/ existem).

ARQUIVOS:
- components/layout/DashboardShell.tsx
- components/layout/Sidebar.tsx
- components/layout/DashboardHeader.tsx
- components/layout/PageHeader.tsx (ou novo DashboardPageHeader.tsx)

MELHORIAS SIDEBAR:
- Item ativo: bg-brand-primary + texto inverse (já existe) + barra lateral esquerda 3px brand-primary
- Hover: transition-colors duration-200 ease-expo
- Badge Admin: manter variant="admin"
- useMounted já existe — não quebrar

MELHORIAS HEADER:
- Aplicar shadow-header (token tailwind)
- Exibir role com ROLE_LABELS (já existe)
- Botão Sair: hover suave
- Opcional: círculo com inicial do nome (primeira letra do role label)

MELHORIAS SHELL / MAIN:
- Fundo creme com gradiente sutil no topo: bg-gradient-to-b from-brand-secondary/5 to-transparent (apenas na área main, não na sidebar)
- Manter px-page py-6 lg:px-8

MELHORIAS PAGEHEADER:
- Suportar props opcionais: eyebrow?: string, actions?: ReactNode
- Título: font-display text-3xl (manter)
- Eyebrow: text-xs uppercase tracking-wide text-brand-primary
- Envolver em Reveal leve (components/motion/Reveal.tsx) — respeitar useReducedMotion

NÃO usar useRouter no header (logout já usa window.location.href).
NÃO quebrar AuthGuard (children sempre renderizados).
Lint deve passar.
```

---

## Prompt V2 — Dashboard visual (`/dashboard`)

```text
Melhore o visual da página /dashboard SelfEvolution com dados reais da API (já integrada).

PRÉ-REQUISITO: V0 (MetricCard extraído) e V1 (PageHeader com eyebrow).

ARQUIVO: app/(dashboard)/dashboard/page.tsx

MÉTRICAS (4 cards):
- Usar MetricCard compartilhado de components/dashboard/
- Ícone em círculo: bg-brand-primary/10, text-brand-primary (ou secondary/success por card)
- Valor: font-display text-3xl font-bold
- Hover: transition-shadow hover:shadow-lift (sutil)
- Skeleton: animate-pulse refinado

BOAS-VINDAS POR ROLE (card inferior):
- Borda border-brand-secondary/20, fundo bg-brand-secondary/5
- Ícone Lucide por role: Shield (ADMIN), Stethoscope (PSICOLOGO), Heart (PACIENTE)
- Usar mark-accent (globals.css) em UMA palavra do título
- Copy já existe em WELCOME_BY_ROLE — não alterar textos

ATALHOS (Ações rápidas):
- Transformar links em mini-cards: Card hoverable com ícone + label
- Hover: -translate-y-0.5 + shadow-lift + ease-expo (como ServicesSection da home)
- 3 atalhos: Agendar consulta, Novo paciente, Ver consultas

ANIMAÇÃO:
- RevealGroup nas métricas (stagger 0.08)
- Não animar durante loading (skeleton)

Manter useConsultas e usePacientes — não mockar.
Erro API: linha discreta abaixo do grid (já existe).
Lint deve passar.
```

---

## Prompt V3 — Consultas visual (3 telas)

```text
Melhore o visual das 3 telas de consultas no SelfEvolution sem alterar integração API.

PRÉ-REQUISITO: V0 + V1.

### /consultas — app/(dashboard)/consultas/page.tsx

- PageToolbar: PageHeader eyebrow="Agenda" + botão "Agendar consulta" + filtros
- Filtros em Card compacto (status select + datas) — usar SelectField
- Tabela desktop: hover linha, StatusBadge centralizado
- Mobile: cards com sombra sm, badge no canto
- Banner ?created=1 via AlertBanner success
- EmptyState / ErrorState / TableSkeleton dos componentes compartilhados
- Reveal na tabela após loading (não no skeleton)

### /consultas/nova — components/forms/AppointmentForm.tsx + page

- Layout desktop lg: grid 2 colunas — form | bloco "Horários de atendimento" sticky top-6
- Campos readonly (paciente/psicólogo logado): bg-surface-muted/40 + ícone Lock
- Serviço selecionado: hint com duração e preço formatado BRL
- FormActions no rodapé do Card
- Manter regras: PACIENTE só vê a si; PSICOLOGO travado; ADMIN select paciente

### /consultas/[id] — app/(dashboard)/consultas/[id]/page.tsx

- Breadcrumb via componente compartilhado
- Header: título + StatusBadge grande ao lado
- Card Resumo: DefinitionGrid com ícones Lucide por campo (User, UserCog, Calendar, Clock, FileText)
- Seção Editar: colapsável (details/summary ou useState) — fechada por padrão se status !== AGENDADA
- Ações: agrupar botões — primário "Marcar realizada", link evolução, danger "Excluir"
- ConfirmDialog compartilhado

NÃO alterar hooks useConsulta nem lib/api/consultas.ts.
Lint deve passar.
```

---

## Prompt V4 — Pacientes visual (3 telas)

```text
Melhore o visual das 3 telas de pacientes no SelfEvolution sem alterar integração API.

PRÉ-REQUISITO: V0 + V1 + padrões de V3 (tabela, toolbar).

### /pacientes — app/(dashboard)/pacientes/page.tsx

- Mesmo padrão visual de /consultas: PageToolbar, DataTable, EmptyState, ErrorState
- CPF: formatCpf (lib/utils/cpf.ts) com tracking-wide ou font-mono text-sm
- Card "Listagem indisponível" quando GET /pacientes falha: usar EmptyState variant warning

### /pacientes/novo — app/(dashboard)/pacientes/novo/page.tsx

- Breadcrumb compartilhado
- Card max-w-xl centralizado
- Seção visual "Dados de acesso" (text-sm font-semibold text-content-secondary mb-4)
- AlertBanner para erros do POST
- FormActions: Cancelar + Cadastrar paciente

### /pacientes/[id] — app/(dashboard)/pacientes/[id]/page.tsx

- Hero compacto: nome font-display text-3xl + CTA "Agendar consulta"
- 3 seções em Cards separados com CardTitle + ícone:
  1. Dados cadastrais (DefinitionGrid)
  2. Consultas (lista → mini-cards com data, psicólogo, StatusBadge, ActionLink)
  3. Histórico clínico (timeline: linha vertical border-l-2 border-brand-primary/30, cada item com data + badge humor)

- PACIENTE: seção consultas com link para /consultas (já existe)
- ADMIN/PSICOLOGO: histórico clínico com timeline

NÃO alterar hooks usePaciente/usePacientes.
Lint deve passar.
```

---

## Prompt V5 — Evolução clínica visual

```text
Melhore o visual da tela de evolução clínica SelfEvolution.

PRÉ-REQUISITO: V0 (AlertBanner, TextareaField, PermissionState).

ARQUIVOS:
- components/forms/EvolucaoForm.tsx
- app/(dashboard)/pacientes/[id]/evolucao/page.tsx (só se precisar ajustar wrapper)

MELHORIAS:

1. Card de contexto no topo (antes do form):
   - Paciente, data da consulta formatada, badge "Consulta realizada" (success) ou warning se não REALIZADA
   - Fundo surface-muted/40, ícone NotebookPen

2. Formulário:
   - Label principal: "Como foi a sessão?" (mapeia para descricao)
   - Textarea 8 rows, placeholder acolhedor
   - Humor: input com sugestões em hint ("Estável, ansioso, animado…")
   - Observações: TextareaField optional

3. Modo edição:
   - Badge "Editando registro" + texto pequeno com criadoEm/atualizadoEm se evolucao existir

4. Estados:
   - PermissionState para PACIENTE e 403
   - AlertBanner warning quando consulta não REALIZADA
   - PageSkeleton durante loading

5. Botões: FormActions — Voltar → /consultas/[consultaId], Salvar primário

NÃO alterar useEvolucao nem lib/api/evolucoes.ts.
Lint deve passar.
```

---

## Prompt V6 — Polish final + placeholders

```text
Polish final visual do dashboard SelfEvolution e alinhar placeholders.

ARQUIVOS:
- app/(dashboard)/documentos/page.tsx
- app/(dashboard)/ia/page.tsx
- app/(dashboard)/usuarios/page.tsx
- app/layout.tsx (metadata template se necessário)
- Revisão mobile em todas as rotas Sprint 3

PLACEHOLDERS:
- Substituir ComingSoon por EmptyState consistente:
  - Ícone por módulo: FileText (documentos), Sparkles (ia), Users (usuarios)
  - Título: "Em desenvolvimento"
  - Descrição específica por módulo (1 frase)
  - Sem card tracejado "Sprint 1"
- /usuarios: mencionar "Cadastro de psicólogos em breve" na descrição

METADATA:
- app/(dashboard)/layout.tsx ou páginas individuais: export const metadata com title
- Template: "Consultas — SelfEvolution" etc.

A11Y PASS:
- Verificar focus-visible em todos os botões e links novos
- aria-live nos AlertBanners
- Contraste badges status (WCAG AA)
- prefers-reduced-motion: Reveal já respeita — confirmar em novos hovers

MOBILE (375px):
- Tabelas viram cards (já existe — garantir padding consistente)
- FormActions empilham full-width no mobile
- Filtros consultas: grid 1 coluna

NÃO adicionar dark mode. NÃO mudar API.
Lint deve passar.
```

---

## Checklist pós-sprint visual

- [ ] Zero banners/breadcrumbs/status duplicados inline
- [ ] Home e dashboard parecem o mesmo produto (paleta, fontes, sombras)
- [ ] `npm run lint` passa
- [ ] Testado em mobile 375px
- [ ] `prefers-reduced-motion` ok

---

## Dicas para o Kimi K3

1. **Um prompt por vez** — espere lint passar antes do próximo
2. **Não rodar build com dev ativo** — corrompe `.next`
3. **Ler antes de editar:** `components/ui/Button.tsx`, `Card.tsx`, `Input.tsx`, `Badge.tsx`, `components/motion/Reveal.tsx`
4. **Não instalar** shadcn/MUI — usar o que já existe no projeto
