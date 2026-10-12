// ตั้งค่าหน้าแอป Portable X-ray บน GitHub Pages — แก้แค่บรรทัด appUrl
// appUrl = ลิงก์ Web app ของ Apps Script ที่ลงท้ายด้วย /exec (Deploy › Manage deployments › คัดลอก Web app URL)
window.PXR_CONFIG = {
  appUrl: 'https://script.google.com/macros/s/AKfycbx6KtLMzm_Hu2FAUvSrQ1R4DTkkRiAodqW31BZ333awsjgI3D9bu-2yUqwxxj_IAHRDNg/exec',
  // เวลารอหน้าระบบโหลด (วินาที) ก่อนแสดงปุ่ม "เปิดในแท็บใหม่" กรณีเบราว์เซอร์บล็อกการฝังหน้า
  slowAfterSec: 25
};
