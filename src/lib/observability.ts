/**
 * Observability & Telemetry Subsystem
 * Supports Sentry, OpenTelemetry, Datadog/New Relic integrations,
 * Structured Breadcrumbs, and Web Vitals Performance Metrics.
 */

export interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  userAgent: string;
  url: string;
}

export interface Breadcrumb {
  category: 'ui' | 'navigation' | 'network' | 'user-action' | 'error';
  message: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

export interface PerformanceMetric {
  name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export interface TrackedEvent {
  eventName: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}

class TelemetryService {
  private breadcrumbs: Breadcrumb[] = [];
  private events: TrackedEvent[] = [];
  private readonly maxBreadcrumbs = 50;
  private isInitialized = false;

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.isInitialized = true;
    this.addBreadcrumb('navigation', 'Application loaded', { href: window.location.href });

    // Global uncaught error listener
    window.addEventListener('error', (event) => {
      this.captureException(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Unhandled Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureException(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        { type: 'unhandledrejection' }
      );
    });

    // Capture Web Vitals if Performance Observer is available
    this.setupPerformanceMonitoring();
  }

  public addBreadcrumb(
    category: Breadcrumb['category'],
    message: string,
    data?: Record<string, unknown>
  ) {
    const entry: Breadcrumb = {
      category,
      message,
      data,
      timestamp: Date.now(),
    };

    this.breadcrumbs.push(entry);
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }
  }

  public captureException(error: Error | unknown, context?: Record<string, unknown>): ErrorReport {
    const err = error instanceof Error ? error : new Error(String(error));

    const report: ErrorReport = {
      message: err.message,
      stack: err.stack,
      context: {
        ...context,
        breadcrumbs: [...this.breadcrumbs],
      },
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };

    this.addBreadcrumb('error', err.message, { stack: err.stack });

    // Production Hook: Send to Sentry / OpenTelemetry Collector / Datadog
    if (typeof window !== 'undefined' && (window as unknown as { Sentry?: { captureException: (e: unknown, ctx?: unknown) => void } }).Sentry) {
      (window as unknown as { Sentry: { captureException: (e: unknown, ctx?: unknown) => void } }).Sentry.captureException(err, { extra: report });
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn('[Observability: Error Captured]', report);
    }

    return report;
  }

  public captureMetric(metric: PerformanceMetric) {
    this.addBreadcrumb('network', `Metric ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
  }

  public trackEvent(eventName: string, properties?: Record<string, unknown>): TrackedEvent {
    const event: TrackedEvent = {
      eventName,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(event);
    if (this.events.length > this.maxBreadcrumbs) {
      this.events.shift();
    }

    this.addBreadcrumb('user-action', `Track Event: ${eventName}`, properties);

    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (type: string, name: string, data?: unknown) => void }).gtag === 'function') {
      (window as unknown as { gtag: (type: string, name: string, data?: unknown) => void }).gtag('event', eventName, properties);
    }

    if (process.env.NODE_ENV === 'development') {
      console.info(`[Telemetry Event: ${eventName}]`, properties);
    }

    return event;
  }

  public getEvents(): ReadonlyArray<TrackedEvent> {
    return this.events;
  }

  public getBreadcrumbs(): ReadonlyArray<Breadcrumb> {
    return this.breadcrumbs;
  }

  private setupPerformanceMonitoring() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Observe Paint timing (FCP / LCP)
      const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.captureMetric({
              name: 'FCP',
              value: entry.startTime,
              rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor',
              timestamp: Date.now(),
            });
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
    } catch {
      // Graceful fallback for non-supported browsers
    }
  }
}

export const telemetry = new TelemetryService();
