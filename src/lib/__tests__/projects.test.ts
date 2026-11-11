import { describe, expect, it } from 'vitest';
import { homeCopy, projects } from '@/lib/projects';

describe('projects', () => {
  it('lists 21 projects with the album and Gaochao/PIGU first', () => {
    expect(projects).toHaveLength(21);

    const highTide = projects.find(project => project.slug === 'high-tide');
    const pigu = projects.find(project => project.slug === 'pigu');
    const gaochao = projects.find(project => project.slug === 'gaochao');

    expect(highTide?.rank).toBe(1);
    expect(highTide?.named).toBe(true);
    expect(pigu?.rank).toBe(2);
    expect(pigu?.named).toBe(true);
    expect(gaochao?.rank).toBe(2);
    expect(gaochao?.named).toBe(true);
    expect(gaochao?.whatItIs).toContain('Gaochao LLC');
  });

  it('uses the Gaochao spelling', () => {
    const blob = JSON.stringify({ projects, homeCopy });
    expect(blob).not.toContain('GaoChao');
    expect(blob).toContain('Gaochao LLC');
  });
});
