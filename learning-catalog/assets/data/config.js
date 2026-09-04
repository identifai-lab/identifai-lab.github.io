/* =====================================================================
   config.js — サイト名 / アイコン / フィルター項目
   ここを編集すれば全ページに反映されます。
   ===================================================================== */

/* ---- サイト情報 --------------------------------------------------- */
const BRAND = {
  name: "ラーニングカタログ",
  sub:  "現場で使える研修を探す",
  footer: "社内向け教育コンテンツのカタログ（サンプルデータ）"
};

/* ---- 1ページに並べるカードの枚数 ---------------------------------- */
const PAGE_SIZE = 15;

/* ---- アイコン ------------------------------------------------------
   追加するときは { キー: { label:"表示名", svg:"<path .../>" } } を足すだけ。
   svg は viewBox="0 0 24 24" 前提の線画を書きます。                    */
const ICONS = {
  ai:       { label:"AI・機械学習", svg:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.2 5.2 8 8M16 16l2.8 2.8M18.8 5.2 16 8M8 16l-2.8 2.8"/>' },
  chat:     { label:"対話・プロンプト", svg:'<path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 4V6.5A2.5 2.5 0 0 1 7 4h10.5A2.5 2.5 0 0 1 20 6.5z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>' },
  code:     { label:"開発・コード", svg:'<path d="M9.5 7 4.5 12l5 5M14.5 7l5 5-5 5"/>' },
  cloud:    { label:"クラウド", svg:'<path d="M6.8 18.5a4.3 4.3 0 0 1-.4-8.6 6 6 0 0 1 11.6-.4 4.5 4.5 0 0 1-.6 9z"/>' },
  data:     { label:"データ", svg:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>' },
  security: { label:"セキュリティ", svg:'<path d="M12 3 5.5 5.6v5.9c0 4 2.8 7.7 6.5 8.9 3.7-1.2 6.5-4.9 6.5-8.9V5.6z"/><path d="m9.3 12 2 2 3.6-3.8"/>' },
  flow:     { label:"プロセス・設計", svg:'<rect x="3" y="4" width="7.5" height="5" rx="1.2"/><rect x="13.5" y="15" width="7.5" height="5" rx="1.2"/><path d="M6.8 9v6.5a2 2 0 0 0 2 2h4.7"/>' },
  docs:     { label:"ドキュメント", svg:'<path d="M14 3H7.5a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z"/><path d="M14 3v4h4M9.5 12.5h5M9.5 16h3.5"/>' },
  legacy:   { label:"レガシー・基盤", svg:'<rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M8 21h8M12 16.5V21M7 8.5h3.5M7 11.5h6"/>' },
  team:     { label:"チーム・人材", svg:'<circle cx="9.2" cy="8" r="3.2"/><path d="M3.2 20c0-3.4 2.7-5.2 6-5.2s6 1.8 6 5.2"/><path d="M16.2 5.4a3.2 3.2 0 0 1 0 5.9M17.8 15c2.2.7 3.4 2.3 3.4 5"/>' },
  chart:    { label:"分析・可視化", svg:'<path d="M4 20V10.5M10 20V4.5M16 20v-6.5M2.5 20h19"/>' },
  test:     { label:"品質・テスト", svg:'<rect x="4.5" y="3.5" width="15" height="17" rx="2"/><path d="m8.5 10.5 2 2 4-4.2M8.5 16h7"/>' },
  book:     { label:"業務知識", svg:'<path d="M4.5 5.2A2.2 2.2 0 0 1 6.7 3H19.5v15.5H6.7a2.2 2.2 0 0 0-2.2 2.2z"/><path d="M19.5 18.5H6.9"/>' },
  rocket:   { label:"実践・演習", svg:'<path d="M12 3c3 2.2 4.8 5.6 4.8 9.3L12 16.6l-4.8-4.3C7.2 8.6 9 5.2 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="m9.4 16.4-2 4.1 3.5-1.7M14.6 16.4l2 4.1-3.5-1.7"/>' },
  tools:    { label:"運用・管理", svg:'<path d="M14.8 3.6a4.6 4.6 0 0 1 5.6 5.9l-9.9 9.9a2.6 2.6 0 0 1-3.7-3.7l9.9-9.9a4.6 4.6 0 0 1-1.9-2.2z"/><circle cx="7.5" cy="16.5" r="1"/>' }
};

/* ---- フィルター定義 ------------------------------------------------
   ・グループを足せば、絞り込み欄・チップ・詳細のメタ情報が自動で増えます
   ・field は contents.js 側のキー名。値は必ず配列で持たせてください
   ・option の id を contents.js から参照します                          */
const FILTER_DEFS = [
  {
    id:"role", field:"role", label:"ロール", open:true,
    options:[
      { id:"developer",     label:"開発者" },
      { id:"ai-engineer",   label:"AI エンジニア" },
      { id:"pm",            label:"プロジェクトマネージャー" },
      { id:"data-engineer", label:"データエンジニア" },
      { id:"it-admin",      label:"情報システム担当" },
      { id:"consultant",    label:"業務コンサルタント" }
    ]
  },
  {
    id:"level", field:"level", label:"レベル", open:true,
    options:[
      { id:"beginner",     label:"初級" },
      { id:"intermediate", label:"中級" },
      { id:"advanced",     label:"上級" }
    ]
  },
  {
    id:"type", field:"type", label:"種類", open:true,
    options:[
      { id:"path",     label:"ラーニングパス" },
      { id:"module",   label:"モジュール" },
      { id:"handson",  label:"ハンズオン" },
      { id:"exercise", label:"演習" },
      { id:"video",    label:"動画" }
    ]
  },
  {
    id:"subject", field:"subject", label:"サブジェクト", open:true,
    options:[
      { id:"genai",    label:"生成AI" },
      { id:"appdev",   label:"アプリケーション開発" },
      { id:"legacy",   label:"レガシー刷新" },
      { id:"quality",  label:"品質保証" },
      { id:"pm",       label:"プロジェクト管理" },
      { id:"data",     label:"データ活用" },
      { id:"security", label:"セキュリティ" },
      { id:"cloud",    label:"クラウド" },
      { id:"domain",   label:"業務ドメイン" }
    ]
  }
];
