# Validation Harness — Ravanelli & Roseno

## Objetivo

Este harness é a porta de qualidade automatizada do site. Ele executa verificações reproduzíveis sobre o código, o build de produção e a saída HTTP real. Qualquer falha bloqueante encerra o processo com código de saída `1`.

O relatório de cada execução é gravado em `reports/validation-report.md`.

## Como executar

```bash
npm run validate:harness
```

A execução padrão:

1. verifica TypeScript;
2. executa o lint;
3. cria o build de produção;
4. inicia `next start` em `127.0.0.1:3100`;
5. valida todas as rotas;
6. encerra o servidor de validação;
7. grava o relatório Markdown.

### Validar uma URL já publicada

```powershell
$env:VALIDATION_BASE_URL="https://exemplo.com"
npm run validate:harness -- --skip-build
```

Variáveis suportadas:

- `VALIDATION_BASE_URL`: URL que será testada.
- `VALIDATION_PUBLIC_URL`: URL pública esperada nos canonicals e no sitemap. O padrão é `https://ravanellierosenoadv.com.br`.
- `VALIDATION_PORT`: porta do servidor de produção local. O padrão é `3100`.
- `--skip-build`: não executa TypeScript, lint e build; indicado somente para validar uma implantação existente.

## Rotas obrigatórias

- `/`
- `/escritorio`
- `/areas-de-atuacao`
- `/equipe`
- `/conteudos`
- `/contato`
- `/seguranca-e-prevencao-a-fraudes`
- `/robots.txt`
- `/sitemap.xml`

## Gates bloqueantes

| Categoria | Critério |
| --- | --- |
| Código | TypeScript, lint sem warnings e build precisam terminar com sucesso. |
| Rotas | Todas as páginas planejadas precisam responder HTTP 200. Uma rota inexistente precisa responder 404. |
| Semântica | Cada página, incluindo a 404, deve possuir exatamente um `main`, um `h1` e o alvo `#main-content`. |
| Acessibilidade | `lang="pt-BR"`, link para pular ao conteúdo, `alt` em todas as imagens, foco visível, suporte a `prefers-reduced-motion` e conteúdo pré-renderizado visível sem hidratação. |
| SEO | Título entre 15–80 caracteres, descrição entre 80–160 caracteres, valores exclusivos, canonical correto, Open Graph e Twitter Card completos em todas as páginas. |
| Dados estruturados | `LegalService` em todas as páginas e `FAQPage` na Home, com JSON válido. |
| Indexação | `robots.txt` deve liberar rastreamento e apontar para o sitemap. O sitemap deve conter exatamente as rotas públicas previstas. |
| Navegação | Links internos descobertos nas páginas não podem retornar erro. |
| Imagens | Imagens renderizadas precisam responder, usar formatos modernos e não referenciar os PNGs/JPGs pesados de produção. Fontes ativas: até 150 KiB por arquivo e 400 KiB no total. |
| Performance básica | HTML de cada rota até 220 KiB; JavaScript moderno inicial da Home até 700 KiB bruto e 230 KiB gzip; maior chunk até 300 KiB. |
| Segurança | CSP com proteção contra framing, Referrer Policy, `nosniff`, Permissions Policy e remoção de `X-Powered-By`. |

## Alertas não bloqueantes

O harness registra alertas para pendências que dependem de decisão editorial, identidade oficial, ambiente de hospedagem ou inspeção humana, por exemplo:

- favicon oficial ausente;
- conteúdo marcado como “a confirmar”;
- headers de segurança dependentes da hospedagem;
- tempo de resposta local acima de 1 segundo.

## Limites do harness

Este processo não substitui:

- inspeção visual em diferentes dispositivos;
- navegação manual completa por teclado e leitor de tela;
- Lighthouse em produção e dados reais de Core Web Vitals;
- validação jurídica/editorial das informações do escritório;
- testes de formulários ou integrações futuras.

Esses itens pertencem à revisão humana complementar.
