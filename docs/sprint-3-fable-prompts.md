# Sprint 3 — Prompts Fable 5 · Integração Frontend

> **Destino:** Fable 5 (cole um prompt por vez, na ordem)  
> **Projeto:** SelfEvolution MVP 1.0  
> **Stack:** Next.js 15 · React 19 · Tailwind · TypeScript · Axios  
> **API:** `http://localhost:8080` — ver [`api-guia-frontend.md`](./api-guia-frontend.md)  
> **Plano completo:** [`sprint-3-integracao-frontend.md`](./sprint-3-integracao-frontend.md)  
> **Continuidade visual:** [`home-spec-fable.md`](./home-spec-fable.md) · [`login-spec-fable.md`](./login-spec-fable.md)

---

## Ordem de execução

| # | Prompt | Entrega |
|---|--------|---------|
| 0 | Infra API + Auth | Axios, JWT, guards, login real |
| 1 | Listagem consultas | `/consultas` |
| 2 | Agendar consulta | `/consultas/nova` |
| 3 | Detalhe consulta | `/consultas/[id]` |
| 4 | Evolução clínica | `/pacientes/[id]/evolucao` |
| 5 | Pacientes mínimo | `/pacientes`, `/novo`, `/[id]` |
| 6 | Dashboard real | Métricas da API |

> **Pré-requisito backend (fora do Fable):** implementar `GET /pacientes` antes do Prompt 2, se ainda não existir.

---

## Prompt 0 — Infraestrutura API + Autenticação

```text
Implemente a camada de integração com o Core API no frontend SelfEvolution (Next.js 15 App Router, TypeScript, Axios).

CONTEXTO:
- Backend em http://localhost:8080
- Login: POST /auth/login → { token, type: "Bearer", role: "PACIENTE"|"ADMIN"|"PSICOLOGO" }
- Erro login 400 retorna TEXTO PLANO "Email ou senha invalidos" (não JSON)
- Token JWT expira em ~2h; enviar Authorization: Bearer {token} em rotas autenticadas
- Erros API JSON: { status, erro, mensagem, path, timestamp }

CRIAR:
1. .env.local → NEXT_PUBLIC_API_URL=http://localhost:8080
2. lib/api/client.ts — Axios instance + interceptor request (Bearer) + interceptor 401 → removeToken + redirect /login?expired=1
3. lib/api/errors.ts — parseApiError (JSON ou texto plano)
4. lib/auth/token.ts — getToken/setToken/removeToken localStorage chave "se_token"
5. lib/auth/context.tsx — AuthProvider { token, role, login, logout, isAuthenticated }
6. lib/auth/permissions.ts — mapa rotas por role (ADMIN, PSICOLOGO, PACIENTE)
7. lib/auth/AuthGuard.tsx — redirect /login se não autenticado
8. lib/api/auth.ts — login(email, senha)
9. types/auth.ts, types/api.ts

INTEGRAR:
- components/auth/LoginForm.tsx — substituir stub timeout por login real; redirect /dashboard
- app/(dashboard)/layout.tsx — AuthProvider + AuthGuard
- components/layout/DashboardHeader.tsx — role real + logout (removeToken → /)
- components/layout/Sidebar.tsx — ocultar /usuarios para PSICOLOGO

DESIGN (continuidade home/login):
- Paleta: creme #FDFBF2, roxo #6B4E91, azul #6297F5
- Nunito + Inter; cards brancos, bordas #E8E4DA
- Banner sessão expirada no login quando ?expired=1

CORS: se necessário, adicionar rewrites em next.config.js proxy /api → localhost:8080

NÃO implementar telas de consultas ainda. Lint e build devem passar.
```

---

## Prompt 1 — Listagem de Consultas

```text
Implemente a página /consultas no dashboard SelfEvolution com integração real ao Core API.

CONTEXTO VISUAL:
- Layout dashboard existente: Sidebar + DashboardHeader + fundo creme #FDFBF2
- Componentes: PageHeader, Card, Button, Badge, Input (já no projeto)
- Tom clínico acolhedor, desktop-first, legível (WCAG AA)
- Animações sutis com Reveal (Framer Motion) se já usado no projeto

API:
- GET /consultas → ConsultaResponse[]
- Comportamento por role (automático no backend):
  - PACIENTE: só consultas dele
  - PSICOLOGO: só consultas dele
  - ADMIN: todas (pode filtrar ?pacienteId=&psicologoId=)

ConsultaResponse:
{ id, pacienteId, pacienteNome, psicologoId, psicologoNome, servicoId, servicoNome, dataHoraInicio, dataHoraFim, status, observacoes }

Status enum REAL (usar exatamente):
"AGENDADA" | "REALIZADA" | "CANCELADA"

CRIAR:
- types/consulta.ts
- lib/api/consultas.ts — listarConsultas, buscarConsulta, criarConsulta, atualizarConsulta, cancelarOuExcluirConsulta
- hooks/useConsultas.ts — loading, error, refresh, data
- app/(dashboard)/consultas/page.tsx — substituir ComingSoon

UI DA LISTAGEM:
- Título "Consultas" + botão primário "Agendar consulta" → /consultas/nova
- Tabela ou cards responsivos: Paciente, Psicólogo, Data, Hora, Status, Ações
- Badges de status com cores (Agendada=info, Realizada=success, Cancelada=muted)
- Filtros client-side: status + intervalo de datas (opcional)
- Ação "Ver" → /consultas/[id]
- Empty state: "Nenhuma consulta agendada" + CTA agendar
- Loading skeleton + mensagem de erro da API (campo mensagem)

PERMISSÕES UI:
- Todos autenticados veem a listagem (escopo filtrado pelo backend)
- Botão evolução NÃO aparece aqui (só no detalhe)

Substituir placeholder ComingSoon. Usar lib/api/client.ts existente. Não mockar dados.
```

---

## Prompt 2 — Agendar Consulta

```text
Implemente /consultas/nova — formulário de agendamento integrado ao Core API SelfEvolution.

API DEPENDÊNCIAS:
- GET /psicologos → select psicólogo
- GET /psicologos/{id}/servicos → select serviço (carregar ao escolher psicólogo)
- GET /psicologos/{id}/horarios → exibir disponibilidade (dia MONDAY..SUNDAY, inicio/fim)
- GET /pacientes → select paciente (ADMIN/PSICOLOGO) — se endpoint não existir, documentar e usar input UUID temporário
- POST /consultas → criar

Body POST /consultas:
{ pacienteId, psicologoId, servicoId?, dataHoraInicio, dataHoraFim, observacoes? }

Regras backend (exibir mensagem amigável no 400):
- Paciente logado só pode pacienteId = próprio id
- Psicólogo logado só psicologoId = próprio id
- Horário dentro da disponibilidade do psicólogo
- Sem conflito com outra consulta não cancelada
- Não agendar no passado
- Status inicial AGENDADA

CRIAR:
- lib/api/psicologos.ts — listar, listarServicos, listarHorarios
- lib/api/pacientes.ts — listar, buscar (se GET /pacientes existir)
- types/psicologo.ts, types/paciente.ts
- hooks/usePsicologos, usePacientes
- components/forms/AppointmentForm.tsx
- app/(dashboard)/consultas/nova/page.tsx

UI DO FORMULÁRIO:
- PageHeader "Agendar consulta"
- Campos: Paciente (select), Psicólogo (select), Serviço (select opcional), Data/hora início, Data/hora fim, Observações
- Ao selecionar psicólogo: carregar serviços + mostrar bloco "Horários de atendimento" (lista dos GET horarios)
- Dica UX: se serviço tem duracao (minutos), sugerir dataHoraFim automático
- Botões: "Agendar" (primary) + "Cancelar" → /consultas
- Estados: loading no submit, erro inline com mensagem da API, disabled durante envio
- Validação client: fim > início, campos obrigatórios

DESIGN:
- Card branco rounded-lg, labels Inter, inputs border #E8E4DA, focus ring roxo
- Mobile: campos empilhados full-width

Sucesso: redirect /consultas com feedback (toast ou query ?created=1).
Integração real — sem mock.
```

---

## Prompt 3 — Detalhe e Edição de Consulta

```text
Implemente /consultas/[id] — detalhe, edição e ações de consulta no SelfEvolution.

API:
- GET /consultas/{id}
- PUT /consultas/{id}
- DELETE /consultas/{id}

PUT body (campos opcionais):
{ servicoId?, dataHoraInicio?, dataHoraFim?, status?, observacoes? }

Comportamento por role:
- PACIENTE: PUT só { status: "CANCELADA" }; DELETE → 200 + body (soft cancel)
- PSICOLOGO/ADMIN: PUT completo; DELETE → 204 (hard delete)

Status: AGENDADA | REALIZADA | CANCELADA

CRIAR:
- hooks/useConsulta(id)
- app/(dashboard)/consultas/[id]/page.tsx

UI DETALHE:
- Breadcrumb: Consultas → Detalhe
- Card resumo: paciente, psicólogo, serviço, data/hora, status badge, observações
- Seção ações conforme role e status

AÇÕES PSICOLOGO/ADMIN:
- Editar datas/serviço/observações (form ou inline)
- Botão "Marcar como realizada" → PUT status REALIZADA (desabilitado se já REALIZADA ou CANCELADA)
- Botão "Registrar evolução" → /pacientes/{pacienteId}/evolucao?consultaId={id}
  - Só visível se status === REALIZADA e role ADMIN ou PSICOLOGO
- Botão "Excluir consulta" → DELETE, confirm dialog, tratar 204

AÇÕES PACIENTE:
- Botão "Cancelar consulta" → DELETE ou PUT CANCELADA
- Tratar resposta 200 com ConsultaResponse atualizado
- Bloquear se já REALIZADA ou CANCELADA

ERROS:
- 403: "Sem permissão"
- 400: exibir mensagem (ex.: não cancelar consulta realizada)

DESIGN: consistente com listagem; PageHeader + Cards; confirmação modal para ações destrutivas.
Integração real via lib/api/consultas.ts.
```

---

## Prompt 4 — Evolução Clínica

```text
Implemente /pacientes/[id]/evolucao — registro de evolução clínica pós-consulta no SelfEvolution.

ROTA: app/(dashboard)/pacientes/[id]/evolucao/page.tsx
Query param obrigatório: ?consultaId=uuid

API (somente ADMIN e PSICOLOGO — paciente recebe 403):
- GET /consultas/{consultaId} — validar status === REALIZADA
- GET /consultas/{consultaId}/evolucao — se 404, modo criar; se 200, modo editar
- POST /consultas/{consultaId}/evolucao — criar
- PUT /consultas/{consultaId}/evolucao — atualizar

Body create/update:
{ descricao (obrigatório), humor?, observacoes? }

Response:
{ id, consultaId, descricao, humor, observacoes, criadoEm, atualizadoEm }

Regras:
- Consulta deve estar REALIZADA
- Apenas 1 evolução por consulta (segundo POST retorna erro → UI deve ir para edição)
- PSICOLOGO só evolui consultas dele

CRIAR:
- types/evolucao.ts
- lib/api/evolucoes.ts
- hooks/useEvolucao(consultaId)
- components/forms/EvolucaoForm.tsx
- app/(dashboard)/pacientes/[id]/evolucao/page.tsx

UI:
- PageHeader "Evolução clínica"
- Subtítulo com nome do paciente (GET /pacientes/{id}) e data da consulta
- Campos:
  - "Evolução clínica" → descricao (textarea, obrigatório)
  - "Humor" → humor (input opcional)
  - "Observações" → observacoes (textarea opcional)
- Se consulta não REALIZADA: banner aviso + form desabilitado
- Botões: Salvar (primary), Voltar → /consultas/[consultaId]
- Loading + erro 403 amigável

GUARD UI:
- Não renderizar link/botão de evolução para PACIENTE em nenhuma tela
- AuthGuard já protege dashboard; checar role no componente

DESIGN: tom clínico acolhedor; card branco; sem jargão excessivo; PT-BR.
Integração real — sem mock.
```

---

## Prompt 5 — Pacientes Mínimo (dependência do fluxo)

```text
Implemente as páginas mínimas de pacientes no SelfEvolution para suportar o fluxo de consultas e evolução.

API:
- POST /pacientes (público) — cadastro
- GET /pacientes (listagem) — ADMIN/PSICOLOGO [requer endpoint no backend]
- GET /pacientes/{id}
- PUT /pacientes/{id}
- GET /pacientes/{id}/evolucoes — histórico (ADMIN/PSICOLOGO)
- GET /consultas?pacienteId={id} — consultas do paciente (ADMIN)

CRIAR/SUBSTITUIR:
- lib/api/pacientes.ts completo
- hooks/usePacientes, usePaciente(id)
- app/(dashboard)/pacientes/page.tsx — listagem (substituir ComingSoon)
- app/(dashboard)/pacientes/novo/page.tsx — form cadastro
- app/(dashboard)/pacientes/[id]/page.tsx — detalhe

UI LISTAGEM /pacientes:
- Tabela: Nome, E-mail, CPF, Ações
- Botão "Novo paciente" → /pacientes/novo
- Ação "Ver" → /pacientes/[id]
- Empty state + loading + erro API

UI NOVO /pacientes/novo:
- Campos: nome, email, cpf, senha
- POST /pacientes → redirect /pacientes ou /pacientes/[id]
- Erros: CPF inválido, duplicado (mensagem da API)

UI DETALHE /pacientes/[id]:
- Dados cadastrais (GET)
- Seção "Consultas" — GET /consultas?pacienteId= (ADMIN) ou link para /consultas
- Seção "Histórico clínico" — GET /pacientes/{id}/evolucoes (ADMIN/PSICOLOGO)
- Botão "Agendar consulta" → /consultas/nova?pacienteId={id} (pré-selecionar no form se possível)
- Link evolução só via consulta realizada (não direto da listagem)

DESIGN: consistente dashboard; Badge, Card, Button, Input existentes; CPF formatado na exibição.
Integração real.
```

---

## Prompt 6 — Dashboard com Dados Reais

```text
Atualize /dashboard no SelfEvolution substituindo métricas mock por dados reais do Core API.

API:
- GET /consultas → contar consultas (filtrar mês atual client-side)
- GET /pacientes → contar pacientes (se endpoint existir)
- Role do usuário logado (AuthContext)

ALTERAR app/(dashboard)/dashboard/page.tsx:
- Remover arrays hardcoded de métricas
- Cards de métricas com loading skeleton:
  - "Consultas do mês" (contagem de GET /consultas filtradas por dataHoraInicio)
  - "Total de pacientes" (GET /pacientes.length ou "—" se endpoint indisponível)
  - "Consultas agendadas" (status AGENDADA)
  - "Consultas realizadas" (status REALIZADA)
- Atalhos funcionais (links reais):
  - "Agendar consulta" → /consultas/nova
  - "Novo paciente" → /pacientes/novo
  - "Ver consultas" → /consultas
- Remover texto "Sprint 1 placeholder"
- Card boas-vindas personalizado por role (Administrador / Psicólogo / Paciente)

DESIGN:
- Manter grid de cards existente
- Ícones Lucide, cores brand (roxo, azul, teal)
- Reveal animation opcional

Tratar erro API sem quebrar página (mostrar "—" ou mensagem leve).
AuthGuard já protege rota.
```

---

## Prompt 7 (opcional) — Backend GET /pacientes

```text
Implemente no backend Spring Boot SelfEvolution-backend-core o endpoint de listagem de pacientes.

CRIAR:
GET /pacientes → List<PacienteResponse> status 200

Autorização:
- Requer autenticação JWT
- Permitir roles ADMIN e PSICOLOGO (bloquear PACIENTE com 403 se desejado)

PacienteResponse existente:
{ id, nome, email, cpf }

Implementar em PacienteController + PacienteService (método listarTodos ou similar).
Seguir padrão dos outros controllers do projeto.
Não expor senha.
Adicionar teste básico se houver suite de integração.

Motivo: frontend precisa popular select de paciente em /consultas/nova e listagem /pacientes.
```

---

## Checklist pós-sprint (validação manual)

Cole após executar todos os prompts:

```text
Teste E2E SelfEvolution Sprint 3:

1. POST /pacientes → login PACIENTE → GET /psicologos → POST /consultas → GET /consultas
2. Login PSICOLOGO → GET /consultas → PUT REALIZADA → POST /consultas/{id}/evolucao
3. Login ADMIN → GET /consultas (todas) → GET /pacientes/{id}/evolucoes
4. PACIENTE cancela consulta → DELETE retorna 200 + status CANCELADA
5. PSICOLOGO exclui consulta → DELETE retorna 204
6. Token expirado → 401 → redirect /login?expired=1
7. npm run lint && npm run build OK
```

---

## Referências rápidas para colar nos prompts

**Paleta:** `#FDFBF2` fundo · `#6B4E91` primary · `#6297F5` secondary · `#E8E4DA` border · `#333333` texto

**Status consulta:** `AGENDADA` | `REALIZADA` | `CANCELADA`

**Roles:** `PACIENTE` | `PSICOLOGO` | `ADMIN`

**Token storage:** `localStorage` chave `se_token`

**Guia API completo:** docs/api-guia-frontend.md

---

*Prompts gerados a partir do plano Sprint 3 — Integração Frontend.*
