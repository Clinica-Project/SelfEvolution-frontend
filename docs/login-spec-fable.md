# Especificação — Login `/login` · SelfEvolution

> **Versão:** 1.0 — Redesign premium  
> **Destino:** Fable 5 / design + motion  
> **Referência de qualidade:** Awwwards (Site of the Day tier)  
> **Stack alvo:** Next.js 15 · React 19 · Tailwind · Framer Motion  
> **Última atualização:** Julho/2026  
> **Continuidade visual:** [`home-spec-fable.md`](./home-spec-fable.md)

---

## 0. Prompt resumido (cole no Fable 5)

```text
Redesenhe a tela de login (/login) da clínica interdisciplinar SelfEvolution — nível Awwwards Site of the Day.

CONCEITO: "Portal de confiança" — transição acolhedora da marca pública para o sistema clínico. Não parecer banco, hospital ou SaaS genérico.

LAYOUT DIFERENCIADO (desktop): split-screen 50/50 ou 55/45
- Esquerda: painel imersivo de marca — orbes flutuantes, tipografia editorial, frase acolhedora, loops coloridos (identidade Instagram), sem foto stock
- Direita: formulário minimalista em card vidro (glass) ou superfície branca elevada

MOBILE: formulário centralizado full-height, painel de marca vira faixa superior compacta ou colapsa em header decorativo

PALETA (mesma da home):
- Fundo creme #FDFBF2
- Roxo #6B4E91 · Azul #6297F5 · Accents #F4CC47 #82C4FF #5BBFB5 #E8716D
- Card #FFFFFF com blur/backdrop opcional
- Texto #333333

TIPOGRAFIA:
- Nunito bold (títulos) + Inter (labels/corpo)
- Logo: "selfevolution" minúsculo + "clínica interdisciplinar"

FORMULÁRIO:
- Campos: e-mail, senha (toggle mostrar/ocultar)
- Botão: "Entrar" full-width, primary roxo
- Link: "← Voltar ao site" → /
- Estados: default, focus, loading, erro amigável, sessão expirada (banner)

ANIMAÇÕES PROFISSIONAIS:
- Page load: painel esquerdo reveal + card desliza da direita (stagger)
- Inputs: label float, focus ring glow roxo, ícone de campo animado
- Submit: loading spinner inline + botão desabilitado
- Erro: shake suave no card + mensagem fade-in
- Orbes: float loop 22–34s (continuidade com home)
- Botão entrar: hover lift + optional magnetic (desktop)
- Transição hover nos links

DIFERENCIAL COMPETITIVO:
- Split editorial vs card centralizado genérico
- Glass morphism sutil ou card com borda gradiente
- Painel esquerdo com citação clínica + anéis/loops animados (HeroVisual simplificado)
- Micro-copy acolhedor: "Área restrita a profissionais"
- WCAG AA, prefers-reduced-motion

TOM: profissional, seguro, humano. Idioma: português BR.
Sem cadastro público, sem "esqueci senha" no MVP (opcional desabilitado).
```

---

## 1. Brief criativo

### 1.1 Objetivo

Transformar `/login` de formulário placeholder em **portal de entrada premium** que:

- Reforce **confiança** antes do profissional digitar credenciais
- Mantenha **continuidade visual** com a home (mesma linguagem motion + paleta)
- Diferencie de telas de login corporativas (retângulo branco no centro da tela)
- Prepare emocionalmente a transição **público → sistema clínico**
- Funcione impecavelmente em **mobile** (muitos psicólogos acessam do celular)

### 1.2 Conceito central — *"Portal de confiança"*

Metáfora: cruzar um limiar — do acolhimento da marca para o espaço de trabalho clínico. A animação deve sentir-se como **abrir uma porta**, não preencher um formulário burocrático.

| Elemento | Metáfora | Execução |
|----------|----------|----------|
| Painel esquerdo | Identidade / missão | Tipografia grande, orbes, loops |
| Painel direito | Acesso profissional | Form limpo, foco, segurança |
| Transição load | Abertura do portal | Split reveal esquerda→direita |
| Focus input | Atenção cuidadosa | Glow roxo, label sobe |
| Erro | Alerta gentil | Shake + mensagem acolhedora (RN35) |
| Sucesso | Passagem | Fade out + redirect (futuro) |

### 1.3 O que NÃO fazer

- Card genérico 400px centralizado sem contexto (estado atual — superar)
- Imagem de médico/paciente sorrindo (stock)
- Fundo escuro / dark mode login
- Captcha, social login, cadastro — fora do MVP
- Animações agressivas no shake de erro
- Texto "Invalid credentials" em inglês
- Múltiplas colunas de links legais

### 1.4 Referências de mood (não copiar)

| Referência | O que absorver |
|------------|----------------|
| Linear.app login | Split limpo, tipografia, blur |
| Stripe Dashboard sign-in | Confiança, hierarquia |
| Apple ID (layout) | Espaço negativo, foco no form |
| Home SelfEvolution (interna) | Orbes, gradientes, motion language |
| Awwwards — auth pages | Assimetria, storytelling lateral |
| Notion login | Simplicidade do form + calor na marca |

---

## 2. Design tokens (herdar da home)

Usar **exatamente** os tokens de [`system-design.md`](./system-design.md) e [`home-spec-fable.md`](./home-spec-fable.md):

| Token | Hex | Uso no login |
|-------|-----|--------------|
| `surface-background` | `#FDFBF2` | Fundo global |
| `surface-card` | `#FFFFFF` | Card formulário |
| `brand-primary` | `#6B4E91` | Botão, focus, títulos |
| `brand-secondary` | `#6297F5` | Links secundários, banner info |
| `brand-accent-*` | ver home | Orbes painel esquerdo |
| `content-primary` | `#333333` | Labels, títulos form |
| `content-secondary` | `#4A4A4A` | Subcopy |
| `content-muted` | `#7A7A7A` | Placeholders |
| `border-default` | `#E8E4DA` | Bordas inputs |
| `status-error` | `#D32F2F` | Erro credenciais |

### Tipografia login

| Elemento | Fonte | Desktop | Mobile |
|----------|-------|---------|--------|
| Painel H2 | Nunito 700 | 40–52px | 28–32px |
| Form H1 | Nunito 700 | 28–32px | 24–28px |
| Body painel | Inter 400 | 18px | 16px |
| Labels | Inter 500 | 14px | 14px |
| Inputs | Inter 400 | 16px | 16px (evitar zoom iOS) |
| Botão | Inter 500 | 16px | 16px |

---

## 3. Arquitetura da tela

### 3.1 Desktop (≥ 1024px) — Split imersivo

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  PAINEL MARCA (55%)              │  PAINEL FORM (45%)                   │
│  fundo creme + orbes             │  fundo creme ou branco suave         │
│                                  │                                      │
│  [Logo → /]                      │         ┌─────────────────────┐      │
│                                  │         │  Logo (opcional)    │      │
│  "Você cuida.                    │         │  Área restrita      │      │
│   Nós organizamos."              │         │                     │      │
│                                  │         │  E-mail             │      │
│  Frase acolhedora +              │         │  [____________]     │      │
│  keywords em negrito             │         │  Senha              │      │
│                                  │         │  [____________] 👁  │      │
│  [Anéis / loops animados]        │         │                     │      │
│  [Orbes float]                   │         │  [ Entrar ]         │      │
│                                  │         │                     │      │
│  ← Voltar ao site (canto inf.)   │         │  ← Voltar ao site   │      │
│                                  │         └─────────────────────┘      │
│                                  │                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Mobile (< 1024px) — Stack vertical

```text
┌──────────────────────────┐
│  Faixa marca (28–35vh)   │  ← gradiente + logo + frase curta
│  orbes + loops compactos │
├──────────────────────────┤
│                          │
│  Card form (padding)     │
│  Área restrita           │
│  E-mail                  │
│  Senha                   │
│  [ Entrar ]              │
│  ← Voltar ao site        │
│                          │
└──────────────────────────┘
```

### 3.3 Sem header/footer da home

Login usa layout `(auth)` — **sem** PublicHeader/PublicFooter. Navegação mínima: logo + voltar ao site.

---

## 4. Conteúdo e copy

### 4.1 Painel esquerdo (desktop) / faixa superior (mobile)

| Elemento | Texto |
|----------|-------|
| Logo | `selfevolution` + `clínica interdisciplinar` |
| Headline | `Você cuida.` / `Nós organizamos.` (2 linhas) |
| Subcopy | `Acesso exclusivo para **profissionais** da clínica. Gerencie pacientes, consultas e evolução com clareza.` |
| Link inferior | `← Voltar ao site` → `/` |

**Alternativa headline:**

> `Bem-vindo de volta.`  
> `Seu painel clínico está pronto.`

### 4.2 Formulário

| Elemento | Texto |
|----------|-------|
| Título (H1) | `Área restrita` |
| Subtítulo | `Entre com seu e-mail e senha para acessar o painel.` |
| Label e-mail | `E-mail` |
| Placeholder e-mail | `seu@email.com` |
| Label senha | `Senha` |
| Placeholder senha | `••••••••` |
| Botão submit | `Entrar` |
| Loading | `Entrando…` |
| Link rodapé form | `← Voltar ao site` |

### 4.3 Mensagens de estado

| Estado | Mensagem |
|--------|----------|
| Erro credenciais | `E-mail ou senha incorretos. Verifique e tente novamente.` |
| Sessão expirada (query `?expired=1`) | `Sua sessão expirou. Faça login novamente.` (RN05) |
| Campo obrigatório | `Preencha este campo.` |
| E-mail inválido | `Digite um e-mail válido.` |
| Placeholder MVP (atual) | `Login funcional será implementado em breve.` — remover na integração |

---

## 5. Componentes UI

### 5.1 Card do formulário

**Variante A — Glass (recomendada para Awwwards):**

```text
background: rgba(255,255,255,0.72)
backdrop-filter: blur(20px)
border: 1px solid rgba(255,255,255,0.8)
border-radius: 24px
box-shadow: 0 24px 64px -24px rgba(107,78,145,0.25)
padding: 40px (desktop) / 28px (mobile)
max-width: 420px
```

**Variante B — Card sólido premium:**

```text
background: #FFFFFF
border: 1px solid #E8E4DA
border-radius: 20px
box-shadow: lift + borda gradiente sutil (roxo→azul) no topo via pseudo-element
```

### 5.2 Inputs premium

| Estado | Visual |
|--------|--------|
| Default | Borda `#E8E4DA`, fundo branco, radius 12px, h 48px |
| Focus | Borda `#6B4E91`, ring `0 0 0 3px rgba(107,78,145,0.15)` |
| Error | Borda `#D32F2F`, ring vermelho suave |
| Label | Acima do campo, 14px medium; opcional float animation |

**Ícones inline (Lucide):**

- E-mail: `Mail` à esquerda dentro do input (padding-left extra)
- Senha: `Lock` à esquerda + `Eye`/`EyeOff` toggle à direita

### 5.3 Botão Entrar

| Estado | Visual |
|--------|--------|
| Default | Full width, bg `#6B4E91`, texto branco, h 48px, radius 12px |
| Hover | `#563D78`, translateY -2px, shadow lift |
| Loading | Opacity 0.85, spinner 16px à direita do texto |
| Disabled | Opacity 0.5, cursor not-allowed |

### 5.4 Banner de alerta (sessão expirada / erro)

```text
Callout acima do form
background: brand-secondary/10 ou status-error/10
border-left: 4px solid (azul ou vermelho)
border-radius: 12px
padding: 12px 16px
ícone: AlertCircle ou Info
animação: slideDown + fade 0.4s
```

---

## 6. Painel de marca — visual diferenciado

Reutilizar linguagem da home, versão **simplificada**:

### 6.1 Elementos

1. **FloatingOrbs** — mesmos orbes da home, opacidade 12–20%
2. **Anéis concêntricos** — 2 círculos tracejados rotacionando lentamente (90s / 130s reverse)
3. **Loops coloridos** — 5 círculos em linha (manifesto da home) ou Psi (Ψ) estilizado
4. **Chip flutuante opcional** — `"Psicologia · Consultas · Evolução"` com float animation

### 6.2 Composição desktop

```text
        ╭──── orbe amarelo blur
       ╱
  [Logo]
  
  Você cuida.
  Nós organizamos.
  
  Texto acolhedor...
  
      ◯───◯───◯  loops
         ╲
          ╰─ orbe teal
```

**Evitar:** ilustração literal de computador, cadeado gigante, escudo genérico.

---

## 7. Sistema de animações

### 7.1 Princípios (herdar da home)

| Regra | Valor |
|-------|-------|
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Duração entrada page | 0.7–1.1s |
| Stagger | 80–120ms |
| Reduced motion | Desabilitar float, slide, shake |

### 7.2 Catálogo

#### A — Page load (split desktop)

| Ordem | Elemento | Animação | Delay |
|-------|----------|----------|-------|
| 1 | Orbes background | fade + scale 0.95→1 | 0ms |
| 2 | Painel esquerdo copy | translateX -32→0 + opacity | 150ms |
| 3 | Loops decorativos | opacity 0→1 | 350ms |
| 4 | Card form | translateX 32→0 + opacity | 250ms |
| 5 | Logo form | opacity | 400ms |
| 6 | Título form | translateY 16→0 | 480ms |
| 7 | Inputs stagger | translateY 12→0 | 560ms, 640ms |
| 8 | Botão | translateY 12→0 + opacity | 720ms |

#### B — Mobile load

Card sobe de `translateY(24px)` + painel marca fade — sequência mais compacta (total ~600ms).

#### C — Input focus

```text
border-color transition 0.25s
ring spread 0→3px em 0.2s
label (se float): translateY -4px, scale 0.92, color → brand-primary
ícone: scale 1→1.05
```

#### D — Submit loading

```text
botão: width estável, texto → "Entrando…"
spinner: rotate 360° 0.8s linear infinite
inputs: disabled opacity 0.6
```

#### E — Erro credenciais

```text
card: shake keyframes ±4px horizontal, 0.45s
banner erro: height 0→auto + opacity 0→1
inputs senha/email: border-error (opcional shake só no card)
```

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
```

#### F — Hover botão (desktop)

```text
translateY: 0 → -2px
shadow: sm → lift
transition: 0.3s ease-out
optional: magnetic ±3px
```

#### G — Link "Voltar ao site"

```text
hover: gap arrow aumenta, cor → brand-primary-dark
underline offset animado
```

#### H — Orbes float (loop contínuo)

Mesmas keyframes da home: `float-a` 22s, `float-b` 28s, `float-c` 34s.

---

## 8. Fluxos e estados da tela

```mermaid
stateDiagram-v2
    [*] --> Default
    Default --> Focus: usuário foca input
    Focus --> Default: blur
    Default --> Loading: submit válido
    Loading --> Success: 200 API
    Loading --> Error: 401/400 API
    Error --> Default: editar campos
    Success --> Dashboard: redirect /dashboard
    [*] --> Expired: ?expired=1
    Expired --> Default: dismiss banner
```

| Estado | UI |
|--------|-----|
| **Default** | Form vazio ou preenchido |
| **Focus** | Ring no input ativo |
| **Loading** | Botão spinner, inputs disabled |
| **Error** | Banner + shake card |
| **Expired** | Banner azul topo (antes do submit) |
| **Success** | Breve fade out → redirect (Sprint integração) |

---

## 9. Responsividade

| Breakpoint | Layout |
|------------|--------|
| `< 640px` | Stack, form full-width, faixa marca 30vh |
| `640–1023px` | Stack, form max 440px centralizado |
| `≥ 1024px` | Split 55/45 ou 50/50 |
| `≥ 1440px` | Mais respiro no painel esquerdo, form max 420px |

**Touch:** inputs min 48px altura · botão min 48px · toggle senha área 44px.

---

## 10. Acessibilidade

- Contraste WCAG AA em labels, placeholders e erros
- `autocomplete="email"` e `autocomplete="current-password"`
- Labels associados via `htmlFor` / `id`
- Erros com `role="alert"` e `aria-live="polite"`
- Toggle senha: `aria-label="Mostrar senha"` / `"Ocultar senha"`
- Focus trap **não** necessário (página simples)
- Tab order: e-mail → senha → toggle → entrar → voltar
- `prefers-reduced-motion`: sem shake, float, slide — fade instantâneo

---

## 11. Diferencial competitivo (vs login genérico)

| Genérico | SelfEvolution Awwwards |
|----------|------------------------|
| Card 400px no vazio | Split storytelling + form |
| Fundo cinza | Creme + orbes + loops marca |
| "Sign in" inglês | Copy acolhedor PT-BR |
| Input bootstrap | Input com ícone, glow, toggle senha |
| Erro vermelho seco | Shake gentil + mensagem humana |
| Sem contexto de marca | Painel "Você cuida. Nós organizamos." |
| Mesma tela mobile/desktop | Faixa marca adaptativa mobile |

---

## 12. Entregáveis esperados do Fable 5

1. **Desktop 1440px** — split completo com todos os estados
2. **Mobile 390px** — stack vertical
3. **Style frame** — inputs, botão, banners, card glass
4. **Motion storyboard** — timeline A→H
5. **Estados:** default, focus, loading, error, expired
6. **Variante opcional** — glass vs card sólido (escolher 1 vencedora)

---

## 13. Critérios de aceite

| Critério | Meta |
|----------|------|
| Continuidade | Parece mesma marca da home `/` |
| Diferenciação | Não parece template Tailwind/UI kit |
| Confiança | Profissional transmite segurança clínica |
| Usabilidade | Login completável em < 15s |
| Motion | 60fps, reduced motion ok |
| MVP scope | Só e-mail + senha + entrar + voltar |

---

## 14. Notas para implementação (pós-Fable)

```text
app/(auth)/layout.tsx           → split layout desktop
app/(auth)/login/page.tsx       → composição
components/auth/LoginForm.tsx   → form client
components/auth/LoginBrandPanel.tsx → painel esquerdo
components/auth/LoginVisual.tsx → anéis/loops (simplificado HeroVisual)
components/home/FloatingOrbs.tsx → reutilizar
```

**Integração (Sprint 5 — não no design):**

- POST `/login` → `{ token, perfil }`
- `localStorage` chave `se_token`
- Redirect `/dashboard`
- Query `?expired=1` para banner RN05

---

## Referências internas

- [Home Spec Fable](./home-spec-fable.md)
- [System Design §5.2 / §4.3](./system-design.md)
- [Fluxo de Páginas §7.2](./fluxo-paginas.md)
- Implementação atual: `app/(auth)/login/page.tsx`
