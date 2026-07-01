#!/usr/bin/env python3
"""Build blog.articles entries from markdown and merge into content/*.json."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"

ARTICLES = [
    {
        "slug": "hundert-piloten-kein-produkt",
        "md": "01-hundert-piloten",
        "image": "assets/blog/artikel-1.jpg",
        "date_iso": "2026-06-18",
        "date_de": "18. Juni 2026",
        "date_en": "June 18, 2026",
        "category_de": "Produktion",
        "category_en": "Production",
        "title_de": "Hundert Piloten, kein Produkt. Warum KI-Projekte im Testbetrieb sterben",
        "title_en": "A Hundred Pilots, No Product. Why AI Projects Die in Testing",
        "excerpt_de": "88 Prozent setzen KI ein — aber nur jedes vierte Unternehmen bringt 40 Prozent oder mehr seiner Experimente in Produktion. Woran es hakt und was Vorreiter anders machen.",
        "excerpt_en": "88 percent use AI — yet only one in four companies moves 40 percent or more of experiments into production. What stalls rollouts and what leaders do differently.",
        "imageAlt_de": "Apex Partners — KI-Pilotprojekte und Produktion",
        "imageAlt_en": "Apex Partners — AI pilots and production",
        "meta_desc_de": "Warum KI-Piloten im Testbetrieb sterben und wie Unternehmen den Schritt in den Echtbetrieb schaffen.",
        "meta_desc_en": "Why AI pilots die in testing and how companies make the leap to production.",
    },
    {
        "slug": "made-in-eu-sovereign-ai",
        "md": "02-made-in-eu",
        "image": "assets/blog/artikel-2.jpg",
        "date_iso": "2026-06-11",
        "date_de": "11. Juni 2026",
        "date_en": "June 11, 2026",
        "category_de": "Souveränität",
        "category_en": "Sovereignty",
        "title_de": "Made in EU zählt wieder und die Herkunft wird zum strategischen Faktor",
        "title_en": "Made in EU Matters Again and Origin Is Becoming a Strategic Factor",
        "excerpt_de": "Mehr als drei von vier Unternehmen beziehen das Herkunftsland in ihre KI-Anbieterentscheidung ein. Was Sovereign AI für den Mittelstand bedeutet.",
        "excerpt_en": "More than three in four companies factor country of origin into AI vendor decisions. What sovereign AI means for mid-market firms.",
        "imageAlt_de": "Apex Partners — Sovereign AI und Datenkontrolle",
        "imageAlt_en": "Apex Partners — Sovereign AI and data control",
        "meta_desc_de": "Warum der Bauort Ihrer KI strategisch wird — Souveränität, Infrastruktur und Compliance im Überblick.",
        "meta_desc_en": "Why where your AI is built is strategic — sovereignty, infrastructure, and compliance at a glance.",
    },
    {
        "slug": "ki-agenten-kontrolle",
        "md": "03-ki-agenten",
        "image": "assets/blog/artikel-3.jpg",
        "date_iso": "2026-06-04",
        "date_de": "4. Juni 2026",
        "date_en": "June 4, 2026",
        "category_de": "Agentic AI",
        "category_en": "Agentic AI",
        "title_de": "KI-Agenten im Unternehmen, die Kontrolle kommt meist zu spät",
        "title_en": "AI Agents in the Enterprise, Control Usually Comes Too Late",
        "excerpt_de": "74 Prozent wollen autonome KI-Agenten — aber nur 21 Prozent haben ein ausgereiftes Governance-Modell. Der dritte Weg zwischen blindem Rollout und Abwarten.",
        "excerpt_en": "74 percent plan autonomous AI agents — but only 21 percent have mature governance. The third path between blind rollout and waiting.",
        "imageAlt_de": "Apex Partners — KI-Agenten und Governance",
        "imageAlt_en": "Apex Partners — AI agents and governance",
        "meta_desc_de": "KI-Agenten im Unternehmen: Ambition, Risiken und praktische Leitplanken für kontrollierten Einsatz.",
        "meta_desc_en": "AI agents in the enterprise: ambition, risks, and practical guardrails for controlled deployment.",
    },
    {
        "slug": "lizenzen-und-hoffen",
        "md": "04-lizenzen-und-hoffen",
        "image": "assets/blog/artikel-4.jpg",
        "date_iso": "2026-05-28",
        "date_de": "28. Mai 2026",
        "date_en": "May 28, 2026",
        "category_de": "Adoption",
        "category_en": "Adoption",
        "title_de": "Der teuerste Fehler bei der KI-Einführung: Lizenzen verteilen und hoffen",
        "title_en": "The Most Expensive Mistake in AI Rollout: Handing Out Licenses and Hoping",
        "excerpt_de": "Zugang zu KI-Tools ist um 50 Prozent gewachsen — aber weniger als 60 Prozent der Berechtigten nutzen sie täglich. Der Engpass ist Adoption, nicht Technologie.",
        "excerpt_en": "Access to AI tools grew 50 percent — yet fewer than 60 percent of those with access use it daily. The bottleneck is adoption, not technology.",
        "imageAlt_de": "Apex Partners — KI-Adoption im Unternehmen",
        "imageAlt_en": "Apex Partners — AI adoption in the enterprise",
        "meta_desc_de": "Warum Lizenzen allein keinen KI-Erfolg bringen — und was stattdessen Adoption im Alltag auslöst.",
        "meta_desc_en": "Why licenses alone do not create AI success — and what drives adoption in daily work instead.",
    },
    {
        "slug": "governance-und-resilienz",
        "md": "05-governance-resilienz",
        "image": "assets/blog/artikel-5.jpg",
        "date_iso": "2026-05-21",
        "date_de": "21. Mai 2026",
        "date_en": "May 21, 2026",
        "category_de": "Governance",
        "category_en": "Governance",
        "title_de": "Erst Kontrolle, dann Tempo! Warum Governance und Resilienz über Ihre KI-Skalierung entscheiden",
        "title_en": "Control First, Then Speed! Why Governance and Resilience Decide Your AI Scaling",
        "excerpt_de": "Die schnellsten KI-Wachstumsprogramme haben nicht die wenigsten Regeln — sondern die durchdachtesten. Governance und Resilienz als Fundament.",
        "excerpt_en": "The fastest AI growth programs are not the ones with the fewest rules — but the most thoughtful. Governance and resilience as the foundation.",
        "imageAlt_de": "Apex Partners — KI-Governance und Resilienz",
        "imageAlt_en": "Apex Partners — AI governance and resilience",
        "meta_desc_de": "Governance und Resilienz als Fundament für sichere KI-Skalierung — Befunde, Risiken und Praxis-Schritte.",
        "meta_desc_en": "Governance and resilience as the foundation for safe AI scaling — findings, risks, and practical steps.",
    },
]


def inline_format(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return text


def md_to_html(md: str) -> str:
    parts: list[str] = []
    blocks = re.split(r"\n(?=## )", md.strip())
    lead = blocks[0].strip()
    if lead:
        for para in re.split(r"\n\n+", lead):
            para = para.strip()
            if para:
                parts.append(f"<p>{inline_format(para)}</p>")

    for block in blocks[1:]:
        lines = block.split("\n")
        heading = lines[0].lstrip("# ").strip()
        parts.append(f"<h2>{inline_format(heading)}</h2>")
        body_lines = lines[1:]
        i = 0
        while i < len(body_lines):
            line = body_lines[i].strip()
            if not line:
                i += 1
                continue
            if re.match(r"^\d+\.\s", line):
                parts.append("<ol>")
                while i < len(body_lines):
                    item = body_lines[i].strip()
                    if not item:
                        i += 1
                        break
                    if not re.match(r"^\d+\.\s", item):
                        break
                    item_text = re.sub(r"^\d+\.\s+", "", item)
                    parts.append(f"<li>{inline_format(item_text)}</li>")
                    i += 1
                parts.append("</ol>")
                continue
            if line.startswith("- "):
                parts.append("<ul>")
                while i < len(body_lines):
                    item = body_lines[i].strip()
                    if not item:
                        i += 1
                        break
                    if not item.startswith("- "):
                        break
                    parts.append(f"<li>{inline_format(item[2:])}</li>")
                    i += 1
                parts.append("</ul>")
                continue
            para_lines = [line]
            i += 1
            while i < len(body_lines):
                nxt = body_lines[i].strip()
                if not nxt or nxt.startswith("- ") or re.match(r"^\d+\.\s", nxt) or nxt.startswith("## "):
                    break
                para_lines.append(nxt)
                i += 1
            parts.append(f"<p>{inline_format(' '.join(para_lines))}</p>")

    return "".join(parts)


def extract_excerpt(md_text: str, max_sentences: int = 4) -> str:
    lead = md_text.strip().split("\n\n")[0].strip()
    sentences = re.split(r"(?<=[.!?])\s+", lead)
    return " ".join(sentences[:max_sentences]).strip()


def build_article(meta: dict, lang: str) -> dict:
    md_path = CONTENT_DIR / "blog" / lang / f"{meta['md']}.md"
    md_text = md_path.read_text(encoding="utf-8")
    body_html = md_to_html(md_text)
    title = meta[f"title_{lang}"]
    suffix = "Apex Partners Blog"
    return {
        "href": f"blog/{meta['slug']}.html",
        "date": meta[f"date_{lang}"],
        "dateIso": meta["date_iso"],
        "category": meta[f"category_{lang}"],
        "title": title,
        "excerpt": extract_excerpt(md_text),
        "image": meta["image"],
        "imageAlt": meta[f"imageAlt_{lang}"],
        "meta": {
            "title": f"{title} | {suffix}",
            "description": meta[f"meta_desc_{lang}"],
        },
        "bodyHtml": body_html,
    }


def main() -> None:
    article_cta = {
        "de": {
            "text": "Neugierig geworden, was KI für Sie bedeuten kann?",
            "button": "Kontakt aufnehmen",
        },
        "en": {
            "text": "Curious what AI could mean for you?",
            "button": "Get in touch",
        },
    }
    for lang in ("de", "en"):
        path = CONTENT_DIR / f"{lang}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        data["blog"]["articleCta"] = article_cta[lang]
        data["blog"]["articles"] = [build_article(meta, lang) for meta in ARTICLES]
        if "faqTitle" in data["blog"]:
            del data["blog"]["faqTitle"]
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Updated {path} ({len(data['blog']['articles'])} articles)")


if __name__ == "__main__":
    main()
