#!/usr/bin/env node
import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

const CONTENT_DIR = resolve(import.meta.dirname, '../src/content/articles');
const CATEGORIES = ['學理', '文化', '案例'];
const AUTHORS = ['鲁逸凡', '董越'];

async function main() {
  console.log('\n  蓐収株式会社 — 新文章\n');

  const slug = await ask('  slug (英文, 用連字符): ');
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    console.error('  slug 格式不正確 (僅限小寫字母、數字、連字符)');
    process.exit(1);
  }

  const zhPath = resolve(CONTENT_DIR, `${slug}.zh.json`);
  const jaPath = resolve(CONTENT_DIR, `${slug}.ja.json`);
  if (existsSync(zhPath) || existsSync(jaPath)) {
    console.error(`  已存在同名文章: ${slug}`);
    process.exit(1);
  }

  console.log(`  題類: ${CATEGORIES.map((c, i) => `${i + 1}.${c}`).join('  ')}`);
  const catIdx = parseInt(await ask('  選擇 (1-3): ')) - 1;
  const category = CATEGORIES[catIdx] ?? CATEGORIES[0];

  console.log(`  作者: ${AUTHORS.map((a, i) => `${i + 1}.${a}`).join('  ')}`);
  const authIdx = parseInt(await ask('  選擇 (1-2): ')) - 1;
  const author = AUTHORS[authIdx] ?? AUTHORS[0];

  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const zhDateDisplay = `${numToChinese(year)}年${chineseMonth(month)}${chineseDay(day)}`;
  const jaDateDisplay = `${year}年${month}月${day}日`;

  const titleZh = await ask('  中文標題: ');
  const titleJa = await ask('  日文標題: ');

  const zhArticle = {
    slug,
    category,
    author,
    date: dateStr,
    dateDisplay: zhDateDisplay,
    locale: 'zh',
    title: titleZh || '（待填）',
    excerpt: '',
    content: [
      { type: 'paragraph', text: '（正文待填）' },
    ],
  };

  const jaArticle = {
    slug,
    category: categoryToJa(category),
    author: authorToJa(author),
    date: dateStr,
    dateDisplay: jaDateDisplay,
    locale: 'ja',
    title: titleJa || '（待填）',
    excerpt: '',
    content: [
      { type: 'paragraph', text: '（本文未記入）' },
    ],
  };

  writeFileSync(zhPath, JSON.stringify(zhArticle, null, 2) + '\n');
  writeFileSync(jaPath, JSON.stringify(jaArticle, null, 2) + '\n');

  console.log(`\n  已創建:`);
  console.log(`    ${zhPath}`);
  console.log(`    ${jaPath}`);
  console.log(`\n  下一步: 編輯以上兩個文件，填入正文內容。\n`);

  rl.close();
}

// --- helpers ---

function numToChinese(n) {
  const digits = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return String(n).split('').map((d) => digits[parseInt(d)]).join('');
}

function chineseMonth(m) {
  const months = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '臘月'];
  return months[m] || `${m}月`;
}

function chineseDay(d) {
  if (d <= 10) return `初${['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][d]}`;
  if (d < 20) return `十${['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][d - 10]}`;
  if (d === 20) return '二十';
  if (d < 30) return `廿${['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][d - 20]}`;
  if (d === 30) return '三十';
  return `三十一`;
}

function categoryToJa(zh) {
  const map = { '學理': '学理', '文化': '文化', '案例': '事例' };
  return map[zh] ?? zh;
}

function authorToJa(zh) {
  const map = { '鲁逸凡': '魯逸凡', '董越': '董越' };
  return map[zh] ?? zh;
}

main().catch((e) => { console.error(e); process.exit(1); });
