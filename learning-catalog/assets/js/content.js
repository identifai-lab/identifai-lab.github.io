/* =====================================================================
   content.js — content.html?id=◯◯ の詳細表示
   ===================================================================== */
(function(){
  "use strict";
  const { esc, labelOf, values, icon, fmtDuration, contentById } = Site;
  Site.initChrome("catalog");

  const host = document.getElementById("detail");
  const item = contentById(Site.param("id"));

  if(!item){
    host.innerHTML = '<div class="empty"><h3>研修が見つかりません</h3>'
      + '<p>URL が正しいかご確認ください。一覧から選び直すこともできます。</p>'
      + '<a class="btn btn-ghost" href="index.html">研修一覧へ戻る</a></div>';
    return;
  }

  document.title = item.title + " | " + BRAND.name;

  const metaRow = FILTER_DEFS.map(g =>
    '<div><dt>'+esc(g.label)+'</dt><dd>'
    + values(item, g.field).map(v => esc(labelOf(g.id, v))).join("、") + '</dd></div>').join("");

  const units = (item.units || []).map(u =>
    '<li><div><span class="unit-title">'+esc(u.title)+'</span>'
    + (u.desc ? '<p class="unit-desc">'+esc(u.desc)+'</p>' : "")
    + '</div><span class="unit-dur">'+esc(fmtDuration(u.duration))+'</span></li>').join("");

  const outcomes = (item.outcomes || []).map(o => '<li>'+esc(o)+'</li>').join("");
  const pre = (item.prerequisites || []).map(p => '<li>'+esc(p)+'</li>').join("");

  const tags = FILTER_DEFS.flatMap(g => values(item, g.field).map(v =>
    '<a class="tag" href="index.html?'+encodeURIComponent(g.id)+'='+encodeURIComponent(v)+'">'
    + esc(labelOf(g.id,v)) + '</a>')).join("");

  const subjects = values(item,"subject");
  const related = CONTENTS.filter(i => i.id !== item.id && values(i,"subject").some(s => subjects.includes(s))).slice(0,4);
  const relatedHtml = related.map(r =>
    '<li><a href="content.html?id='+encodeURIComponent(r.id)+'">'
    + '<span class="icon-tile">'+icon(r.icon,17)+'</span>'
    + '<span><span class="mini-title">'+esc(r.title)+'</span>'
    + '<span class="mini-meta">'+esc(fmtDuration(r.duration))+'</span></span></a></li>').join("");

  /* この研修を含むキャリアパス */
  const inCareers = (typeof CAREERS !== "undefined" ? CAREERS : []).filter(c =>
    c.stages.some(s => s.contents.includes(item.id)));
  const careerHtml = inCareers.map(c =>
    '<li><a href="career.html?id='+encodeURIComponent(c.id)+'">'
    + '<span class="icon-tile">'+icon(c.icon,17)+'</span>'
    + '<span><span class="mini-title">'+esc(c.title)+'</span>'
    + '<span class="mini-meta">キャリアパス</span></span></a></li>').join("");

  host.innerHTML =
    '<nav class="crumbs"><a href="index.html">研修を探す</a><span>/</span>'+esc(item.title)+'</nav>'
    + '<div class="detail-hero">'
    +   '<span class="icon-tile">'+icon(item.icon,32)+'</span>'
    +   '<div><span class="card-kind">'+values(item,"type").map(t => esc(labelOf("type",t))).join("／")+'</span>'
    +     '<h1>'+esc(item.title)+'</h1>'
    +     '<p class="detail-lead">'+esc(item.summary)+'</p>'
    +     '<dl class="meta-list"><div><dt>所要時間</dt><dd>'+esc(fmtDuration(item.duration))+'</dd></div>'+metaRow+'</dl>'
    +   '</div>'
    + '</div>'
    + '<div class="detail-cols"><div>'
    +   (outcomes ? '<section class="panel"><h2>この研修で身につくこと</h2><ul class="check-list">'+outcomes+'</ul></section>' : "")
    +   (units ? '<section class="panel"><h2>学習内容</h2><ul class="units">'+units+'</ul></section>' : "")
    + '</div><div>'
    +   (pre ? '<section class="aside-card"><h2>前提条件</h2><ul class="check-list">'+pre+'</ul></section>' : "")
    +   '<section class="aside-card"><h2>この研修のタグ</h2><div class="tag-row">'+tags+'</div></section>'
    +   (careerHtml ? '<section class="aside-card"><h2>含まれるキャリアパス</h2><ul class="mini-list">'+careerHtml+'</ul></section>' : "")
    +   (relatedHtml ? '<section class="aside-card"><h2>関連する研修</h2><ul class="mini-list">'+relatedHtml+'</ul></section>' : "")
    + '</div></div>';
})();
