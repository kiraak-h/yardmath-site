"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="page-width legal-page error-page" role="alert"><span className="section-kicker">SOMETHING WENT WRONG</span><h1>Let&apos;s try that <em>again.</em></h1><p>The page could not be loaded correctly. Your calculator inputs may need to be entered again.</p><button type="button" className="button-primary" onClick={() => reset()}>Try again <span>↻</span></button></div>;
}
