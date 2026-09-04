/* =====================================================================
   contents.js — 教育コンテンツ
   1件の書き方：
     id            URL に使う一意な文字列（content.html?id=◯◯ になります）
     title         教育名
     duration      所要時間（分）。表示は「3 時間 20 分」に自動変換
     icon          config.js の ICONS のキー
     role/level/type/subject   config.js の option id を配列で
     summary       カードと詳細に出る説明文
     outcomes      受講後にできること
     units         詳細ページの章立て
     prerequisites 前提条件
   ===================================================================== */
const CONTENTS = [
  {
    id:"genai-basics", title:"生成AIの基礎と業務での使いどころ", duration:200, icon:"ai",
    role:["developer","consultant","it-admin"], level:["beginner"], type:["path"], subject:["genai"],
    summary:"大規模言語モデルの仕組みを最低限の用語で押さえ、自分の業務のどこに使えて、どこは任せてはいけないのかを判断できるようにします。",
    outcomes:["生成AIが得意な作業と苦手な作業を切り分けて説明できる","業務プロセスから適用候補を洗い出せる","社内利用時に気をつける情報の扱いを判断できる"],
    units:[
      { title:"言語モデルは何をしているのか", duration:35, desc:"確率で次の語を選ぶという仕組みから、得意・不得意の理由を理解します。" },
      { title:"業務適用パターンの棚卸し", duration:60, desc:"要約・分類・下書き・変換の4パターンで自部門の業務を並べ替えます。" },
      { title:"任せてよい作業の線引き", duration:45, desc:"確認コストと失敗時の影響から、適用可否を決める基準をつくります。" },
      { title:"小さく始める計画づくり", duration:60, desc:"1か月で結果が見える範囲に絞った導入計画を作成します。" }
    ],
    prerequisites:["前提知識は不要です"]
  },
  {
    id:"prompt-design", title:"プロンプト設計の型を身につける", duration:90, icon:"chat",
    role:["ai-engineer","consultant","developer"], level:["beginner"], type:["module"], subject:["genai"],
    summary:"思いつきで書いた指示と、再現性のある指示は何が違うのか。役割・制約・出力形式・評価基準を分けて書く型を、手を動かしながら覚えます。",
    outcomes:["同じ品質の出力を繰り返し得られる指示が書ける","出力形式を指定して後工程で機械処理できる","うまくいかない指示の原因を切り分けられる"],
    units:[
      { title:"指示を4つの部品に分ける", duration:25, desc:"役割・入力・制約・出力形式に分解して書き直します。" },
      { title:"例示で精度を上げる", duration:30, desc:"良い例と悪い例を添えるときの数と粒度を確かめます。" },
      { title:"崩れた出力を直す", duration:35, desc:"失敗パターンを分類し、指示のどこを直すか判断します。" }
    ],
    prerequisites:["生成AIツールを一度でも触ったことがあること"]
  },
  {
    id:"ai-driven-dev", title:"AI駆動開発のワークフロー入門", duration:260, icon:"code",
    role:["developer","ai-engineer"], level:["intermediate"], type:["path"], subject:["genai","appdev"],
    summary:"設計から実装、レビューまでを生成AIと分担する進め方を扱います。人が決めることと、AIに任せることの境界を工程ごとに決めていきます。",
    outcomes:["工程ごとにAIの担当範囲を設計できる","AIに渡す前提情報を過不足なく用意できる","従来型の開発手順との差分を説明できる"],
    units:[
      { title:"工程を分解して担当を決める", duration:60, desc:"要件定義から結合テストまでを並べ、任せられる作業を選びます。" },
      { title:"コンテキストの準備", duration:70, desc:"仕様・規約・既存コードのどこまでを渡すかを決めます。" },
      { title:"実装ループの回し方", duration:70, desc:"生成、確認、修正の粒度を小さく保つ手順を練習します。" },
      { title:"チームで運用する", duration:60, desc:"手順とプロンプトを資産として共有する方法を検討します。" }
    ],
    prerequisites:["いずれかの言語での開発経験","Git の基本操作"]
  },
  {
    id:"quality-gate", title:"AI生成コードの品質ゲート設計", duration:120, icon:"test",
    role:["developer","pm"], level:["intermediate"], type:["module"], subject:["quality","appdev"],
    summary:"生成量が増えるほどレビューが詰まります。人が全部読む前提をやめ、どこで何を止めるかを決める品質ゲートの設計方法を扱います。",
    outcomes:["工程ごとの合否基準を文章で定義できる","自動チェックと目視レビューの担当を分けられる","レビュー観点表を自チーム向けに作成できる"],
    units:[
      { title:"止める場所を決める", duration:35, desc:"手戻りコストが跳ね上がる地点をゲートとして選びます。" },
      { title:"観点表をつくる", duration:45, desc:"仕様適合・可読性・セキュリティなど観点を分類します。" },
      { title:"自動化できる検査を切り出す", duration:40, desc:"静的解析やテストに任せる範囲を決めます。" }
    ],
    prerequisites:["コードレビューの実務経験"]
  },
  {
    id:"rag-context", title:"RAG構成とコンテキスト設計", duration:300, icon:"data",
    role:["ai-engineer","data-engineer"], level:["advanced"], type:["path"], subject:["genai","data"],
    summary:"社内文書を検索して回答させる仕組みを、精度が出ない原因から逆算して設計します。分割、埋め込み、検索、再ランキングまでを一通り扱います。",
    outcomes:["文書の分割方針を根拠を持って決められる","検索結果の質を数値で評価できる","精度が出ないときの調査手順を持てる"],
    units:[
      { title:"文書を分割する", duration:70, desc:"章立てと文脈の切れ目を考慮した分割方針を比較します。" },
      { title:"検索と再ランキング", duration:80, desc:"全文検索とベクトル検索の併用と、順位付けの調整を行います。" },
      { title:"評価データセットを作る", duration:70, desc:"想定質問と正解文書の組を用意して数値で比べます。" },
      { title:"更新と運用", duration:80, desc:"文書更新時の再構築と、鮮度の担保方法を設計します。" }
    ],
    prerequisites:["Python の基本文法","API 呼び出しの経験"]
  },
  {
    id:"cobol-assessment", title:"COBOL資産の可視化と移行計画", duration:340, icon:"legacy",
    role:["developer","pm"], level:["intermediate"], type:["path"], subject:["legacy"],
    summary:"何本あるか分からない状態から始めて、資産の棚卸し、移行方式の選定、段階リリース計画までを組み立てます。見積りの根拠づくりに重点を置きます。",
    outcomes:["資産の分類と依存関係を整理できる","移行方式の選択理由を説明できる","段階移行の区切り方を計画できる"],
    units:[
      { title:"資産を数え上げる", duration:80, desc:"プログラム、JCL、コピー句を分類して一覧化します。" },
      { title:"依存関係を追う", duration:80, desc:"呼び出し関係とデータの流れを図に落とします。" },
      { title:"移行方式を選ぶ", duration:90, desc:"書き換え、再構築、現状維持の判断基準を整理します。" },
      { title:"段階リリース計画", duration:90, desc:"並行稼働と切り戻しを含めた計画を作成します。" }
    ],
    prerequisites:["基幹システムの開発または運用の経験"]
  },
  {
    id:"batch-redesign", title:"Spring Batchで学ぶバッチ再設計", duration:240, icon:"flow",
    role:["developer"], level:["advanced"], type:["handson"], subject:["legacy","appdev"],
    summary:"順次処理で書かれたバッチを、リスタート可能な構造に組み替えます。実際に動くコードを書きながら、性能と再実行性の折り合いを確かめます。",
    outcomes:["ジョブとステップの粒度を判断できる","異常終了からの再実行を設計できる","チャンクサイズの調整で処理時間を改善できる"],
    units:[
      { title:"既存処理を読み解く", duration:60, desc:"入出力と中間ファイルの流れを整理します。" },
      { title:"ジョブに組み替える", duration:90, desc:"ステップ分割とトランザクション境界を決めて実装します。" },
      { title:"再実行と性能調整", duration:90, desc:"リスタートを試し、チャンクサイズを変えて計測します。" }
    ],
    prerequisites:["Java の開発経験","バッチ処理の運用イメージ"]
  },
  {
    id:"requirements-ai", title:"要件定義ドキュメントをAIで整える", duration:110, icon:"docs",
    role:["consultant","pm"], level:["intermediate"], type:["module"], subject:["pm","genai"],
    summary:"ヒアリングのメモから要件一覧へ落とすまでの下書き作業を効率化します。抜け漏れの指摘や表現の統一といった、機械が得意な部分を任せる進め方です。",
    outcomes:["メモから要件一覧の下書きを短時間で作れる","抜けている観点を洗い出せる","表記ゆれを統一できる"],
    units:[
      { title:"メモを構造化する", duration:35, desc:"箇条書きのメモを機能・非機能に分けて整理します。" },
      { title:"抜け漏れを点検する", duration:40, desc:"観点リストと突き合わせて不足を指摘させます。" },
      { title:"文書として仕上げる", duration:35, desc:"用語統一と体裁調整を行い、レビューに回せる状態にします。" }
    ],
    prerequisites:["要件定義工程への参加経験"]
  },
  {
    id:"pm-basics", title:"プロジェクト計画とリスク管理の型", duration:180, icon:"team",
    role:["pm","consultant"], level:["beginner"], type:["path"], subject:["pm"],
    summary:"計画書が形式だけの資料にならないよう、進捗の判断に使える粒度で作ります。リスクの拾い方と、対応を決めるまでの手順を扱います。",
    outcomes:["成果物基準で進捗を判断できる計画を作れる","リスクを影響と発生確率で並べられる","遅延の兆候を早く見つけられる"],
    units:[
      { title:"成果物から計画を組む", duration:60, desc:"作業ではなく成果物を単位にして工程を並べます。" },
      { title:"リスクを洗い出す", duration:60, desc:"過去案件の失敗パターンから候補を出して評価します。" },
      { title:"進捗を見る仕組み", duration:60, desc:"報告の頻度と内容を決め、判断できる形にします。" }
    ],
    prerequisites:["前提知識は不要です"]
  },
  {
    id:"life-insurance-domain", title:"生命保険の業務ドメイン入門", duration:210, icon:"book",
    role:["developer","consultant"], level:["beginner"], type:["path"], subject:["domain"],
    summary:"保険システムの開発に入る前に押さえておきたい用語と業務の流れを扱います。契約から支払いまでを一本の線でつなげて理解します。",
    outcomes:["契約から支払いまでの流れを説明できる","主要な用語を業務の文脈で理解できる","仕様書に出てくる前提を読み取れる"],
    units:[
      { title:"商品と契約のかたち", duration:70, desc:"主契約と特約、保険期間などの基本構造を整理します。" },
      { title:"新契約から保全へ", duration:70, desc:"申込、査定、成立、変更手続きの流れを追います。" },
      { title:"支払いの実務", duration:70, desc:"請求から支払査定までの判断と、システムの役割を確認します。" }
    ],
    prerequisites:["前提知識は不要です"]
  },
  {
    id:"pandc-overview", title:"損害保険システムの全体像", duration:60, icon:"docs",
    role:["consultant","pm"], level:["intermediate"], type:["video"], subject:["domain"],
    summary:"種目ごとに構造が違う損保システムを、契約管理、支払、代理店、会計の4領域に分けて俯瞰します。短時間で全体像をつかむための解説です。",
    outcomes:["主要サブシステムの役割を説明できる","種目ごとの違いの出どころが分かる","改修範囲の見当をつけられる"],
    units:[
      { title:"4つの領域に分ける", duration:20, desc:"契約、支払、代理店、会計それぞれの責務を確認します。" },
      { title:"種目による違い", duration:20, desc:"自動車、火災、傷害で構造が変わる理由を扱います。" },
      { title:"連携と締め処理", duration:20, desc:"領域間のデータ連携と日次・月次の締めを追います。" }
    ],
    prerequisites:["保険業界の基礎用語を知っていると理解が早まります"]
  },
  {
    id:"ai-governance", title:"社内AI活用のガバナンス設計", duration:100, icon:"security",
    role:["it-admin","pm"], level:["intermediate"], type:["module"], subject:["security","genai"],
    summary:"禁止事項を並べるだけの規程は使われません。利用者が判断に迷わない粒度で、入力してよい情報と申請が要る用途を決めていきます。",
    outcomes:["情報区分ごとの利用可否を定義できる","申請と承認の流れを設計できる","利用状況の点検方法を決められる"],
    units:[
      { title:"情報区分を決める", duration:30, desc:"扱う情報を分類し、区分ごとの取り扱いを決めます。" },
      { title:"利用ルールを書く", duration:35, desc:"具体例つきで、迷わず判断できる文面にします。" },
      { title:"運用と点検", duration:35, desc:"利用ログの確認と、ルール見直しの周期を決めます。" }
    ],
    prerequisites:["社内の情報管理規程を把握していること"]
  },
  {
    id:"m365-admin", title:"Microsoft 365 管理者の実務", duration:200, icon:"tools",
    role:["it-admin"], level:["intermediate"], type:["handson"], subject:["cloud","security"],
    summary:"ユーザー管理、権限設計、監査ログの確認までを実際の管理センター画面に沿って進めます。日々の問い合わせ対応で迷いやすい設定を中心に扱います。",
    outcomes:["グループと権限の設計方針を決められる","監査ログから状況を追える","よくある問い合わせを自力で解決できる"],
    units:[
      { title:"ユーザーとグループ", duration:70, desc:"命名規則と権限付与の単位を設計します。" },
      { title:"アクセス制御", duration:70, desc:"条件付きアクセスと多要素認証の設定を確認します。" },
      { title:"監査とレポート", duration:60, desc:"ログの探し方と、報告に使う集計方法を扱います。" }
    ],
    prerequisites:["Microsoft 365 の管理画面にアクセスできること"]
  },
  {
    id:"cloud-cost", title:"クラウド移行の見積りとコスト設計", duration:130, icon:"cloud",
    role:["it-admin","pm"], level:["advanced"], type:["module"], subject:["cloud"],
    summary:"移行後に費用が想定を超える原因の多くは、初期見積りの前提にあります。構成と利用量の両面から、根拠のある数字を組み立てます。",
    outcomes:["利用量の前提を明示した見積りを作れる","構成変更による費用影響を試算できる","運用開始後の監視項目を決められる"],
    units:[
      { title:"前提を数字にする", duration:40, desc:"処理量、保存量、通信量の見積り根拠を揃えます。" },
      { title:"構成案を比較する", duration:45, desc:"複数構成の費用と運用負荷を並べて比較します。" },
      { title:"超過を防ぐ運用", duration:45, desc:"予算アラートと定期的な見直しの仕組みを設計します。" }
    ],
    prerequisites:["クラウドサービスの基本用語を理解していること"]
  },
  {
    id:"data-quality", title:"データ品質とダッシュボード設計", duration:220, icon:"chart",
    role:["data-engineer","consultant"], level:["intermediate"], type:["path"], subject:["data"],
    summary:"見られないダッシュボードは、数字が信用されていないか、意思決定とつながっていないかのどちらかです。品質の担保と指標設計を合わせて扱います。",
    outcomes:["指標の定義を関係者と合意できる","品質チェックを処理に組み込める","判断に使える画面構成を設計できる"],
    units:[
      { title:"指標を定義する", duration:70, desc:"計算方法と対象範囲を文書化し、解釈のずれを防ぎます。" },
      { title:"品質を検査する", duration:75, desc:"欠損、重複、範囲外の値を検出する仕組みを組み込みます。" },
      { title:"画面を設計する", duration:75, desc:"誰が何を決めるかから逆算して構成を決めます。" }
    ],
    prerequisites:["SQL の基本操作","表計算ソフトでの集計経験"]
  },
  {
    id:"agent-exercise", title:"演習：問い合わせ対応エージェントを作る", duration:90, icon:"rocket",
    role:["ai-engineer","developer"], level:["advanced"], type:["exercise"], subject:["genai","appdev"],
    summary:"社内マニュアルを参照して回答するエージェントを、決められた要件に沿って実装する演習です。回答できない場合の振る舞いまで含めて設計します。",
    outcomes:["ツール呼び出しを含む処理を実装できる","回答不能時の挙動を設計できる","実装の妥当性を評価データで確認できる"],
    units:[
      { title:"要件を読んで設計する", duration:25, desc:"与えられた要件から処理の流れを決めます。" },
      { title:"実装する", duration:40, desc:"検索と回答生成をつなぎ、動作させます。" },
      { title:"評価と改善", duration:25, desc:"用意された質問セットで結果を確認し、調整します。" }
    ],
    prerequisites:["RAG構成とコンテキスト設計の受講、または同等の知識"]
  }
];
