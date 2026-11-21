import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools";

export default function ToolCard({ tool, index = 0 }: { tool: ToolDefinition; index?: number }) {
  return (
    <Link href={`/${tool.slug}/`} className="tool-card" aria-label={`Open ${tool.name}`}>
      <div className="tool-card-top"><span className="tool-icon" aria-hidden="true">{tool.icon}</span><span className="tool-number">{String(index + 1).padStart(2, "0")}</span></div>
      <div className="tool-card-copy"><span className="eyebrow">{tool.eyebrow}</span><h3>{tool.name}</h3><p>{tool.cardDescription}</p></div>
      <span className="card-link">Open calculator <span aria-hidden="true">↗</span></span>
    </Link>
  );
}
