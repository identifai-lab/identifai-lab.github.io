/* =====================================================================
   catalog.js — index.html の絞り込み・検索・並び替え・ページ送り
   ===================================================================== */
(function(){
  "use strict";
  const { esc, el, labelOf, values, card, fmtDuration } = Site;
  const byId = id => document.getElementById(id);
  const GROUPS = FILTER_DEFS;

  const ORDER = {};
  GROUPS.forEach(g => { ORDER[g.id] = {}; g.options.forEach((o,i) => ORDER[g.id][o.id] = i); });

  const state = { q:"", sort:"default", page:1, sel:{} };
  GROUPS.forEach(g => state.sel[g.id] = new Set());

  /* --- URL（?role=...&q=...&page=2）との同期 --- */
  function readUrl(){
    const p = new URLSearchParams(location.search);
    state.q = p.get("q") || "";
    state.sort = p.get("sort") || "default";
    state.page = Math.max(1, parseInt(p.get("page"),10) || 1);
    GROUPS.forEach(g => state.sel[g.id] = new Set((p.get(g.id) || "").split(",").filter(Boolean)));
  }
  function writeUrl(){
    const p = new URLSearchParams();
    if(state.q) p.set("q", state.q);
    if(state.sort !== "default") p.set("sort", state.sort);
    if(state.page > 1) p.set("page", state.page);
    GROUPS.forEach(g => { if(state.sel[g.id].size) p.set(g.id, [...state.sel[g.id]].join(",")); });
    const s = p.toString();
    // file:// で直接開いた場合 replaceState は使えないため、失敗しても処理を止めない
    try{
      history.replaceState(null, "", s ? location.pathname + "?" + s : location.pathname);
    }catch(e){ /* ローカル表示時は URL を書き換えないだけ */ }
  }

  /* --- 絞り込み --- */
  function matches(item, skipGroupId){
    if(state.q){
      const hay = [item.title, item.summary,
        ...GROUPS.flatMap(g => values(item, g.field).map(v => labelOf(g.id, v)))].join(" ").toLowerCase();
      if(!hay.includes(state.q.toLowerCase())) return false;
    }
    for(const g of GROUPS){
      if(g.id === skipGroupId) continue;
      const sel = state.sel[g.id];
      if(!sel.size) continue;
      if(!values(item, g.field).some(v => sel.has(v))) return false;
    }
    return true;
  }
  const results = () => CONTENTS.filter(i => matches(i, null));

  function sorted(list){
    const arr = list.slice();
    const lv = i => Math.min(...values(i,"level").map(v => ORDER.level[v] ?? 99));
    switch(state.sort){
      case "title": arr.sort((a,b) => a.title.localeCompare(b.title, "ja")); break;
      case "short": arr.sort((a,b) => a.duration - b.duration); break;
      case "long":  arr.sort((a,b) => b.duration - a.duration); break;
      case "level": arr.sort((a,b) => lv(a) - lv(b) || a.duration - b.duration); break;
    }
    return arr;
  }

  /* --- フィルター欄 --- */
  function renderFilters(){
    const host = byId("filterGroups");
    if(!host.dataset.built){
      GROUPS.forEach(g => {
        const sec = el("section","fgroup");
        sec.dataset.open = g.open === false ? "false" : "true";
        sec.dataset.group = g.id;
        const bodyId = "fg-" + g.id;
        sec.innerHTML =
          '<button class="fgroup-btn" type="button" aria-expanded="true" aria-controls="'+bodyId+'">'
          + '<span>'+esc(g.label)+'</span>'
          + '<span class="chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>'
          + '</button><div class="fgroup-body" id="'+bodyId+'"></div>';
        sec.querySelector(".fgroup-btn").addEventListener("click", () => {
          const open = sec.dataset.open !== "false";
          sec.dataset.open = open ? "false" : "true";
          sec.querySelector(".fgroup-btn").setAttribute("aria-expanded", String(!open));
        });
        const body = sec.querySelector(".fgroup-body");
        g.options.forEach(o => {
          const lab = el("label","opt");
          lab.dataset.opt = o.id;
          lab.innerHTML = '<input type="checkbox" value="'+esc(o.id)+'">'
            + '<span class="opt-label">'+esc(o.label)+'</span><span class="opt-count">0</span>';
          lab.querySelector("input").addEventListener("change", e => {
            const set = state.sel[g.id];
            e.target.checked ? set.add(o.id) : set.delete(o.id);
            state.page = 1;
            render();
          });
          body.appendChild(lab);
        });
        host.appendChild(sec);
      });
      host.dataset.built = "1";
    }
    GROUPS.forEach(g => {
      const pool = CONTENTS.filter(i => matches(i, g.id));
      const sec = host.querySelector('[data-group="'+g.id+'"]');
      g.options.forEach(o => {
        const n = pool.filter(i => values(i, g.field).includes(o.id)).length;
        const lab = sec.querySelector('[data-opt="'+CSS.escape(o.id)+'"]');
        lab.querySelector(".opt-count").textContent = n;
        lab.classList.toggle("is-empty", n === 0 && !state.sel[g.id].has(o.id));
        lab.querySelector("input").checked = state.sel[g.id].has(o.id);
      });
    });
  }

  /* --- 選択中の条件 --- */
  function renderChips(){
    const host = byId("chips");
    host.innerHTML = "";
    let total = 0;
    GROUPS.forEach(g => state.sel[g.id].forEach(id => {
      total++;
      const chip = el("span","chip");
      chip.innerHTML = '<span>'+esc(g.label)+"："+esc(labelOf(g.id,id))+'</span>'
        + '<button type="button" aria-label="'+esc(labelOf(g.id,id))+' の絞り込みを外す">'
        + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';
      chip.querySelector("button").addEventListener("click", () => {
        state.sel[g.id].delete(id); state.page = 1; render();
      });
      host.appendChild(chip);
    }));
    byId("clearAll").disabled = total === 0 && !state.q;
    const badge = byId("filterBadge");
    badge.hidden = total === 0;
    badge.textContent = total;
  }

  /* --- 一覧とページ送り --- */
  function renderGrid(){
    const list = sorted(results());
    const grid = byId("grid"), pager = byId("pager");
    grid.innerHTML = ""; pager.innerHTML = "";

    if(!list.length){
      byId("count").innerHTML = "<b>0</b> 件";
      const e = el("div","empty");
      e.innerHTML = '<h3>条件に合う研修が見つかりません</h3><p>キーワードを短くするか、絞り込みを減らしてみてください。</p>';
      const b = el("button","btn btn-ghost"); b.type = "button"; b.textContent = "絞り込みをすべて解除";
      b.addEventListener("click", clearAll);
      e.appendChild(b); grid.appendChild(e); grid.style.display = "block";
      return;
    }

    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if(state.page > pages) state.page = pages;
    const from = (state.page - 1) * PAGE_SIZE;
    const shown = list.slice(from, from + PAGE_SIZE);

    byId("count").innerHTML = "<b>" + list.length + "</b> 件"
      + (CONTENTS.length !== list.length ? " / 全 " + CONTENTS.length + " 件" : "")
      + (pages > 1 ? '<span class="range">（'+(from+1)+"〜"+(from+shown.length)+" 件を表示）</span>" : "");

    grid.style.display = "";
    shown.forEach(i => grid.appendChild(card(i)));
    if(pages > 1) renderPager(pages);
  }

  function pageNumbers(total, cur){
    const out = [];
    for(let n = 1; n <= total; n++){
      if(n === 1 || n === total || Math.abs(n - cur) <= 1) out.push(n);
      else if(out[out.length-1] !== "gap") out.push("gap");
    }
    return out;
  }
  function goPage(n){
    state.page = n;
    render();
    const top = byId("grid").getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top:Math.max(0, top), behavior:"smooth" });
  }
  function renderPager(pages){
    const pager = byId("pager");
    const arrow = d => '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
      + (d === "prev" ? '<path d="M15 5.5 8 12l7 6.5"/>' : '<path d="m9 5.5 7 6.5-7 6.5"/>') + '</svg>';

    const prev = el("button"); prev.type = "button";
    prev.innerHTML = arrow("prev") + "<span>前へ</span>";
    prev.disabled = state.page === 1;
    prev.setAttribute("aria-label","前のページ");
    prev.addEventListener("click", () => goPage(state.page - 1));
    pager.appendChild(prev);

    pageNumbers(pages, state.page).forEach(n => {
      if(n === "gap"){ const g = el("span","gap"); g.textContent = "…"; pager.appendChild(g); return; }
      const b = el("button"); b.type = "button"; b.textContent = n;
      b.setAttribute("aria-label", n + " ページ目");
      if(n === state.page) b.setAttribute("aria-current","page");
      else b.addEventListener("click", () => goPage(n));
      pager.appendChild(b);
    });

    const next = el("button"); next.type = "button";
    next.innerHTML = "<span>次へ</span>" + arrow("next");
    next.disabled = state.page === pages;
    next.setAttribute("aria-label","次のページ");
    next.addEventListener("click", () => goPage(state.page + 1));
    pager.appendChild(next);
  }

  function render(){ renderFilters(); renderChips(); renderGrid(); writeUrl(); }

  function clearAll(){
    state.q = ""; state.page = 1;
    byId("q").value = "";
    byId("clearQ").classList.remove("on");
    GROUPS.forEach(g => state.sel[g.id].clear());
    render();
  }

  /* --- 入力 --- */
  let timer;
  byId("q").addEventListener("input", e => {
    state.q = e.target.value.trim();
    state.page = 1;
    byId("clearQ").classList.toggle("on", !!e.target.value);
    clearTimeout(timer);
    timer = setTimeout(render, 160);
  });
  byId("clearQ").addEventListener("click", () => {
    state.q = ""; state.page = 1; byId("q").value = "";
    byId("clearQ").classList.remove("on");
    render(); byId("q").focus();
  });
  byId("sort").addEventListener("change", e => { state.sort = e.target.value; state.page = 1; render(); });
  byId("clearAll").addEventListener("click", clearAll);

  /* --- モバイルのフィルター開閉 --- */
  const panel = byId("filters");
  let scrim = null;
  function closePanel(){ panel.dataset.mobileOpen = "false"; if(scrim){ scrim.remove(); scrim = null; } }
  byId("filterToggle").addEventListener("click", () => {
    if(panel.dataset.mobileOpen === "true"){ closePanel(); return; }
    panel.dataset.mobileOpen = "true";
    scrim = el("div","scrim");
    scrim.addEventListener("click", closePanel);
    document.body.appendChild(scrim);
  });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closePanel(); });
  window.addEventListener("resize", () => { if(window.innerWidth > 860) closePanel(); });

  /* --- 起動 --- */
  Site.initChrome("catalog");
  readUrl();
  byId("q").value = state.q;
  byId("clearQ").classList.toggle("on", !!state.q);
  byId("sort").value = state.sort;
  render();
})();
