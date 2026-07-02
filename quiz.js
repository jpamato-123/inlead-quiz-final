/* ============================================================================
   INLEAD · TELA FINAL DO QUIZ  (versão hospedada no GitHub / jsDelivr)
   Produto sugerido + projeção de faturamento/lucro por nicho escolhido.
   ----------------------------------------------------------------------------
   No Inlead, o bloco de código precisa ter só isto:
     <div id="il-resultado"></div>
     <script src="https://cdn.jsdelivr.net/gh/SEU-USUARIO/SEU-REPO@main/quiz.js"></script>
   ----------------------------------------------------------------------------
   Pra trocar o ícone por FOTO real: preencha  imagem: 'https://...'  no nicho.
   ========================================================================== */
(function () {
  // --- CONFIG DOS NICHOS (edite números/produtos à vontade) -----------------
  var NICHOS = {
    casa:        { nome: "Casa e Decoração",        icone: "🏡", imagem: "", produto: "Umidificador aromatizador LED",  ticket: 139, custo: 42, ads: 35, vendas: 320 },
    eletronicos: { nome: "Eletrônicos",             icone: "🧮", imagem: "", produto: "Fone Bluetooth TWS",              ticket: 149, custo: 45, ads: 38, vendas: 400 },
    moda_masc:   { nome: "Moda Masculina",          icone: "👔", imagem: "", produto: "Relógio masculino minimalista",    ticket: 169, custo: 48, ads: 42, vendas: 280 },
    moda_fem:    { nome: "Moda Feminina",           icone: "👗", imagem: "", produto: "Bolsa transversal feminina",       ticket: 159, custo: 46, ads: 40, vendas: 300 },
    fitness:     { nome: "Fitness",                 icone: "💪", imagem: "", produto: "Kit faixas de resistência",        ticket: 119, custo: 32, ads: 30, vendas: 380 },
    automotivo:  { nome: "Automotivo",              icone: "🚙", imagem: "", produto: "Aspirador portátil automotivo",    ticket: 149, custo: 44, ads: 38, vendas: 260 },
    pet:         { nome: "Pet",                     icone: "🐩", imagem: "", produto: "Fonte de água automática p/ pets", ticket: 139, custo: 40, ads: 34, vendas: 340 },
    beleza:      { nome: "Beleza e Cuidados",       icone: "✨", imagem: "", produto: "Escova alisadora modeladora",      ticket: 159, custo: 46, ads: 40, vendas: 360 },
    cozinha:     { nome: "Cozinha e Utensílios",    icone: "🔍", imagem: "", produto: "Processador/fatiador manual",      ticket: 109, custo: 30, ads: 28, vendas: 330 },
    bebes:       { nome: "Bebês e Infantil",        icone: "👶", imagem: "", produto: "Projetor de luz estrelado",        ticket: 119, custo: 34, ads: 30, vendas: 300 },
    esportes:    { nome: "Esportes",                icone: "🌐", imagem: "", produto: "Garrafa térmica 2L c/ marcador",   ticket: 99,  custo: 28, ads: 26, vendas: 310 },
    ferramentas: { nome: "Ferramentas e Construção", icone: "🔧", imagem: "", produto: "Parafusadeira sem fio",          ticket: 179, custo: 55, ads: 45, vendas: 240 },
    saude:       { nome: "Saúde e Bem-estar",       icone: "🌿", imagem: "", produto: "Massageador cervical",             ticket: 169, custo: 50, ads: 44, vendas: 290 },
    joias:       { nome: "Joias e Acessórios",      icone: "💎", imagem: "", produto: "Colar/pulseira em aço banhado",    ticket: 129, custo: 32, ads: 34, vendas: 320 }
  };

  // --- >>> PONTO DE INTEGRAÇÃO <<< -----------------------------------------
  // O Inlead guarda as respostas em localStorage["quiz_marker_raw"], e os
  // nichos escolhidos ficam entre os marcadores [N] ... [/N], separados por "|".
  // Ex.: "...[N] Casa e Decoração 🏠 | Moda Feminina 👗 [/N]"
  // Aqui a gente lê esse trecho e mapeia cada nicho pra sua chave em NICHOS.

  // Normaliza um rótulo: minúsculas, sem acento, só letras (tira emoji/espaços).
  function normalizar(s) {
    return (s || "").toLowerCase().normalize("NFD")
      .replace(/[^a-z]/g, "");
  }

  // Rótulo normalizado do quiz  ->  chave em NICHOS
  var MAPA_NICHOS = {
    casaedecoracao: "casa", eletronicos: "eletronicos",
    modamasculina: "moda_masc", modafeminina: "moda_fem",
    fitness: "fitness", automotivo: "automotivo", pet: "pet",
    belezaecuidados: "beleza", cozinhaeutensilios: "cozinha",
    bebeseinfantil: "bebes", esportes: "esportes",
    ferramentaseconstrucao: "ferramentas", saudeebemestar: "saude",
    joiaseacessorios: "joias"
  };

  function getNichosEscolhidos() {
    // 1) Fonte real: localStorage do Inlead
    try {
      var raw = localStorage.getItem("quiz_marker_raw") || "";
      var bloco = raw.match(/\[N\]([\s\S]*?)\[\/N\]/);
      if (bloco && bloco[1]) {
        var chaves = [];
        bloco[1].split("|").forEach(function (parte) {
          var chave = MAPA_NICHOS[normalizar(parte)];
          if (chave && chaves.indexOf(chave) === -1) chaves.push(chave);
        });
        if (chaves.length) return chaves;
      }
    } catch (e) { /* segue pros fallbacks */ }

    // 2) Fallbacks (teste / manual): URL, variável global, ou exemplo
    var url = new URLSearchParams(window.location.search).get("nichos");
    if (url) return url.split(",").map(function (s) { return s.trim(); });
    if (window.NICHOS_ESCOLHIDOS && window.NICHOS_ESCOLHIDOS.length)
      return window.NICHOS_ESCOLHIDOS;
    return ["pet", "fitness", "beleza"]; // modo de teste (preview)
  }

  // --- CSS (injetado automaticamente) ---------------------------------------
  var CSS = ''
    + '#il-resultado *{box-sizing:border-box;margin:0;padding:0}'
    + '#il-resultado{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px 16px 32px;color:#1a1a2e}'
    + '#il-resultado .il-titulo{text-align:center;font-size:22px;font-weight:800;line-height:1.25;margin-bottom:6px}'
    + '#il-resultado .il-sub{text-align:center;font-size:14px;color:#6b7280;margin-bottom:22px}'
    + '#il-resultado .il-card{border:1px solid #ececf1;border-radius:16px;padding:18px;margin-bottom:14px;background:#fff;box-shadow:0 4px 16px rgba(20,20,60,.05)}'
    + '#il-resultado .il-card-top{display:flex;align-items:center;gap:14px}'
    + '#il-resultado .il-icone{flex:0 0 56px;width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:30px;background:#f4f4fb;overflow:hidden}'
    + '#il-resultado .il-icone img{width:100%;height:100%;object-fit:cover}'
    + '#il-resultado .il-nicho{font-size:13px;font-weight:700;color:#7c5cff;text-transform:uppercase;letter-spacing:.4px}'
    + '#il-resultado .il-produto{font-size:17px;font-weight:800;line-height:1.3;margin-top:2px}'
    + '#il-resultado .il-unit{display:flex;gap:8px;margin-top:16px}'
    + '#il-resultado .il-unit .il-u{flex:1;text-align:center;padding:10px 4px;border-radius:10px;background:#fafafd;border:1px solid #f0f0f5}'
    + '#il-resultado .il-unit .rot{display:block;font-size:11px;color:#6b7280;margin-bottom:3px;line-height:1.2}'
    + '#il-resultado .il-unit .val{display:block;font-size:15px;font-weight:700}'
    + '#il-resultado .il-metricas{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}'
    + '#il-resultado .il-metrica{background:#fafafd;border:1px solid #f0f0f5;border-radius:12px;padding:12px}'
    + '#il-resultado .il-metrica .rot{font-size:12px;color:#6b7280;margin-bottom:3px}'
    + '#il-resultado .il-metrica .val{font-size:19px;font-weight:800}'
    + '#il-resultado .il-metrica.lucro .val{color:#12b76a}'
    + '#il-resultado .il-total{border-radius:18px;padding:22px;background:linear-gradient(135deg,#7c5cff 0%,#5b3fe0 100%);color:#fff;text-align:center;margin-top:22px;box-shadow:0 10px 28px rgba(124,92,255,.35)}'
    + '#il-resultado .il-total .rot{font-size:14px;opacity:.9;margin-bottom:6px}'
    + '#il-resultado .il-total .fat{font-size:16px;opacity:.95;margin-bottom:10px}'
    + '#il-resultado .il-total .lucro-total{font-size:38px;font-weight:900;line-height:1}'
    + '#il-resultado .il-total .lucro-lbl{font-size:13px;opacity:.9;margin-top:6px}'
    + '#il-resultado .il-disc{font-size:11px;color:#9ca3af;text-align:center;margin-top:16px;line-height:1.5}';

  // --- RENDER ---------------------------------------------------------------
  function brl(n) { return "R$ " + Math.round(n).toLocaleString("pt-BR"); }
  function lucroVenda(n) { return n.ticket - n.custo - n.ads; }
  function fatMes(n)     { return n.ticket * n.vendas; }
  function lucroMes(n)   { return lucroVenda(n) * n.vendas; }
  function iconeHTML(n)  { return n.imagem ? '<img src="' + n.imagem + '" alt="' + n.produto + '">' : n.icone; }

  function cardHTML(n) {
    return '<div class="il-card">'
      + '<div class="il-card-top">'
        + '<div class="il-icone">' + iconeHTML(n) + '</div>'
        + '<div><div class="il-nicho">' + n.nome + '</div><div class="il-produto">' + n.produto + '</div></div>'
      + '</div>'
      + '<div class="il-unit">'
        + '<div class="il-u"><span class="rot">Ticket médio</span><span class="val">' + brl(n.ticket) + '</span></div>'
        + '<div class="il-u"><span class="rot">Custo do produto</span><span class="val">' + brl(n.custo) + '</span></div>'
        + '<div class="il-u"><span class="rot">Gasto em ads</span><span class="val">' + brl(n.ads) + '</span></div>'
      + '</div>'
      + '<div class="il-metricas">'
        + '<div class="il-metrica"><div class="rot">Faturamento/mês</div><div class="val">' + brl(fatMes(n)) + '</div></div>'
        + '<div class="il-metrica lucro"><div class="rot">Lucro/mês</div><div class="val">' + brl(lucroMes(n)) + '</div></div>'
      + '</div>'
    + '</div>';
  }

  function render() {
    var alvo = document.getElementById("il-resultado");
    if (!alvo || alvo.getAttribute("data-il-done")) return;
    alvo.setAttribute("data-il-done", "1");

    if (!document.getElementById("il-css")) {
      var st = document.createElement("style");
      st.id = "il-css"; st.textContent = CSS;
      document.head.appendChild(st);
    }

    var chaves = getNichosEscolhidos().filter(function (k) { return NICHOS[k]; });
    if (!chaves.length) { alvo.innerHTML = '<p class="il-sub">Nenhum nicho selecionado.</p>'; return; }

    var totalFat = 0, totalLucro = 0, cards = "";
    chaves.forEach(function (k) {
      var n = NICHOS[k];
      totalFat += fatMes(n); totalLucro += lucroMes(n); cards += cardHTML(n);
    });

    var plural = chaves.length > 1;
    alvo.innerHTML =
      '<div class="il-titulo">Seu potencial ' + (plural ? 'combinado ' : '') + 'de faturamento 🚀</div>'
      + '<div class="il-sub">Veja o produto sugerido e a projeção para '
        + (plural ? 'os ' + chaves.length + ' nichos que você escolheu' : 'o nicho que você escolheu') + '</div>'
      + cards
      + '<div class="il-total">'
        + '<div class="rot">Potencial total ' + (plural ? '(' + chaves.length + ' nichos somados)' : '') + '</div>'
        + '<div class="fat">Faturamento: <b>' + brl(totalFat) + '/mês</b></div>'
        + '<div class="lucro-total">' + brl(totalLucro) + '</div>'
        + '<div class="lucro-lbl">de LUCRO estimado por mês</div>'
      + '</div>'
      + '<div class="il-disc">Projeção estimada com base em médias de mercado (ticket, custo do produto e investimento em anúncios). '
        + 'Resultados variam conforme execução, operação e sazonalidade.</div>';
  }

  // O Inlead é um app dinâmico (SPA): a tela final só entra no DOM quando o
  // lead chega nela. Então ficamos "de vigia" e renderizamos assim que o
  // #il-resultado aparecer — via MutationObserver + um polling de segurança.
  function start() {
    render();
    var obs = new MutationObserver(function () { render(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    var tentativas = 0;
    var iv = setInterval(function () {
      render();
      if (++tentativas > 120) clearInterval(iv); // desiste após ~60s
    }, 500);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else
    start();
})();
