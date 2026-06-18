#!/usr/bin/env python3
"""Generate blog article HTML pages from template."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "blog" / "hundert-piloten-kein-produkt.html"
OUT_DIR = ROOT / "blog"

template = TEMPLATE.read_text(encoding="utf-8")
articles = json.loads((ROOT / "content" / "de.json").read_text(encoding="utf-8"))["blog"]["articles"]

for idx, article in enumerate(articles):
    slug = article["href"].replace("blog/", "").replace(".html", "")
    image_file = article["image"].split("/")[-1]
    html = template
    html = re.sub(r'data-blog-article="\d+"', f'data-blog-article="{idx}"', html, count=1)
    html = re.sub(r"blog\.articles\.\d+\.", f"blog.articles.{idx}.", html)
    html = re.sub(r"\.\./assets/blog/[^\"]+", f"../assets/blog/{image_file}", html, count=1)
    html = re.sub(r"<title>[^<]+</title>", f"<title>{article['meta']['title']}</title>", html, count=1)
    html = re.sub(
        r'<meta name="description" content="[^"]*" />',
        f'<meta name="description" content="{article["meta"]["description"]}" />',
        html,
        count=1,
    )
    html = re.sub(r'datetime="[^"]+"', f'datetime="{article["dateIso"]}"', html, count=1)
    html = re.sub(
        r'(<time datetime="[^"]+" data-i18n="blog\.articles\.\d+\.date">)[^<]+(</time>)',
        rf"\g<1>{article['date']}\g<2>",
        html,
        count=1,
    )
    html = re.sub(
        r'(<span data-i18n="blog\.articles\.\d+\.category">)[^<]+(</span>)',
        rf"\g<1>{article['category']}\g<2>",
        html,
        count=1,
    )
    html = re.sub(
        r'(<h1 class="blog-article-hero__title" data-i18n="blog\.articles\.\d+\.title">)[^<]+(</h1>)',
        rf"\g<1>{article['title']}\g<2>",
        html,
        count=1,
    )
    (OUT_DIR / f"{slug}.html").write_text(html, encoding="utf-8")
    print(f"Wrote blog/{slug}.html")
