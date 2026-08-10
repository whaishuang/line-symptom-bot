// ============================================================
// config.js — 對照組（控制組）
// 放置路徑：whaishuang.github.io/line-symptom-bot/control/config.js
//
// 對照組功能：問卷、個管師資料、衛教（無症狀回報、無生命徵象、無我的記錄）
//
// 填入說明：
//   1. 先在 LINE Developers Console 建立對照組 LINE Channel
//   2. 在該 Channel 下建立所需 LIFF（survey、consent、contact）
//   3. 把新的 GAS 部署網址和 LIFF ID 填入下方
// ============================================================

const SITE_CONFIG = {

  // ── GAS 部署網址 ────────────────────────────────────────────
  // 對照組專屬 GAS，從對照組試算表的「擴充功能 → Apps Script」部署
  // 部署後在「管理部署作業」複製網路應用程式網址貼在這裡
  GAS_URL: 'https://script.google.com/macros/s/AKfycbwyPDrxDM8z-DRsd5GQjq1sKPhBGxoCqzVtQQAcetkXjcWP0_4k-3V0N_BO0KDeeYX_/exec',        // ← 填入對照組 GAS 部署網址

  // ── LIFF ID ─────────────────────────────────────────────────
  // 對照組不使用的頁面留空字串即可（不會被呼叫到）
  //
  LIFF_SYMPTOM:  '',                       // 對照組不使用（無症狀回報頁面）
  LIFF_VITALS:   '',                       // 對照組不使用（無生命徵象頁面）
  LIFF_RECORDS:  '',                       // 對照組不使用（無我的記錄頁面）

  // 以下三個需要在對照組 LINE Channel 下各建立一個 LIFF：
  // LINE Developers → 你的 Provider → 對照組 Channel → LIFF → 新增
  // Endpoint URL 分別填入：
  //   https://whaishuang.github.io/line-symptom-bot/control/survey.html
  //   https://whaishuang.github.io/line-symptom-bot/control/consent.html
  //   https://whaishuang.github.io/line-symptom-bot/control/contact.html
  //
  LIFF_SURVEY:   '2010034796-uM2gpnem',  // ← 建立後填入（格式：xxxxxxxx-xxxxxxxx）
  LIFF_CONSENT:  '2010034796-jO5jUcev', // ← 建立後填入
  LIFF_CONTACT:  '2010034796-WyoYQdw4', // ← 建立後填入

};

// Compatibility helper for pages that send parameters as an object.
function gasFetch(params) {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    query.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  });
  return fetch(`${SITE_CONFIG.GAS_URL}?${query.toString()}`);
}

// Every LIFF request to GAS must include the signed LINE ID token.
// Keeping this in config.js protects all existing LIFF pages without duplicating code.
(function installLiffTokenFetch_() {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    const rawUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    if (!rawUrl || !rawUrl.startsWith(SITE_CONFIG.GAS_URL) || !window.liff || typeof window.liff.getIDToken !== 'function') {
      return nativeFetch(input, init);
    }
    const idToken = window.liff.getIDToken();
    const accessToken = typeof window.liff.getAccessToken === 'function' ? window.liff.getAccessToken() : '';
    if (!idToken && !accessToken) return nativeFetch(input, init);
    const url = new URL(rawUrl);
    if (!url.searchParams.has('idToken')) url.searchParams.set('idToken', idToken);
    if (!url.searchParams.has('accessToken')) url.searchParams.set('accessToken', accessToken);
    return nativeFetch(url.toString(), init);
  };
})();
