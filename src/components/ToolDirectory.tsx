"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ToolCard from "@/components/ToolCard";
import { tools, type ToolCategory } from "@/lib/tools";

const categories: ("All tools" | ToolCategory)[] = ["All tools", "Soil & garden", "Stone & aggregate", "Project volume", "Construction"];

export default function ToolDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All tools");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "All tools" || tool.category === category;
      const searchable = [tool.name, tool.description, tool.cardDescription, tool.material, ...tool.bestFor].join(" ").toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [query, category]);

  return (
    <>
      <div className="directory-controls">
        <label className="directory-search" htmlFor="tool-search"><span aria-hidden="true">⌕</span><input ref={searchRef} id="tool-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search calculators or materials" /><kbd aria-hidden="true">/</kbd></label>
        <div className="category-filters" aria-label="Filter calculators">
          {categories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <p className="directory-count" aria-live="polite">Showing {filtered.length} of {tools.length} calculators</p>
      {filtered.length ? <div className="tools-grid">{filtered.map((tool, index) => <ToolCard key={tool.slug} tool={tool} index={index} />)}</div> : <div className="directory-empty"><strong>No matching calculators</strong><p>Try another material or choose a different category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All tools"); }}>Clear filters</button></div>}
    </>
  );
}
