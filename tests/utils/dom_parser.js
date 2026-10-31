/* ==========================================================================
   DOM & CSS PARSER UTILITY (STANDALONE)
   Enables strict AST/regex-based inspection of semantic HTML5 and Modular CSS
   without requiring heavy native browser bindings or npm packages.
   ========================================================================== */

export class SimpleElement {
  constructor(tag, attributes = {}, content = '', raw = '') {
    this.tagName = tag.toLowerCase();
    this.attributes = attributes;
    this.content = content;
    this.raw = raw;
  }

  getAttribute(name) {
    return this.attributes[name.toLowerCase()] ?? null;
  }

  hasAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name.toLowerCase());
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  get className() {
    return this.getAttribute('class') || '';
  }

  classList() {
    const cls = this.className.trim();
    return cls ? cls.split(/\s+/) : [];
  }

  hasClass(name) {
    return this.classList().includes(name);
  }

  get textContent() {
    return this.content.replace(/<[^>]*>/g, '').trim();
  }
}

export function parseAttributes(attrString) {
  const attrs = {};
  const regex = /([a-zA-Z0-9_-]+)(?:=["']([^"']*)["']|=([^\s>]+))?/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1].toLowerCase();
    const val = match[2] !== undefined ? match[2] : match[3] !== undefined ? match[3] : '';
    attrs[key] = val;
  }
  return attrs;
}

export function findElementById(html, id) {
  const pattern = new RegExp(`<([a-zA-Z0-9_-]+)([^>]*?)\\bid=["']${id}["']([^>]*?)>(?:([\\s\\S]*?)<\\/\\1>|)`, 'i');
  const match = html.match(pattern);
  if (!match) return null;
  const tag = match[1];
  const allAttrs = (match[2] || '') + ' id="' + id + '" ' + (match[3] || '');
  return new SimpleElement(tag, parseAttributes(allAttrs), match[4] || '', match[0]);
}

export function findElementsByClass(html, className) {
  const elements = [];
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `<([a-zA-Z0-9_-]+)([^>]*?)\\bclass=["']([^"']*?\\b${escaped}\\b[^"']*?)["']([^>]*?)>`,
    'gi'
  );
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const tag = match[1];
    const allAttrs = (match[2] || '') + ` class="${match[3]}" ` + (match[4] || '');
    elements.push(new SimpleElement(tag, parseAttributes(allAttrs), '', match[0]));
  }
  return elements;
}

export function findElementsByTag(html, tagName) {
  const elements = [];
  const pattern = new RegExp(`<(${tagName})([^>]*?)>(?:([\\s\\S]*?)<\\/\\1>|)`, 'gi');
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const tag = match[1];
    const attrs = parseAttributes(match[2] || '');
    elements.push(new SimpleElement(tag, attrs, match[3] || '', match[0]));
  }
  return elements;
}

export function extractCssVariables(cssContent) {
  const vars = {};
  const regex = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    vars[`--${match[1]}`] = match[2].trim();
  }
  return vars;
}

export function extractMediaQueries(cssContent) {
  const queries = [];
  const regex = /@media\s*([^{]+)\{([\s\S]*?\})\s*\}/g;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    queries.push({
      condition: match[1].trim(),
      body: match[2].trim()
    });
  }
  return queries;
}
