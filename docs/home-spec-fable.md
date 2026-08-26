# Especificação — Home Pública `/` · SelfEvolution

> **Versão:** 2.0 — Redesign premium  
> **Destino:** Fable 5 / design + motion  
> **Referência de qualidade:** Awwwards (Site of the Day tier)  
> **Stack alvo:** Next.js 15 · React 19 · Tailwind · Framer Motion / GSAP  
> **Última atualização:** Julho/2026

---

## 0. Prompt resumido (cole no Fable 5)

```text
Redesenhe a home pública de uma clínica interdisciplinar de saúde mental chamada SelfEvolution.

Conceito: "Evolução humana em movimento" — acolhimento clínico com estética editorial premium, nível Awwwards.

Paleta: fundo creme #FDFBF2, roxo primário #6B4E91, azul #6297F5, accents amarelo #F4CC47, teal #5BBFB5, coral #E8716D.

Tipografia: Nunito (display/títulos) + Inter (corpo). Logo textual: "selfevolution" minúsculo + tagline "clínica interdisciplinar".

Tom: profissional, acolhedor, humano — NÃO corporativo frio, NÃO hospitalar. Público inclui famílias e idosos (legibilidade WCAG AA).

Diferencial visual: scroll cinematográfico, tipografia cinética, formas orgânicas flutuantes (loops/círculos dos posts Instagram), cards com profundidade sutil, micro-interações refinadas.

Seções: Hero imersivo → Manifesto/Sobre → Serviços (7 cards) → Diferenciais (3 pilares) → Prova social → CTA final → Footer.

Animações profissionais: entrada staggered, parallax suave, reveal on scroll, hover magnético nos CTAs, marquee de especialidades, contador animado opcional.

Responsivo desktop-first, mobile impecável. Header sticky com blur. CTAs: "Conheça nossos serviços" (#servicos) e "Acessar sistema" (/login).

Manter identidade brasileira, textos em português, keywords em negrito no estilo Instagram da marca.
```

---

## 1. Brief criativo

### 1.1 Objetivo

Transformar `/` de landing funcional em **experiência de marca memorável** que:

- Transmita **confiança clínica** e **calor humano** simultaneamente
- Diferencie SelfEvolution de clínicas genéricas e sites de saúde datados
- Converta visitantes em contatos/agendamentos (CTA secundário) e profissionais em login (CTA área restrita)
- Sirva de **referência visual** para todo o restante do produto (dashboard herda tokens e motion language)

### 1.2 Conceito central — *"Evolução em movimento"*

Metáfora visual: crescimento orgânico, ciclos de cuidado, transformação gradual — nunca abrupta ou agressiva.

| Elemento | Metáfora | Execução visual |
|----------|----------|-----------------|
| Formas flutuantes | Loops de evolução | Elipses/círculos com gradient mesh, opacidade 8–18% |
| Scroll | Jornada terapêutica | Seções reveladas como "capítulos" |
| Tipografia | Voz humana | Palavras-chave destacadas em **negrito** ou cor primária |
| Cards | Especialidades | Elevação suave, borda 1px, hover com lift + glow roxo |
| Motion | Respiração | Easings orgânicos (`ease-out-expo`, spring suave) — nunca bounce exagerado |

### 1.3 O que NÃO fazer

- Parallax pesado que causa motion sickness
- Vídeo autoplay com som
- Dark mode nesta página (identidade é creme claro)
- Stock photos genéricas de "gente sorrindo no consultório"
- Animações contínuas distraindo leitura (respeitar `prefers-reduced-motion`)
- Texto decorativo ilegível ou contraste insuficiente
- Estética "tech startup/crypto" — não é o segmento

### 1.4 Referências de mood (não copiar)

| Referência | O que absorver |
|------------|----------------|
| Awwwards — health/wellness editorial | Scroll storytelling, tipografia grande |
| Locomotive.ca | Smooth scroll, seções full-viewport |
| Active Theory (moderado) | WebGL sutil / gradient mesh — opcional no hero |
| Instagram @selfevolution | Paleta, loops coloridos, negrito editorial |
| Linear.app | Micro-interações de botão, blur no header |
| Stripe.com (seções) | Hierarquia limpa, espaço negativo generoso |

---

## 2. Design tokens (obrigatório)

### 2.1 Cores

| Token | Hex | Uso na home |
|-------|-----|-------------|
| `surface-background` | `#FDFBF2` | Fundo global |
| `surface-card` | `#FFFFFF` | Cards, header |
| `surface-muted` | `#F5F2EA` | Seção serviços, hover |
| `brand-primary` | `#6B4E91` | Títulos, CTA primário, links |
| `brand-primary-dark` | `#563D78` | Hover botões |
| `brand-secondary` | `#6297F5` | CTA final, callouts |
| `brand-accent-yellow` | `#F4CC47` | Destaques pontuais |
| `brand-accent-blue` | `#82C4FF` | Orbes decorativos |
| `brand-accent-teal` | `#5BBFB5` | Orbes, ícones |
| `brand-accent-coral` | `#E8716D` | Psi logo, detalhes |
| `content-primary` | `#333333` | Corpo |
| `content-secondary` | `#4A4A4A` | Subtítulos |
| `content-muted` | `#7A7A7A` | Captions |
| `border-default` | `#E8E4DA` | Bordas cards |

### 2.2 Tipografia

| Elemento | Fonte | Peso | Desktop | Mobile |
|----------|-------|------|---------|--------|
| Hero H1 | Nunito | 700 | 72–88px / lh 1.05 | 40–48px |
| Seção H2 | Nunito | 700 | 48–56px / lh 1.1 | 32–36px |
| Card H3 | Nunito | 600 | 20–24px | 18–20px |
| Body | Inter | 400 | 18–20px / lh 1.65 | 16–18px |
| Eyebrow | Inter | 500 | 12px uppercase, ls 0.12em | igual |
| Tagline logo | Inter | 400 | 12px | 12px |
| Logo | Nunito | 500 | 20–24px lowercase | 20px |

**Keywords em negrito** no corpo — padrão editorial Instagram.

### 2.3 Espaçamento e grid

| Token | Valor |
|-------|-------|
| Container max | `1280px` (max-w-7xl) |
| Padding horizontal | `24px` mobile · `32–48px` desktop |
| Seção vertical | `96–128px` desktop · `64–80px` mobile |
| Grid serviços | 3 col desktop · 2 col tablet · 1 col mobile |
| Header height | `72px` |

### 2.4 Radius e sombras

| Token | Valor |
|-------|-------|
| Botões / inputs | `12px` |
| Cards | `16px` |
| CTA banner | `24px` |
| Shadow card | `0 1px 3px rgba(107,78,145,0.08)` |
| Shadow hover | `0 12px 40px rgba(107,78,145,0.14)` |

---

## 3. Arquitetura da página

```text
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky, blur backdrop, hide-on-scroll-down opc.)   │
├─────────────────────────────────────────────────────────────┤
│  §01 HERO — full viewport (100dvh min)                      │
│      · Orbes animados + mesh gradient sutil                 │
│      · H1 cinético + subcopy + 2 CTAs                       │
│      · Scroll indicator animado                             │
├─────────────────────────────────────────────────────────────┤
│  §02 MANIFESTO — split layout ou centered editorial         │
│      · "Na SELF Evolution você não está sozinho(a)!"        │
├─────────────────────────────────────────────────────────────┤
│  §03 SERVIÇOS — grid 7 cards + marquee opcional de tags     │
├─────────────────────────────────────────────────────────────┤
│  §04 DIFERENCIAIS — 3 pilares horizontais com ícones        │
├─────────────────────────────────────────────────────────────┤
│  §05 PROVA SOCIAL — números / depoimentos / selos (mock)    │
├─────────────────────────────────────────────────────────────┤
│  §06 CTA FINAL — banner azul full-bleed inside container    │
├─────────────────────────────────────────────────────────────┤
│  FOOTER — logo, contato, redes, copyright                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Seções — conteúdo e layout

### §01 Hero (prioridade máxima)

**Layout desktop:**

```text
┌──────────────────────────────────────────────────────────┐
│  [Header transparente → sólido ao scroll]                │
│                                                          │
│     clínica interdisciplinar          [Orbe teal]        │
│                                                          │
│     Cuidado que evolui                  [Orbe amarelo]   │
│     com você                                             │
│                                                          │
│     Na SELF Evolution você não está    [Orbe azul]      │
│     sozinho(a)! Unimos psicologia...                     │
│                                                          │
│     [Conheça nossos serviços]  [Acessar sistema →]       │
│                                                          │
│                    ⌄ scroll                              │
└──────────────────────────────────────────────────────────┘
```

**Conteúdo:**

| Elemento | Texto |
|----------|-------|
| Eyebrow | `clínica interdisciplinar` |
| H1 linha 1 | `Cuidado que evolui` |
| H1 linha 2 (destaque) | `com você` — cor `brand-primary` ou underline SVG orgânico |
| Parágrafo | `Na **SELF** Evolution você não está **sozinho(a)!** Unimos psicologia, neuropsicologia, reabilitação e mais para apoiar cada fase da sua jornada.` |
| CTA primário | `Conheça nossos serviços` → `#servicos` |
| CTA secundário | `Acessar sistema` → `/login` |

**Elemento diferenciador — Tipografia cinética:**

- H1 entra com **split lines stagger** (linha 1 → linha 2, delay 80ms)
- Palavra `você` com subtle scale 0.96→1 ou gradient clip roxo→azul
- Opcional: cursor-follow glow muito sutil no hero (desktop only)

**Background:**

- Base `#FDFBF2`
- 3–5 **orbes** (círculos/elipses) com blur 60–120px, cores accent, opacidade 10–16%
- Movimento: `float` loop 18–28s, amplitude 12–24px, direções alternadas
- Opcional premium: **gradient mesh** SVG animado lento (rotación 120s) — performance-friendly

---

### §02 Manifesto / Sobre

**Layout:** texto editorial centralizado, max-width 720px, padding generoso.

**Conteúdo:**

> **Sobre nós**  
> Somos uma clínica interdisciplinar dedicada a oferecer um espaço **acolhedor**, com linguagem clara e atendimento profissional.  
> Acreditamos que evoluir é um processo **compartilhado** — com escuta, ciência e presença.

**Visual diferenciado:**

- Palavras-chave com highlight estilo marcação (fundo `brand-accent-yellow/25`, padding inline 4px, radius 4px) — alternativa ao bold puro
- Linha decorativa Psi (Ψ) ou loop SVG entre título e parágrafo

---

### §03 Serviços

**Eyebrow:** `Nossas especialidades`  
**H2:** `Cuidado integrado em cada área`  
**Sub:** `Equipe multidisciplinar para acompanhar mente, comportamento e desenvolvimento.`

**7 cards:**

| # | Título | Descrição curta |
|---|--------|-----------------|
| 1 | Psicologia | Acompanhamento emocional e comportamental em todas as fases da vida. |
| 2 | Avaliação neuropsicológica | Investigação cognitiva com rigor clínico e devolutiva acolhedora. |
| 3 | Reabilitação cognitiva | Estímulo de funções cognitivas com plano individualizado. |
| 4 | Psicopedagogia | Apoio à aprendizagem e ao desenvolvimento escolar. |
| 5 | Terapia ABA | Intervenção baseada em evidências para habilidades do dia a dia. |
| 6 | Fonoaudiologia | Comunicação, linguagem, voz e deglutição. |
| 7 | Nutrição | Orientação alimentar integrada ao cuidado interdisciplinar. |

**Layout card premium:**

```text
┌─────────────────────────┐
│  [ícone 40px]     01    │  ← número grande watermark opacity 6%
│                         │
│  Psicologia             │
│  Descrição 2 linhas...  │
│                         │
│  ──────────────────     │  ← linha gradiente no hover
└─────────────────────────┘
```

**Marquee opcional (diferencial):**

Faixa horizontal infinita acima do grid:

`Psicologia · Neuropsicologia · ABA · Fonoaudiologia · Nutrição · Psicopedagogia ·`

Velocidade lenta, pausa no hover, duplicar conteúdo para loop seamless.

---

### §04 Diferenciais

**H2:** `Por que SelfEvolution?`

| Pilar | Ícone | Título | Texto |
|-------|-------|--------|-------|
| 1 | Users / interlace | Abordagem interdisciplinar | Equipe integrada para olhar o cuidado de forma **completa** e **humanizada**. |
| 2 | Monitor | Online e presencial | Flexibilidade com a mesma qualidade clínica em **ambos os formatos**. |
| 3 | Heart | Todas as fases da vida | Acompanhamento para crianças, adolescentes, adultos e idosos com **acolhimento**. |

**Layout:** 3 colunas desktop; scroll horizontal snap no mobile (cards 85vw).

---

### §05 Prova social (nova — elevar percepção premium)

**Conteúdo mock (substituir por dados reais depois):**

| Métrica | Valor | Label |
|---------|-------|-------|
| 1 | `+500` | famílias acolhidas |
| 2 | `7` | especialidades integradas |
| 3 | `100%` | equipe registrada |

**Animação:** contadores incrementam ao entrar no viewport (1.2s, ease-out).

**Opcional:** 1 depoimento curto em card italic + avatar inicial.

---

### §06 CTA final

**Layout:** card full-width dentro do container, fundo gradient `brand-secondary` → `brand-primary` (135deg).

**Conteúdo:**

| Elemento | Texto |
|----------|-------|
| H2 | `Pronto para dar o próximo passo?` |
| Sub | `Profissionais da clínica acessam o sistema. Famílias podem falar conosco.` |
| Botão primário | `Acessar sistema` → `/login` |
| Link secundário | `Falar com a clínica` → WhatsApp/mailto (placeholder `#`) |

**Motion:** botão com hover magnético leve (translate 2–4px toward cursor, desktop).

---

### Footer

- Logo + tagline
- Colunas: Contato · Redes · Links (Serviços, Sobre, Login)
- Redes: Instagram (principal), WhatsApp
- Copyright dinâmico
- Fundo `surface-card`, borda top `border-default`

---

## 5. Header (sticky)

| Estado | Comportamento |
|--------|---------------|
| Topo (hero) | Transparente ou `bg-surface-card/0`, texto legível sobre creme |
| Scroll > 80px | `bg-surface-card/80 backdrop-blur-xl border-b`, shadow-sm |
| Logo | `selfevolution` + tagline (desktop) |
| Nav desktop | Serviços · Sobre · Diferenciais (âncoras smooth scroll) |
| CTA header | `Acessar sistema` — botão primary compact |
| Mobile | Hamburger → drawer full-height, animação slide + fade |

**Micro-interação nav:** underline animado roxo no hover (scaleX 0→1).

---

## 6. Sistema de animações (nível Awwwards)

### 6.1 Princípios

| Regra | Valor |
|-------|-------|
| Duração entrada | 0.6–1.0s |
| Stagger filhos | 60–120ms |
| Easing padrão | `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) |
| Spring (hover) | stiffness 400, damping 30 |
| Scroll trigger | once: true, threshold 15–20% viewport |
| FPS alvo | 60 — animar só `transform` e `opacity` |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` → desabilitar parallax, marquee, float |

### 6.2 Catálogo de animações

#### A — Page load sequence (hero)

| Ordem | Elemento | Animação | Delay | Duração |
|-------|----------|----------|-------|---------|
| 1 | Orbes background | fade in + scale 0.9→1 | 0ms | 1.4s |
| 2 | Eyebrow | translateY 24→0 + opacity | 200ms | 0.8s |
| 3 | H1 linha 1 | translateY 40→0 + opacity | 350ms | 0.9s |
| 4 | H1 linha 2 | translateY 40→0 + opacity | 480ms | 0.9s |
| 5 | Parágrafo | translateY 24→0 + opacity | 650ms | 0.8s |
| 6 | CTAs | translateY 16→0 + opacity | 800ms | 0.7s |
| 7 | Scroll indicator | fade + bounceY loop | 1200ms | ∞ 2s |

#### B — Scroll reveal (seções 02–06)

```text
initial:  { opacity: 0, y: 48 }
animate:  { opacity: 1, y: 0 }
transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
staggerChildren: 0.1
```

#### C — Cards serviços (hover desktop)

| Propriedade | Repouso | Hover |
|-------------|---------|-------|
| translateY | 0 | -6px |
| boxShadow | sm | md/lg |
| borderColor | `#E8E4DA` | `#8B6BB5` 40% |
| ícone | scale 1 | scale 1.08 |
| linha gradiente bottom | scaleX 0 | scaleX 1 |

Duração hover: `0.35s ease-out`

#### D — Orbes flutuantes (loop)

```css
@keyframes float-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(12px, -20px) scale(1.04); }
}
/* float-b, float-c com fases diferentes — 20s, 26s, 32s */
```

#### E — Marquee especialidades

```text
translateX: 0 → -50%
duration: 40s linear infinite
pause-on-hover: animation-play-state paused
```

#### F — Contadores prova social

```text
from: 0
to: target
duration: 1.2s
ease: easeOut
trigger: inView once
```

#### G — Botão magnético (CTA final, desktop)

```text
onMouseMove: button translate max ±4px toward cursor
onMouseLeave: spring back to 0,0
```

#### H — Smooth scroll âncoras

```text
behavior: smooth
offset header: 72px
```

### 6.3 Biblioteca recomendada

| Camada | Lib | Uso |
|--------|-----|-----|
| Entrada / scroll | Framer Motion | `motion.div`, `useInView`, `stagger` |
| Hero mesh / parallax | GSAP + ScrollTrigger | orbes, pin opcional no manifesto |
| Smooth scroll | Lenis (opcional) | scroll cinematográfico — testar performance |
| Contador | Framer Motion `useSpring` | métricas §05 |

**Orçamento performance:** LCP < 2.5s · CLS < 0.1 · animações GPU-only.

---

## 7. Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| `< 640px` | H1 40px, stack CTAs full-width, cards 1 col, drawer nav |
| `640–1024px` | H1 56px, serviços 2 col, diferenciais scroll snap |
| `> 1024px` | Layout completo, hover states, magnetic button |
| `> 1440px` | Container centralizado, orbes maiores nas bordas |

**Touch:** tap targets mín 44px · sem hover-only critical info.

---

## 8. Acessibilidade

- Contraste WCAG AA mínimo (roxo `#6B4E91` sobre creme OK)
- `prefers-reduced-motion`: fallback estático
- Focus visible em todos os interativos (ring roxo 2px)
- Hierarquia semântica: 1× `<h1>`, `<h2>` por seção
- Alt text em SVGs decorativos: `aria-hidden="true"`
- Skip link: "Pular para conteúdo"

---

## 9. Assets necessários

| Asset | Formato | Notas |
|-------|---------|-------|
| Logo Psi (Ψ) | SVG | 4 cores accent — favicon + hero watermark |
| Logo wordmark | SVG/texto | `selfevolution` lowercase |
| Orbes / loops | SVG ou CSS | derivados dos posts Instagram |
| Ícones serviços | Lucide ou custom SVG | 24–40px, stroke 1.5 |
| OG image | 1200×630 | Hero composto para share |

---

## 10. Entregáveis esperados do Fable 5

1. **Mockup desktop** 1440px — hero + 1 scroll fold
2. **Mockup mobile** 390px — hero + serviços
3. **Style frame** — cores, tipos, botões, cards
4. **Motion storyboard** — timeline das animações A→H
5. **Componentes** — Header, Hero, ServiceCard, MetricCounter, CTA banner, Footer
6. **Estados** — header scrolled, card hover, drawer mobile, reduced motion

---

## 11. Critérios de aceite (nível competitivo)

| Critério | Meta |
|----------|------|
| First impression | "Premium clínica, não template" em < 3s |
| Motion | Fluido 60fps, nenhum jank no scroll |
| Marca | Reconhecível sem logo explícito (creme + roxo + editorial bold) |
| Conversão | CTAs visíveis acima e abaixo do fold |
| Awwwards lens | Originalidade + usabilidade + design + criatividade ≥ 7/10 cada |
| Implementável | Sem dependência de WebGL pesado obrigatório |

---

## 12. Notas para implementação (pós-Fable)

Após aprovação do design no Fable 5, implementar em:

```text
app/(public)/page.tsx              → composição das seções
components/home/HeroSection.tsx
components/home/ManifestoSection.tsx
components/home/ServicesSection.tsx
components/home/DifferentialsSection.tsx
components/home/SocialProofSection.tsx
components/home/CtaSection.tsx
components/home/FloatingOrbs.tsx
components/layout/PublicHeader.tsx → upgrade sticky blur
```

Manter tokens existentes em `tailwind.config.js` — não inventar nova paleta.

---

## Referências internas

- [Login Spec Fable](./login-spec-fable.md)
- [System Design](./system-design.md)
- [Fluxo de Páginas §7.1](./fluxo-paginas.md)
- Implementação atual: `app/(public)/page.tsx`
