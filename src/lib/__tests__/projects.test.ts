import { describe, expect, it } from 'vitest';

import { getProject, namedProjects, projects, projectsInLane } from '../projects';

describe('projects', () => {
  it('lists the 21 public projects once each', () => {
    expect(projects).toHaveLength(21);

    const slugs = new Set<string>();
    for (const project of projects) {
      slugs.add(project.slug);
    }
    expect(slugs.size).toBe(21);
  });

  it('keeps the named pair at rank 2 and parks the last three', () => {
    expect(namedProjects().map(project => project.slug)).toEqual(['high-tide', 'pigu', 'gaochao']);
    expect(projectsInLane('someday').map(project => project.slug)).toEqual([
      'inbox-zero',
      'mfv-walkthrough',
      'blog-book-library',
    ]);
    expect(projectsInLane('active')).toHaveLength(18);
    expect(getProject('pigu')?.rank).toBe(2);
    expect(getProject('gaochao')?.rank).toBe(2);
    expect(getProject('missing')).toBeUndefined();
  });
});
