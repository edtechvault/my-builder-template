// analytics/ga.ts
type GAEvent = 'cta_clicked' | 'pricing_view' | 'form_submit';
declare global { interface Window { gtag?: (...args: any[]) => void; dataLayer?: any[] } }

export function track(event: GAEvent, params: Record<string, any> = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch { /* no-op */ }
}
