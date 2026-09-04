/* =====================================================================
   career-list.js — careers.html（キャリアから探す）
   ===================================================================== */
(function(){
  "use strict";
  const { esc, icon, fmtDuration, contentById } = Site;
  Site.initChrome("careers");

  const host = document.getElementById("careerGrid");

  const totals = c => {
    const ids = c.stages.flatMap(s => s.contents);
    const uniq = [...new Set(ids)];
    const mins = uniq.reduce((sum,id) => sum + (contentById(id)?.duration || 0), 0);
    return { count:uniq.length, mins };
  };

  host.innerHTML = CAREERS.map(c => {
    const t = totals(c);
    return '<a class="career-card" href="career.html?id='+encodeURIComponent(c.id)+'">'
      + '<span class="icon-tile">'+icon(c.icon,26)+'</span>'
      + '<h2>'+esc(c.title)+'</h2>'
      + '<p>'+esc(c.tagline)+'</p>'
      + '<div class="career-facts">'
      +   '<span>ステップ <b>'+c.stages.length+'</b></span>'
      +   '<span>研修 <b>'+t.count+'</b> 件</span>'
      +   '<span>合計 <b>'+esc(fmtDuration(t.mins))+'</b></span>'
      + '</div></a>';
  }).join("");
})();
