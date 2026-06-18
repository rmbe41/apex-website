#!/usr/bin/env python3
"""Regenerate blog listing cards in blog.html."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
articles = json.loads((ROOT / "content" / "de.json").read_text(encoding="utf-8"))["blog"]["articles"]

cards = []
for idx, article in enumerate(articles):
    image_file = article["image"].split("/")[-1]
    cards.append(
        f"""          <article class="blog-card" role="listitem">
            <a class="blog-card-link" href="{article['href']}" data-i18n-href="blog.articles.{idx}.href">
              <div class="blog-card-media">
                <img
                  src="assets/blog/{image_file}"
                  alt=""
                  width="1024"
                  height="576"
                  loading="lazy"
                  decoding="async"
                  data-i18n-alt="blog.articles.{idx}.imageAlt"
                />
              </div>
              <div class="blog-card-body">
                <p class="blog-card-meta">
                  <time datetime="{article['dateIso']}" data-i18n="blog.articles.{idx}.date">{article['date']}</time>
                  <span class="blog-card-meta-sep" aria-hidden="true">·</span>
                  <span data-i18n="blog.articles.{idx}.category">{article['category']}</span>
                </p>
                <h2 class="blog-card-title" data-i18n="blog.articles.{idx}.title">
                  {article['title']}
                </h2>
                <p class="blog-card-excerpt" data-i18n="blog.articles.{idx}.excerpt">
                  {article['excerpt']}
                </p>
                <span class="blog-card-more">
                  <span data-i18n="blog.readMore">Mehr lesen</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </div>
            </a>
          </article>"""
    )

blog_html = (ROOT / "blog.html").read_text(encoding="utf-8")
new_grid = "\n".join(cards)
blog_html = re.sub(
    r'(<div class="blog-grid" role="list">).*?(</div>\s*</section>)',
    r"\1\n" + new_grid + r"\n        \2",
    blog_html,
    count=1,
    flags=re.DOTALL,
)
(ROOT / "blog.html").write_text(blog_html, encoding="utf-8")
print("Updated blog.html")
