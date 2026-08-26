# SelfEvolution — Guia de API para o Frontend

> Documento de referência para integração do frontend com o backend **SelfEvolution-backend-core**.  
> Descreve rotas, autenticação, papéis de usuário, corpos de requisição/resposta e regras de negócio.

---

## 1. Informações gerais

| Item | Valor |
|------|-------|
| **Base URL (dev)** | `http://localhost:8080` |
| **Formato** | JSON (`Content-Type: application/json`) |
| **Autenticação** | JWT Bearer Token (stateless) |
| **IDs** | UUID v4 (string no JSON) |
| **Datas/horas** | ISO-8601 — ex.: `"2026-08-15T14:30:00"` |
| **Horários (time)** | ISO-8601 — ex.: `"08:00:00"`, `"18:30:00"` |
| **Dias da semana** | Enum Java `DayOfWeek` — ex.: `"MONDAY"`, `"TUESDAY"` … `"SUNDAY"` |

### Headers padrão

```http
Content-Type: application/json
Authorization: Bearer {token}   ← obrigatório em rotas autenticadas
```

> **CORS:** o backend **não** possui configuração CORS explícita no código atual. Em desenvolvimento local, pode ser necessário proxy no frontend (Vite/Next) ou configurar CORS no backend.

---

## 2. Autenticação

### 2.1 Login

**Rota pública** — não exige token.

```
POST /auth/login
```

**Body:**

```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

**Sucesso — `200 OK`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "role": "PACIENTE"
}
```

**Valores possíveis de `role`:**

| Role | Quem é |
|------|--------|
| `PACIENTE` | Paciente comum (cadastro via `POST /pacientes`) |
| `ADMIN` | Administrador (registrado na tabela de pacientes com role ADMIN) |
| `PSICOLOGO` | Psicólogo (cadastrado por ADMIN) |

**Erro — `400 Bad Request`:**

Retorna **texto plano** (não JSON estruturado):

```
Email ou senha invalidos
```

### 2.2 Uso do token

1. Salvar `token` e `role` após login.
2. Enviar em **todas** as demais rotas (exceto login e cadastro de paciente):

```http
Authorization: Bearer {token}
```

3. Token expira em **2 horas** (UTC-3).
4. Token inválido/ausente em rota protegida → `401 Unauthorized` (Spring Security).

### 2.3 Cadastro de paciente (sem login prévio)

```
POST /pacientes
```

Rota **pública** — permite auto-cadastro. Após criar, o usuário faz login normalmente.

---

## 3. Papéis e matriz de permissões

### Resumo por perfil

| Recurso | Público | PACIENTE | PSICOLOGO | ADMIN |
|---------|:-------:|:--------:|:---------:|:-----:|
| `POST /auth/login` | ✅ | — | — | — |
| `POST /pacientes` (criar) | ✅ | — | — | — |
| Pacientes (demais rotas) | ❌ | ✅* | ✅* | ✅* |
| `POST /psicologos` | ❌ | ❌ | ❌ | ✅ |
| `DELETE /psicologos/{id}` | ❌ | ❌ | ❌ | ✅ |
| Psicólogos (demais rotas) | ❌ | ✅ leitura | ✅ leitura + editar próprio | ✅ total |
| Serviços do psicólogo | ❌ | ✅ leitura | ✅ CRUD do **próprio** | ✅ CRUD de qualquer |
| Horários do psicólogo | ❌ | ✅ leitura | ✅ CRUD do **próprio** | ✅ CRUD de qualquer |
| Consultas | ❌ | ✅ próprias | ✅ próprias | ✅ todas |
| Evolução clínica | ❌ | ❌ | ✅ | ✅ |

\* Rotas de paciente exigem autenticação, mas **não** há filtro por "só o próprio paciente" no backend — trate isso no frontend se necessário.

### Regras importantes de negócio

- **ADMIN** é um `PacienteModel` com `role = ADMIN` (não é psicólogo).
- **Psicólogo** só gerencia serviços/horários/perfil **do próprio `id`** (ADMIN gerencia qualquer psicólogo).
- **Paciente** só cria consulta **para si** (`pacienteId` = id do logado).
- **Psicólogo** só cria consulta **para si** (`psicologoId` = id do logado).
- **Paciente cancela** consulta via `DELETE /consultas/{id}` (vira status `CANCELADA`, não apaga).
- **Psicólogo/ADMIN** deletam consulta de fato via `DELETE /consultas/{id}` → `204 No Content`.
- **Evolução clínica** só para consultas com status `REALIZADA`.

---

## 4. Formato de erros

A maioria dos erros segue este JSON (`ApiErrorResponse`):

```json
{
  "status": 400,
  "erro": "Bad Request",
  "mensagem": "Insira um CPF valido",
  "path": "/pacientes",
  "timestamp": "2026-08-15T17:00:00.123Z"
}
```

| HTTP | Quando |
|------|--------|
| `400` | Validação / regra de negócio (`IllegalArgumentException`) |
| `401` | Token ausente ou inválido |
| `403` | Sem permissão (`AccessDeniedException`) |
| `404` | Recurso não encontrado |
| `500` | Erro interno (mensagem genérica) |

**Exceção:** `POST /auth/login` com credenciais inválidas retorna `400` com **string pura**, não o objeto acima.

---

## 5. Enums e tipos compartilhados

### StatusConsulta

```json
"AGENDADA" | "REALIZADA" | "CANCELADA"
```

- Nova consulta sempre inicia como `AGENDADA`.
- Paciente só pode alterar status para `CANCELADA`.

### DayOfWeek (horários de atendimento)

```json
"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
```

### CPF

- Validado no backend (dígitos verificadores).
- Aceita com ou sem máscara; internamente remove caracteres não numéricos.
- Deve ter 11 dígitos e não pode ser sequência repetida (ex.: `11111111111`).

---

## 6. Rotas — Autenticação

### `POST /auth/login`

| | |
|---|---|
| **Auth** | Não |
| **Body** | `{ email, senha }` |
| **200** | `{ token, type, role }` |
| **400** | `"Email ou senha invalidos"` (texto) |

---

## 7. Rotas — Pacientes

Base: `/pacientes`

### `POST /pacientes` — Criar paciente

| | |
|---|---|
| **Auth** | Não (público) |
| **Body** | Ver abaixo |
| **201** | `PacienteResponse` |
| **400** | CPF inválido, email/CPF duplicado |

**Request:**

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cpf": "529.982.247-25",
  "senha": "minhasenha"
}
```

**Response (`PacienteResponse`):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cpf": "52998224725"
}
```

> Senha **nunca** é retornada nas respostas.

---

### `GET /pacientes/{id}` — Buscar por ID

| | |
|---|---|
| **Auth** | Sim |
| **200** | `PacienteResponse` |
| **404** | Paciente não encontrado |

---

### `PUT /pacientes/{id}` — Atualizar

| | |
|---|---|
| **Auth** | Sim |
| **Body** | `{ nome, email, cpf }` — todos opcionais na prática (envie os campos a alterar) |
| **200** | `PacienteResponse` |
| **404** | Paciente não encontrado |

---

### `DELETE /pacientes/{id}` — Excluir

| | |
|---|---|
| **Auth** | Sim |
| **204** | Sem corpo |
| **404** | Paciente não encontrado |

---

## 8. Rotas — Psicólogos

Base: `/psicologos`

### `POST /psicologos` — Criar psicólogo

| | |
|---|---|
| **Auth** | Sim — **somente ADMIN** |
| **201** | `PsychologistResponse` |

**Request:**

```json
{
  "nome": "Dr. João Psicólogo",
  "email": "joao@clinica.com",
  "cpf": "12345678909",
  "senha": "senhaSegura",
  "registro_profissional": "CRP-06/12345",
  "tipo_registro_profissional": 1,
  "especialidade": "Terapia Cognitivo-Comportamental"
}
```

**Response (`PsychologistResponse`):**

```json
{
  "id": "uuid",
  "nome": "Dr. João Psicólogo",
  "email": "joao@clinica.com",
  "cpf": "12345678909",
  "registro_profissional": "CRP-06/12345",
  "tipo_registro_profissional": 1,
  "especialidade": "Terapia Cognitivo-Comportamental"
}
```

---

### `GET /psicologos` — Listar todos

| | |
|---|---|
| **Auth** | Sim |
| **200** | `PsychologistResponse[]` |

Útil para paciente escolher psicólogo ao agendar consulta.

---

### `GET /psicologos/{id}` — Buscar por ID

| | |
|---|---|
| **Auth** | Sim |
| **200** | `PsychologistResponse` |
| **404** | Psicólogo não encontrado |

---

### `GET /psicologos/email/{email}` — Buscar por e-mail

| | |
|---|---|
| **Auth** | Sim |
| **Path** | `email` = endereço completo (ex.: `joao@clinica.com`) |
| **200** | `PsychologistResponse` |

---

### `GET /psicologos/cpf/{cpf}` — Buscar por CPF

| | |
|---|---|
| **Auth** | Sim |
| **200** | `PsychologistResponse` |

---

### `PUT /psicologos/{id}` — Atualizar

| | |
|---|---|
| **Auth** | ADMIN ou **próprio psicólogo** |
| **Body** | Campos parciais permitidos |

**Request:**

```json
{
  "nome": "Dr. João Atualizado",
  "email": "joao.novo@clinica.com",
  "cpf": "12345678909",
  "especialidade": "Psicanálise",
  "registro_profissional": "CRP-06/99999",
  "tipo_registro_profissional": 1
}
```

> `tipo_registro_profissional` só é atualizado se enviado **diferente de 0**.

---

### `DELETE /psicologos/{id}` — Excluir

| | |
|---|---|
| **Auth** | **Somente ADMIN** |
| **204** | Sem corpo |

---

## 9. Rotas — Serviços do psicólogo

Base: `/psicologos/{psicologoId}/servicos`

Serviços são consultas/atendimentos oferecidos (ex.: "Sessão individual 50min").

### `POST /psicologos/{psicologoId}/servicos` — Criar

| | |
|---|---|
| **Auth** | ADMIN ou psicólogo dono do `psicologoId` |
| **201** | `ServiceResponse` |

**Request:**

```json
{
  "nome": "Sessão Individual",
  "descricao": "Atendimento psicológico individual",
  "preco": 150.00,
  "duracao": 50
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `nome` | string | Nome do serviço (único por psicólogo) |
| `descricao` | string | Descrição livre |
| `preco` | number | Valor decimal (BigDecimal) |
| `duracao` | integer | Duração em **minutos** |

**Response:**

```json
{
  "id": "uuid",
  "nome": "Sessão Individual",
  "descricao": "Atendimento psicológico individual",
  "preco": 150.00,
  "duracao": 50
}
```

---

### `GET /psicologos/{psicologoId}/servicos` — Listar

| | |
|---|---|
| **Auth** | Sim (qualquer autenticado) |
| **200** | `ServiceResponse[]` |

---

### `GET /psicologos/{psicologoId}/servicos/{servicoId}` — Buscar um

| | |
|---|---|
| **Auth** | Sim |
| **200** | `ServiceResponse` |
| **404** | Serviço não encontrado |

---

### `PUT /psicologos/{psicologoId}/servicos/{servicoId}` — Atualizar

| | |
|---|---|
| **Auth** | ADMIN ou psicólogo dono |
| **Body** | `{ nome?, descricao?, preco?, duracao? }` |
| **200** | `ServiceResponse` |

---

### `DELETE /psicologos/{psicologoId}/servicos/{servicoId}` — Excluir

| | |
|---|---|
| **Auth** | ADMIN ou psicólogo dono |
| **204** | Sem corpo |

---

## 10. Rotas — Horários de atendimento

Base: `/psicologos/{psicologoId}/horarios`

Define **quando** o psicólogo atende. Obrigatório ter horários cadastrados para **agendar consultas**.

> Horários são identificados por **índice** (0-based) na lista retornada pelo GET — não possuem UUID próprio.

### `POST /psicologos/{psicologoId}/horarios` — Adicionar

| | |
|---|---|
| **Auth** | ADMIN ou psicólogo dono |
| **201** | `HorarioAtendimentoResponse` |

**Request:**

```json
{
  "dia": "MONDAY",
  "inicio": "08:00:00",
  "fim": "12:00:00"
}
```

**Response:**

```json
{
  "dia": "MONDAY",
  "inicio": "08:00:00",
  "fim": "12:00:00"
}
```

**Validações:**
- `inicio` deve ser **anterior** a `fim`
- Não permite horário duplicado (mesmo dia + início + fim)

---

### `GET /psicologos/{psicologoId}/horarios` — Listar

| | |
|---|---|
| **Auth** | Sim |
| **200** | `HorarioAtendimentoResponse[]` |

**Exemplo:**

```json
[
  { "dia": "MONDAY", "inicio": "08:00:00", "fim": "12:00:00" },
  { "dia": "MONDAY", "inicio": "14:00:00", "fim": "18:00:00" },
  { "dia": "WEDNESDAY", "inicio": "09:00:00", "fim": "17:00:00" }
]
```

Use o **índice do array** (`0`, `1`, `2`…) nas rotas PUT/DELETE.

---

### `PUT /psicologos/{psicologoId}/horarios/{indice}` — Atualizar

| | |
|---|---|
| **Auth** | ADMIN ou psicólogo dono |
| **Path** | `indice` = número inteiro (0-based) |
| **Body** | `{ dia, inicio, fim }` |
| **200** | `HorarioAtendimentoResponse` |

---

### `DELETE /psicologos/{psicologoId}/horarios/{indice}` — Remover

| | |
|---|---|
| **Auth** | ADMIN ou psicólogo dono |
| **204** | Sem corpo |

---

## 11. Rotas — Consultas

Base: `/consultas`

### `POST /consultas` — Agendar consulta

| | |
|---|---|
| **Auth** | Sim |
| **201** | `ConsultaResponse` |

**Request:**

```json
{
  "pacienteId": "uuid-do-paciente",
  "psicologoId": "uuid-do-psicologo",
  "servicoId": "uuid-do-servico",
  "dataHoraInicio": "2026-08-20T09:00:00",
  "dataHoraFim": "2026-08-20T09:50:00",
  "observacoes": "Primeira consulta"
}
```

| Campo | Obrigatório | Notas |
|-------|:-----------:|-------|
| `pacienteId` | ✅ | Paciente logado só pode usar **próprio id** |
| `psicologoId` | ✅ | Psicólogo logado só pode usar **próprio id** |
| `servicoId` | ❌ | Se informado, deve pertencer ao psicólogo |
| `dataHoraInicio` | ✅ | Não pode ser no passado |
| `dataHoraFim` | ✅ | Deve ser **posterior** ao início |
| `observacoes` | ❌ | Texto livre |

**Validações automáticas:**
- Consulta deve começar e terminar no **mesmo dia**
- Horário deve estar **dentro** da disponibilidade do psicólogo
- Psicólogo precisa ter **horários cadastrados**
- Não pode haver **conflito** com outra consulta não cancelada
- Status inicial: `AGENDADA`

**Response (`ConsultaResponse`):**

```json
{
  "id": "uuid",
  "pacienteId": "uuid",
  "pacienteNome": "Maria Silva",
  "psicologoId": "uuid",
  "psicologoNome": "Dr. João",
  "servicoId": "uuid",
  "servicoNome": "Sessão Individual",
  "dataHoraInicio": "2026-08-20T09:00:00",
  "dataHoraFim": "2026-08-20T09:50:00",
  "status": "AGENDADA",
  "observacoes": "Primeira consulta"
}
```

`servicoId` e `servicoNome` podem ser `null` se consulta sem serviço.

---

### `GET /consultas` — Listar

| | |
|---|---|
| **Auth** | Sim |
| **Query params** | `pacienteId?`, `psicologoId?` |
| **200** | `ConsultaResponse[]` |

**Comportamento por role:**

| Role | Comportamento |
|------|---------------|
| `PACIENTE` | Ignora params — retorna **apenas consultas do paciente logado** |
| `PSICOLOGO` | Ignora params — retorna **apenas consultas do psicólogo logado** |
| `ADMIN` | Sem params → **todas** as consultas; com params → filtra |

**Exemplos:**

```
GET /consultas                          → lista conforme role
GET /consultas?pacienteId={uuid}        → ADMIN: filtra por paciente
GET /consultas?psicologoId={uuid}       → ADMIN: filtra por psicólogo
GET /consultas?pacienteId=x&psicologoId=y → ADMIN: interseção
```

---

### `GET /consultas/{id}` — Buscar uma

| | |
|---|---|
| **Auth** | Sim — paciente/psicólogo só vê consultas **próprias**; ADMIN vê todas |
| **200** | `ConsultaResponse` |
| **403** | Acesso negado |
| **404** | Não encontrada |

---

### `PUT /consultas/{id}` — Atualizar

| | |
|---|---|
| **Auth** | Sim |
| **Body** | Ver abaixo |
| **200** | `ConsultaResponse` |

**Request (campos opcionais):**

```json
{
  "servicoId": "uuid",
  "dataHoraInicio": "2026-08-20T10:00:00",
  "dataHoraFim": "2026-08-20T10:50:00",
  "status": "REALIZADA",
  "observacoes": "Consulta realizada com sucesso"
}
```

**Por role:**

| Role | O que pode fazer |
|------|------------------|
| `PACIENTE` | **Apenas** `{ "status": "CANCELADA" }` — nenhum outro campo |
| `PSICOLOGO` | Alterar datas, serviço, status, observações |
| `ADMIN` | Idem psicólogo |

**Regras de cancelamento:**
- Não cancelar consulta já `CANCELADA` ou `REALIZADA`
- Ao cancelar, validações de horário/conflito são **ignoradas**

---

### `DELETE /consultas/{id}` — Cancelar ou excluir

| | |
|---|---|
| **Auth** | Sim |

**Comportamento duplo:**

| Role | Resultado |
|------|-----------|
| `PACIENTE` | **Cancela** (soft) → `200 OK` + `ConsultaResponse` com `status: "CANCELADA"` |
| `PSICOLOGO` / `ADMIN` | **Exclui** do banco → `204 No Content` |

Equivalente paciente cancelar via PUT com `{ "status": "CANCELADA" }`.

---

## 12. Rotas — Evolução clínica

Registro clínico pós-consulta. **Apenas ADMIN e PSICOLOGO.**

### Por consulta — `/consultas/{consultaId}/evolucao`

#### `POST /consultas/{consultaId}/evolucao` — Criar

| | |
|---|---|
| **Auth** | ADMIN ou PSICOLOGO (psicólogo da consulta) |
| **201** | `EvolucaoClinicaResponse` |

**Request:**

```json
{
  "descricao": "Paciente apresentou melhora significativa na ansiedade.",
  "humor": "Estável",
  "observacoes": "Manter acompanhamento semanal"
}
```

| Campo | Obrigatório |
|-------|:-----------:|
| `descricao` | ✅ |
| `humor` | ❌ |
| `observacoes` | ❌ |

**Pré-condições:**
- Consulta deve existir e estar com status `REALIZADA`
- Só **uma** evolução por consulta

**Response:**

```json
{
  "id": "uuid",
  "consultaId": "uuid",
  "descricao": "Paciente apresentou melhora...",
  "humor": "Estável",
  "observacoes": "Manter acompanhamento semanal",
  "criadoEm": "2026-08-20T10:50:00",
  "atualizadoEm": null
}
```

---

#### `GET /consultas/{consultaId}/evolucao` — Buscar evolução da consulta

| | |
|---|---|
| **Auth** | ADMIN ou PSICOLOGO da consulta |
| **200** | `EvolucaoClinicaResponse` |
| **404** | Evolução não encontrada |

---

#### `PUT /consultas/{consultaId}/evolucao` — Atualizar

| | |
|---|---|
| **Auth** | ADMIN ou PSICOLOGO da consulta |
| **Body** | `{ descricao?, humor?, observacoes? }` |
| **200** | `EvolucaoClinicaResponse` (com `atualizadoEm` preenchido) |

---

#### `DELETE /consultas/{consultaId}/evolucao` — Excluir

| | |
|---|---|
| **Auth** | ADMIN ou PSICOLOGO da consulta |
| **204** | Sem corpo |

---

### Histórico por paciente — `/pacientes/{pacienteId}/evolucoes`

#### `GET /pacientes/{pacienteId}/evolucoes` — Listar histórico

| | |
|---|---|
| **Auth** | ADMIN ou PSICOLOGO |
| **200** | `EvolucaoClinicaResponse[]` (ordenado por `criadoEm` desc) |

| Role | Escopo |
|------|--------|
| `ADMIN` | Todas evoluções do paciente |
| `PSICOLOGO` | Apenas evoluções de consultas **desse psicólogo** com o paciente |

---

## 13. Fluxos recomendados para o frontend

### 13.1 Cadastro e login de paciente

```
1. POST /pacientes          → criar conta
2. POST /auth/login         → obter token + role "PACIENTE"
3. Guardar token (localStorage/sessionStorage/cookie seguro)
```

### 13.2 Paciente agenda consulta

```
1. GET /psicologos                              → listar psicólogos
2. GET /psicologos/{id}/servicos                → serviços disponíveis
3. GET /psicologos/{id}/horarios                → disponibilidade (montar calendário)
4. POST /consultas                              → agendar (pacienteId = id logado)
5. GET /consultas                               → ver minhas consultas
```

### 13.3 Paciente cancela consulta

```
DELETE /consultas/{id}
   ou
PUT /consultas/{id}  { "status": "CANCELADA" }
```

### 13.4 Psicólogo configura agenda

```
1. POST /auth/login
2. PUT /psicologos/{meuId}                      → atualizar perfil
3. POST /psicologos/{meuId}/horarios            → cadastrar horários
4. POST /psicologos/{meuId}/servicos            → cadastrar serviços
5. GET /consultas                               → ver consultas agendadas
6. PUT /consultas/{id} { "status": "REALIZADA" } → marcar como realizada
7. POST /consultas/{id}/evolucao                → registrar evolução clínica
```

### 13.5 Admin gerencia psicólogos

```
1. POST /auth/login (role ADMIN)
2. POST /psicologos                             → criar psicólogo
3. GET /consultas                               → visão geral
4. GET /pacientes/{id}/evolucoes                → histórico clínico (se necessário)
```

---

## 14. Referência rápida — todas as rotas

| Método | Rota | Auth | Descrição |
|--------|------|:----:|-----------|
| POST | `/auth/login` | ❌ | Login |
| POST | `/pacientes` | ❌ | Criar paciente |
| GET | `/pacientes/{id}` | ✅ | Buscar paciente |
| PUT | `/pacientes/{id}` | ✅ | Atualizar paciente |
| DELETE | `/pacientes/{id}` | ✅ | Excluir paciente |
| POST | `/psicologos` | ADMIN | Criar psicólogo |
| GET | `/psicologos` | ✅ | Listar psicólogos |
| GET | `/psicologos/{id}` | ✅ | Buscar psicólogo |
| GET | `/psicologos/email/{email}` | ✅ | Buscar por email |
| GET | `/psicologos/cpf/{cpf}` | ✅ | Buscar por CPF |
| PUT | `/psicologos/{id}` | ✅* | Atualizar psicólogo |
| DELETE | `/psicologos/{id}` | ADMIN | Excluir psicólogo |
| POST | `/psicologos/{id}/servicos` | ✅* | Criar serviço |
| GET | `/psicologos/{id}/servicos` | ✅ | Listar serviços |
| GET | `/psicologos/{id}/servicos/{servicoId}` | ✅ | Buscar serviço |
| PUT | `/psicologos/{id}/servicos/{servicoId}` | ✅* | Atualizar serviço |
| DELETE | `/psicologos/{id}/servicos/{servicoId}` | ✅* | Excluir serviço |
| POST | `/psicologos/{id}/horarios` | ✅* | Adicionar horário |
| GET | `/psicologos/{id}/horarios` | ✅ | Listar horários |
| PUT | `/psicologos/{id}/horarios/{indice}` | ✅* | Atualizar horário |
| DELETE | `/psicologos/{id}/horarios/{indice}` | ✅* | Remover horário |
| POST | `/consultas` | ✅ | Agendar consulta |
| GET | `/consultas` | ✅ | Listar consultas |
| GET | `/consultas/{id}` | ✅ | Buscar consulta |
| PUT | `/consultas/{id}` | ✅ | Atualizar consulta |
| DELETE | `/consultas/{id}` | ✅ | Cancelar/excluir |
| POST | `/consultas/{id}/evolucao` | PSICOLOGO/ADMIN | Criar evolução |
| GET | `/consultas/{id}/evolucao` | PSICOLOGO/ADMIN | Buscar evolução |
| PUT | `/consultas/{id}/evolucao` | PSICOLOGO/ADMIN | Atualizar evolução |
| DELETE | `/consultas/{id}/evolucao` | PSICOLOGO/ADMIN | Excluir evolução |
| GET | `/pacientes/{id}/evolucoes` | PSICOLOGO/ADMIN | Histórico clínico |

\* ADMIN ou psicólogo **dono** do recurso.

---

## 15. Observações para implementação no frontend

1. **Interceptador HTTP:** adicionar `Authorization: Bearer {token}` automaticamente; redirecionar para login em `401`.
2. **Role-based UI:** usar campo `role` do login para mostrar/ocultar telas (evolução clínica, gestão de psicólogos, etc.).
3. **IDs UUID:** tratar sempre como string; validar formato antes de enviar.
4. **Timezone:** backend usa `LocalDateTime` sem offset explícito — envie datas no fuso local ou acordado com o time.
5. **Horários vs consultas:** ao montar seletor de horário, cruzar `GET horarios` com consultas existentes (`GET /consultas?psicologoId=`) para evitar conflitos no UI (backend também valida).
6. **Índice de horários:** após DELETE de um horário, índices mudam — sempre re-fetch a lista após mutações.
7. **Login error:** tratar resposta `400` do login como texto, não como JSON.
8. **Paciente não vê evolução clínica:** rotas de evolução retornam `403` para paciente — não exibir essas telas.
9. **Decodificar JWT (opcional):** payload contém `sub` (email) e claim `role`; expiração em ~2h.

---

## 16. Exemplo de cliente HTTP (JavaScript/TypeScript)

```typescript
const API_BASE = "http://localhost:8080";

async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err.mensagem ?? err.erro ?? "Erro na API");
    }
    throw new Error(await res.text());
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// Login
const auth = await api<{ token: string; type: string; role: string }>(
  "/auth/login",
  { method: "POST", body: JSON.stringify({ email, senha }) }
);
localStorage.setItem("token", auth.token);
localStorage.setItem("role", auth.role);

// Listar psicólogos
const psicologos = await api("/psicologos");
```

---

*Documento gerado a partir do código-fonte do backend SelfEvolution-backend-core.*
