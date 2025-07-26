// UI Theme Colors
// ここで全UI共通の色テーマを定義します。
// 例: import { UI_ThemeColors } from './UI_ThemeColors.js';

export const UI_ThemeColors = {
  background: '#f8f9fa', // 全体背景色  
  success: '#28a745',   // 成功・OK
  danger: '#e44',       // エラー・警告
  txtDark: '#1f1f1fff',         // メインテキスト色
  txtBgLight: '#f8f9fa', // テキストボックス背景（明るい）
  txtLight: '#f8f9fa',    // 明るいテキスト
  txtBgDark: '#242424ff', // テキストボックス背景（暗い）
  btnActive: '#007bff',   // メインボタン色
  btnInvalid: '#6c757d', // サブボタン色
  border: '#dee2e6',    // 枠線
  bgbase: 'rgba(0,0,0,0.3)', // モーダル下敷き
  // 必要に応じて追加
};

export const UI_FontSize = {
  body: '16px',        // 本文フォントサイズ
  sub: '12px',         // サブテキストフォントサイズ
  header: '24px',      // ヘッダーフォントサイズ
  dlgTxt: '14px',       // ダイアログテキストフォントサイズ
  // 必要に応じて追加
};

export const UI_Settings = {
  fadeInDuration: 400,
  fadeOutDuration: 200,
  crossFadeDelay: 300,  // フェードアウトが始まってから何ms後にフェードインを開始するか
  uiParentClassName: 'ui-parent',
  // 必要に応じて追加
};
