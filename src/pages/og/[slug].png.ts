import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getAllArticles } from '../../lib/articles';

export const getStaticPaths: GetStaticPaths = () => {
  return getAllArticles().map((article) => ({
    params: { slug: article.slug },
    props: { title: article.ja.title, author: article.ja.author },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, author } = props as { title: string; author: string };

  const width = 1200;
  const height = 630;
  const bgColor = '#F5EFE3';
  const textColor = '#1F1A15';
  const accentColor = '#8B2500';

  const escapedTitle = escapeXml(title);
  const escapedAuthor = escapeXml(author);

  const titleLines = wrapText(escapedTitle, 18);
  const titleY = Math.max(200, 315 - titleLines.length * 40);

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <rect x="60" y="60" width="${width - 120}" height="${height - 120}" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.15"/>
    <text x="100" y="120" font-family="serif" font-size="24" fill="${accentColor}" letter-spacing="8">蓐収株式会社</text>
    ${titleLines.map((line, i) => `<text x="100" y="${titleY + i * 72}" font-family="serif" font-size="52" fill="${textColor}" letter-spacing="3">${line}</text>`).join('\n    ')}
    <text x="100" y="${height - 100}" font-family="serif" font-size="22" fill="${textColor}" opacity="0.6">— ${escapedAuthor}</text>
    <line x1="100" y1="${height - 130}" x2="${width - 100}" y2="${height - 130}" stroke="${textColor}" stroke-width="1" opacity="0.12"/>
  </svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000' },
  });
};

function wrapText(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let remaining = text;
  while (remaining.length > maxChars) {
    lines.push(remaining.slice(0, maxChars));
    remaining = remaining.slice(maxChars);
  }
  if (remaining) lines.push(remaining);
  return lines;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
