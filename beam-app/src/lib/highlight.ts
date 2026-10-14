// A small highlighter for the docs: comments, strings, keywords, tags, numbers.
const KEYWORDS = new Set(["import", "from", "export", "default", "function", "return", "const", "let", "type", "if", "else", "async", "await", "npm", "run", "install", "true", "false", "null", "new"]);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(code: string, lang?: string): string {
  if (lang === "md" || lang === "text") return esc(code);
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)/g;
  let out = "";
  let last = 0;
  for (let m = re.exec(code); m; m = re.exec(code)) {
    out += esc(code.slice(last, m.index));
    const [all, comment, str, tag, num, word] = m;
    if (comment) out += `<span class="syn-c">${esc(all)}</span>`;
    else if (str) out += `<span class="syn-s">${esc(all)}</span>`;
    else if (tag) out += `${esc(all.replace(/[A-Za-z].*$/, ""))}<span class="syn-t">${esc(all.replace(/^<\/?/, ""))}</span>`;
    else if (num) out += `<span class="syn-n">${all}</span>`;
    else if (word && KEYWORDS.has(word)) out += `<span class="syn-k">${word}</span>`;
    else out += esc(all);
    last = m.index + all.length;
  }
  return out + esc(code.slice(last));
}
