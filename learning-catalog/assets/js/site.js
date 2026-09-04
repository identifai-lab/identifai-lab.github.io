/* =====================================================================
   site.js — 全ページ共通の処理（通常は編集不要）
   データファイル（config.js / contents.js / careers.js）より後に読み込みます。
   ===================================================================== */
(function(global){
  "use strict";

  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const el = (tag, cls) => { const n = document.createElement(tag); if(cls) n.className = cls; return n; };

  const labelOf = (groupId, optId) => {
    const g = FILTER_DEFS.find(x => x.id === groupId);
    const o = g && g.options.find(x => x.id === optId);
    return o ? o.label : optId;
  };
  const values = (item, field) => Array.isArray(item[field]) ? item[field] : (item[field] ? [item[field]] : []);

  const icon = (id, size) => {
    const ic = ICONS[id] || ICONS[Object.keys(ICONS)[0]];
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
      + 'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ic.svg + '</svg>';
  };
  const clockIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';

  const fmtDuration = m => {
    const h = Math.floor(m/60), r = m%60;
    if(h && r) return h + " 時間 " + r + " 分";
    if(h) return h + " 時間";
    return m + " 分";
  };

  const contentById = id => CONTENTS.find(c => c.id === id);
  const careerById  = id => (typeof CAREERS !== "undefined") ? CAREERS.find(c => c.id === id) : null;
  const param = name => new URLSearchParams(location.search).get(name);

  /* 研修カード（一覧・キャリアパスの両方で使用） */
  function card(item){
    const a = el("a","card");
    a.href = "content.html?id=" + encodeURIComponent(item.id);
    const kinds = values(item,"type").map(t => labelOf("type", t)).join("／");
    const lv = values(item,"level")[0] || "beginner";
    const subjects = values(item,"subject")
      .map(s => '<span class="subject-tag">' + esc(labelOf("subject", s)) + '</span>').join("");
    a.innerHTML =
      '<div class="card-top">'
      +   '<span class="icon-tile">' + icon(item.icon, 22) + '</span>'
      +   '<span><span class="card-kind">'+esc(kinds)+'</span><h3 class="card-title">'+esc(item.title)+'</h3></span>'
      + '</div>'
      + '<p class="card-desc">'+esc(item.summary)+'</p>'
      + (subjects ? '<div class="card-subjects">'+subjects+'</div>' : "")
      + '<div class="card-foot">'
      +   '<span class="dur">' + clockIcon + esc(fmtDuration(item.duration)) + '</span>'
      +   '<span class="level level-'+esc(lv)+'">'+esc(labelOf("level", lv))+'</span>'
      + '</div>';
    return a;
  }

  /* ヘッダー・フッターにサイト名を反映し、現在ページを示す */
  function initChrome(current){
    document.querySelectorAll("[data-brand-name]").forEach(n => n.textContent = BRAND.name);
    document.querySelectorAll("[data-brand-sub]").forEach(n => n.textContent = BRAND.sub);
    document.querySelectorAll("[data-brand-footer]").forEach(n => n.textContent = BRAND.footer);
    document.querySelectorAll(".site-nav a").forEach(a => {
      if(a.dataset.nav === current) a.setAttribute("aria-current","page");
    });
  }

  global.Site = { esc, el, labelOf, values, icon, clockIcon, fmtDuration, contentById, careerById, param, card, initChrome };
})(window);
