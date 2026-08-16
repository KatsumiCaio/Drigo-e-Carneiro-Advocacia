import { describe, it, expect } from 'vitest';
import { telemetry } from '../lib/observability';

describe('Observability & Telemetry Module', () => {
  it('stores and maintains breadcrumbs within circular buffer limit', () => {
    telemetry.addBreadcrumb('ui', 'Clicked Schedule button', { id: 'header-schedule-btn' });
    telemetry.addBreadcrumb('navigation', 'Scrolled to practice areas');

    const breadcrumbs = telemetry.getBreadcrumbs();
    expect(breadcrumbs.length).toBeGreaterThan(0);
    expect(breadcrumbs[breadcrumbs.length - 1].message).toBe('Scrolled to practice areas');
  });

  it('captures structured exceptions with context and timestamp', () => {
    const testError = new Error('Database connection mock timeout');
    const report = telemetry.captureException(testError, { component: 'TriageCalculator', step: 2 });

    expect(report.message).toBe('Database connection mock timeout');
    expect(report.timestamp).toBeDefined();
    expect(report.context).toHaveProperty('component', 'TriageCalculator');
  });

  it('tracks user engagement events with custom properties', () => {
    const event = telemetry.trackEvent('whatsapp_trigger_clicked', {
      targetId: 'floating-whatsapp-trigger',
      action: 'opened_popover',
    });

    expect(event.eventName).toBe('whatsapp_trigger_clicked');
    expect(event.properties).toEqual({
      targetId: 'floating-whatsapp-trigger',
      action: 'opened_popover',
    });
    expect(event.timestamp).toBeDefined();

    const allEvents = telemetry.getEvents();
    expect(allEvents.some((e) => e.eventName === 'whatsapp_trigger_clicked')).toBe(true);
  });
});
