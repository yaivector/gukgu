# gukgu v1.1.0 — Length Converter

เวอร์ชันนี้แก้ปัญหาเว็บแสดงไฟล์เก่าจาก Service Worker แล้ว

## ไฟล์ที่ต้องอัปโหลดขึ้น GitHub

- index.html
- styles.css
- app.js
- gukgu-logo.svg

## สำคัญมาก

ให้ลบไฟล์เก่า 2 ไฟล์นี้ออกจาก GitHub Repository:

- service-worker.js
- manifest.webmanifest

จากนั้นอัปโหลดไฟล์ใหม่ทั้ง 4 ไฟล์ด้านบน แล้วกด Commit changes

ครั้งแรกหลังอัปเดต อุปกรณ์ที่เคยเปิดเว็บรุ่นเก่าอาจต้องรีเฟรชหนึ่งครั้งเพื่อให้ Service Worker เก่าถูกยกเลิก หลังจากนั้นการเข้าเว็บตามปกติจะไม่ต้องกด Ctrl+F5 ทุกครั้งแล้ว
