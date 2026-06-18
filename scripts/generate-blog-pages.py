#!/usr/bin/env python3
"""Generate blog article HTML pages from template."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "blog" / "hundert-piloten-kein-produkt.html"
CONTENT = json.loads((ROOT / "content" / "de.json").read_text(encoding="utf-8"))
OUT_DIR = ROOT / "blog"

OLD_SLUGS = [
    "ki-im-mittelstand",
    "pilot-zur-produktion",
    "datenschutzkonforme-ki",
    "ki-strategie",
    "change-management",
    "systemintegration",
]

template = TEMPLATE.read_text(encoding="utf-8")

for idx, article in enumerate(CONTENT["blog"]["articles"]):
    slug = article["href"].replace("blog/", "").replace(".html", "")
    image_file = article["image"].split("/")[-1]
    html = template
    html = html.replace('data-blog-article="1"', f'data-blog-article="{idx}"')
    html = html.replace("blog.articles.1.", f"blog.articles.{idx}.")
    html = html.replace("../assets/blog/artikel-1.jpg", f"../assets/blog/{image_file}")
    html = html.replace('width="1200"\n              height="514"', 'width="1024"\n              height="576"')
    html = html.replace(
        "<title>Vom Pilotprojekt zur produktiven Lösung | Apex Partners Blog</title>",
        f"<title>{article['meta']['title']}</title>",
    )
    html = html.replace(
        '<meta name="description" content="Drei Muster, die den Unterschied zwischen KI-Demo und produktivem Einsatz machen." />',
        f'<meta name="description" content="{article["meta"]["description"]}" />',
    )
    html = html.replace(f'datetime="2026-06-04"', f'datetime="{article["dateIso"]}"')
    html = html.replace(">4. Juni 2026<", f">{article['date']}<")
    html = html.replace(">Prozesse<", f">{article['category']}<")
    html = html.replace(
        ">Vom Pilotprojekt zur produktiven Lösung<",
        f">{article['title']}<",
    )
    (OUT_DIR / f"{slug}.html").write_text(html, encoding="utf-8")
    print(f"Wrote blog/{slug}.html")

for old in OLD_SLUGS:
    path = OUT_DIR / f"{old}.html"
    articles = [a["href"].replace("blog/", "").replace(".html", "") for a in CONTENT["blog"]["articles"]]
    if old not in articles and path.exists():
        path.unlink()
        print(f"Removed blog/{old}.html")
