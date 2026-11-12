export const siteName = "Frontend Interview Trainer";
export const siteDescription = "Вопросы и ответы по JavaScript, React, CSS, HTML, TypeScript и Next.js для подготовки к frontend-собеседованиям.";
export const openGraphImages = [{
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteName,
}];
export const siteUrl = new URL(
  process.env.SITE_URL || process.env.BETTER_AUTH_URL || "http://127.0.0.1:3000",
);
