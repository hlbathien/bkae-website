import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { renderMd, stripMd, escapeHtml } from "../src/lib/markdown";

describe("escapeHtml", () => {
  it("escapes the five HTML metacharacters", () => {
    assert.equal(
      escapeHtml(`<script>alert("a&b's")</script>`),
      "&lt;script&gt;alert(&quot;a&amp;b&#39;s&quot;)&lt;/script&gt;",
    );
  });
});

describe("renderMd — headings", () => {
  it("h1..h6", () => {
    for (let n = 1; n <= 6; n++) {
      const md = "#".repeat(n) + " Title";
      const html = renderMd(md);
      assert.match(html, new RegExp(`<h${n}[^>]*>Title</h${n}>`));
    }
  });
  it("adds slug id", () => {
    assert.match(renderMd("## Hello World"), /<h2 id="hello-world">/);
  });
  it("ignores 7+ hashes (paragraph)", () => {
    assert.match(renderMd("####### nope"), /<p>####### nope<\/p>/);
  });
});

describe("renderMd — paragraphs + emphasis", () => {
  it("bold", () => {
    assert.match(renderMd("a **b** c"), /<p>a <strong>b<\/strong> c<\/p>/);
  });
  it("italic with *", () => {
    assert.match(renderMd("a *b* c"), /<p>a <em>b<\/em> c<\/p>/);
  });
  it("italic with _", () => {
    assert.match(renderMd("a _b_ c"), /<p>a <em>b<\/em> c<\/p>/);
  });
  it("strikethrough", () => {
    assert.match(renderMd("a ~~b~~ c"), /<p>a <del>b<\/del> c<\/p>/);
  });
  it("inline code does not parse emphasis inside", () => {
    assert.match(
      renderMd("Use `**bold**` to embolden"),
      /<p>Use <code>\*\*bold\*\*<\/code> to embolden<\/p>/,
    );
  });
  it("hard break on two-space EOL", () => {
    assert.match(renderMd("line a  \nline b"), /<p>line a<br \/>\nline b<\/p>/);
  });
});

describe("renderMd — links + images (security)", () => {
  it("renders safe http link with rel+target", () => {
    const out = renderMd("[gh](https://github.com)");
    assert.match(out, /<a href="https:\/\/github\.com" rel="noopener noreferrer" target="_blank">gh<\/a>/);
  });
  it("renders relative link without rel", () => {
    const out = renderMd("[home](/about)");
    assert.match(out, /<a href="\/about">home<\/a>/);
    assert.doesNotMatch(out, /target="_blank"/);
  });
  it("rejects javascript: scheme", () => {
    const out = renderMd("[xss](javascript:alert(1))");
    // Should fall back to escaped literal — no <a> tag emitted.
    assert.doesNotMatch(out, /<a/);
    assert.match(out, /\[xss\]/);
  });
  it("rejects data: scheme", () => {
    const out = renderMd("![pwn](data:image/svg+xml;base64,PHN2Zw==)");
    assert.doesNotMatch(out, /<img/);
  });
  it("renders safe image with lazy loading", () => {
    const out = renderMd("![alt](/logo.png)");
    assert.match(out, /<img src="\/logo\.png" alt="alt" loading="lazy" \/>/);
  });
});

describe("renderMd — lists", () => {
  it("unordered with -", () => {
    const out = renderMd("- a\n- b\n- c");
    assert.match(out, /<ul>\s*<li>a<\/li>\s*<li>b<\/li>\s*<li>c<\/li>\s*<\/ul>/);
  });
  it("unordered with *", () => {
    assert.match(renderMd("* a\n* b"), /<ul>/);
  });
  it("ordered, default start", () => {
    const out = renderMd("1. a\n2. b");
    assert.match(out, /<ol>\s*<li>a<\/li>\s*<li>b<\/li>\s*<\/ol>/);
  });
  it("ordered, custom start", () => {
    assert.match(renderMd("3. a\n4. b"), /<ol start="3">/);
  });
});

describe("renderMd — code blocks", () => {
  it("fenced no lang", () => {
    const out = renderMd("```\nconst x = 1;\n```");
    assert.match(out, /<pre><code>const x = 1;<\/code><\/pre>/);
  });
  it("fenced with lang", () => {
    const out = renderMd("```ts\nconst x: number = 1;\n```");
    assert.match(out, /<pre><code class="language-ts">const x: number = 1;<\/code><\/pre>/);
  });
  it("escapes html inside code block", () => {
    const out = renderMd("```\n<script>x</script>\n```");
    assert.match(out, /&lt;script&gt;x&lt;\/script&gt;/);
    assert.doesNotMatch(out, /<script>/);
  });
});

describe("renderMd — blockquotes + hr", () => {
  it("simple quote", () => {
    const out = renderMd("> a quote");
    assert.match(out, /<blockquote>\s*<p>a quote<\/p>\s*<\/blockquote>/);
  });
  it("multi-line quote", () => {
    const out = renderMd("> line one\n> line two");
    assert.match(out, /<blockquote>[\s\S]*line one[\s\S]*line two[\s\S]*<\/blockquote>/);
  });
  it("hr ---", () => {
    assert.match(renderMd("---"), /<hr \/>/);
  });
  it("hr ***", () => {
    assert.match(renderMd("***"), /<hr \/>/);
  });
});

describe("renderMd — XSS hardening", () => {
  it("strips raw <script>", () => {
    const out = renderMd("hello <script>alert(1)</script> world");
    assert.doesNotMatch(out, /<script>/);
    assert.match(out, /&lt;script&gt;/);
  });
  it("strips raw <iframe>", () => {
    const out = renderMd("<iframe src=//evil></iframe>");
    assert.doesNotMatch(out, /<iframe/);
  });
  it("strips on= handlers in HTML-looking text", () => {
    const out = renderMd("<img onerror=alert(1) src=x>");
    // Raw < and > are entity-escaped, so there is no live tag. The literal
    // text `onerror=…` is inert inside an escaped paragraph.
    assert.doesNotMatch(out, /<img\s/);
    assert.match(out, /&lt;img/);
  });
});

describe("renderMd — empty + edge", () => {
  it("empty string", () => {
    assert.equal(renderMd(""), "");
  });
  it("only whitespace", () => {
    assert.equal(renderMd("   \n  \n"), "");
  });
  it("CRLF normalised", () => {
    assert.match(renderMd("# A\r\n\r\nb"), /<h1[^>]*>A<\/h1>\s*<p>b<\/p>/);
  });
});

describe("stripMd", () => {
  it("removes md syntax", () => {
    const md = "# Title\n\nSome **bold** [link](/x) `code` here.\n\n```js\nfoo\n```";
    const out = stripMd(md);
    assert.match(out, /^Title Some bold link code here\.?\s*$/);
  });
});
