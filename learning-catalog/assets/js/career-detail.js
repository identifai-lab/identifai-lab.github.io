/* =====================================================================
   career-detail.js — career.html?id=◯◯（キャリアごとの推奨トレーニング）
   ===================================================================== */
(function(){
  "use strict";
  const { esc, el, icon, fmtDuration, contentById, careerById, card, labelOf } = Site;
  Site.initChrome("careers");

  const host = document.getElementById("career");
  const c = careerById(Site.param("id"));

  if(!c){
    host.innerHTML = '<div class="empty"><h3>キャリアパスが見つかりません</h3>'
      + '<p>URL をご確認ください。一覧から選び直せます。</p>'
      + '<a class="btn btn-ghost" href="careers.html">キャリア一覧へ戻る</a></div>';
    return;
  }

  document.title = c.title + "のキャリアパス | " + BRAND.name;

  const stageItems = s => s.contents.map(contentById).filter(Boolean);
  const allItems = [...new Set(c.stages.flatMap(s => s.contents))].map(contentById).filter(Boolean);
  const totalMins = allItems.reduce((n,i) => n + i.duration, 0);

  /* ---- ヒーロー ---- */
  const hero =
    '<section class="career-hero">'
    + '<p class="eyebrow">キャリアパス</p>'
    + '<h1>'+esc(c.title)+'</h1>'
    + '<p>'+esc(c.summary)+'</p>'
    + '<dl class="hero-stats">'
    +   '<div><dt>学習ステップ</dt><dd>'+c.stages.length+'</dd></div>'
    +   '<div><dt>推奨研修</dt><dd>'+allItems.length+' 件</dd></div>'
    +   '<div><dt>合計の目安</dt><dd>'+esc(fmtDuration(totalMins))+'</dd></div>'
    + '</dl>'
    + '<div class="hero-actions">'
    +   '<a class="btn" href="#stages">推奨トレーニングを見る</a>'
    +   '<a class="btn btn-outline" href="index.html?role='+encodeURIComponent(c.roleId)+'">この職務の研修を一覧で見る</a>'
    + '</div>'
    + '</section>';

  /* ---- 職務の説明 ---- */
  const about =
    '<div class="about-cols">'
    + '<section class="panel"><h2>主な業務</h2><ul class="check-list">'
    +   c.dayToDay.map(d => '<li>'+esc(d)+'</li>').join("") + '</ul></section>'
    + '<section class="panel"><h2>求められるスキル</h2><ul class="check-list">'
    +   c.skills.map(s => '<li>'+esc(s)+'</li>').join("") + '</ul></section>'
    + '</div>';

  /* ---- 学習ステップ ---- */
  const stagesHtml = c.stages.map((s,i) => {
    const items = stageItems(s);
    const mins = items.reduce((n,x) => n + x.duration, 0);
    return '<div class="stage">'
      + '<span class="stage-num">'+(i+1)+'</span>'
      + '<h3>'+esc(s.title)+'</h3>'
      + '<p class="stage-desc">'+esc(s.desc)+'</p>'
      + '<p class="stage-meta">研修 '+items.length+' 件 / '+esc(fmtDuration(mins))+'</p>'
      + '<div class="grid" data-stage="'+i+'"></div>'
      + '</div>';
  }).join("");

  const stagesSection =
    '<section class="section" id="stages">'
    + '<h2 class="stage-head">推奨トレーニング</h2>'
    + '<p class="stage-lead">上から順に進めることを想定しています。すでに実務経験がある領域は飛ばして構いません。</p>'
    + stagesHtml + '</section>';

  /* ---- 認定 ---- */
  const certs = (c.certifications || []).length
    ? '<section class="section"><h2>到達の目安</h2>'
      + '<p class="lead">各ステップを終えたあとに、実務課題で確認します。</p>'
      + '<div class="cert-list">'
      + c.certifications.map(x => '<div class="cert"><h3>'+esc(x.name)+'</h3><p>'+esc(x.desc)+'</p></div>').join("")
      + '</div></section>'
    : "";

  /* ---- 関連キャリア ---- */
  const nextList = (c.next || []).map(careerById).filter(Boolean);
  const nextSection = nextList.length
    ? '<section class="section"><h2>次に目指せるキャリア</h2>'
      + '<div class="next-careers">'
      + nextList.map(n => '<a href="career.html?id='+encodeURIComponent(n.id)+'">'
        + '<span class="icon-tile">'+icon(n.icon,16)+'</span>'+esc(n.title)+'</a>').join("")
      + '</div></section>'
    : "";

  host.innerHTML =
    '<nav class="crumbs"><a href="careers.html">キャリアから探す</a><span>/</span>'+esc(c.title)+'</nav>'
    + hero + about + stagesSection + certs + nextSection;

  /* ステップごとのカードを差し込む */
  c.stages.forEach((s,i) => {
    const grid = host.querySelector('[data-stage="'+i+'"]');
    stageItems(s).forEach(item => grid.appendChild(card(item)));
  });
})();
