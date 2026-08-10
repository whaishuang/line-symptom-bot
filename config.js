// ============================================================
// config.js — 實驗組（介入組）
// 放置路徑：whaishuang.github.io/line-symptom-bot/config.js
//
// 使用方式：
//   每個 HTML 頁面頂端已有 <script src="config.js"></script>
//   換組別只需替換此檔案，HTML 完全不用動
// ============================================================

const SITE_CONFIG = {

  // ── GAS 部署網址 ────────────────────────────────────────────
  // 在 GAS 專案 → 部署 → 管理部署作業 → 複製「網路應用程式」網址
  GAS_URL: 'https://script.google.com/macros/s/AKfycbx2nSmOjcKrcMpK9XwRHWz-JeUFfHCoNggMnIYHyKx7B_338N8XQk3stmXIQ1Ppj1Z25w/exec',

  // ── LIFF ID ─────────────────────────────────────────────────
  // 在 LINE Developers Console → 你的 Provider → Channel → LIFF 頁籤
  // 每個 LIFF 建立時會產生一組 ID，格式為 xxxxxxxx-xxxxxxxx
  //
  LIFF_SYMPTOM:  '2010034796-kIBFrrkM',   // symptom.html  （症狀回報）
  LIFF_VITALS:   '2010034796-J1whLo0G',   // vitals.html   （生命徵象）
  LIFF_RECORDS:  '2010034796-FdmhTXPK',   // records.html  （我的記錄）
  LIFF_SURVEY:   '2010034796-wo9weGMs',   // survey.html   （問卷填寫）
  LIFF_CONSENT:  '2010034796-myAIBrsg',   // consent.html  （研究同意書）
  LIFF_CONTACT:  '2010034796-HLZipXnc',  // contact.html  ← 填入 LIFF ID

};

// Compatibility helper for pages that send parameters as an object.
function gasFetch(params) {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    query.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  });
  return fetch(`${SITE_CONFIG.GAS_URL}?${query.toString()}`);
}
