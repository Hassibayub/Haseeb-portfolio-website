type TrackParams = Record<string, string | number | boolean | undefined>;

type WindowWithAnalytics = Window & {
  gtag?: (event: 'event', name: string, params?: TrackParams) => void;
  clarity?: (cmd: 'event', name: string) => void;
};

export function trackEvent(name: string, params?: TrackParams) {
  if (typeof window === 'undefined') return;
  const w = window as WindowWithAnalytics;
  try {
    w.gtag?.('event', name, params);
    w.clarity?.('event', name);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Analytics error:', err);
    }
  }
}
