// src/utils/seoHelper.js
// Dynamically manages page titles, meta descriptions, canonical URLs, and Schema.org structured data.

export function updatePageSEO({
  title = 'AptiAnimate — Free Aptitude Practice with Visual Animations',
  description = 'Master aptitude with interactive visual animations. Practice 800+ questions for campus placements (TCS, Infosys, Wipro) and govt exams (SSC, Banking) — 100% free.',
  canonicalUrl = window.location.href,
  schema = null,
}) {
  // 1. Update Document Title
  document.title = title;

  // 2. Update Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', description);

  // 3. Update Open Graph / Twitter Meta
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);

  // 4. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  // 5. Update or Inject Schema.org JSON-LD
  const SCRIPT_ID = 'seo-dynamic-schema';
  let schemaScript = document.getElementById(SCRIPT_ID);

  if (schema) {
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = SCRIPT_ID;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);
  } else if (schemaScript) {
    schemaScript.remove();
  }
}
