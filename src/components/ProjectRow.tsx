import Link from 'next/link';

import { ConfirmBadge } from '@/components/ConfirmBadge';
import type { Project } from '@/lib/projects';

type ProjectRowProps = {
  project: Project;
};

export function ProjectRow({ project }: ProjectRowProps) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className='border-line bg-paper hover:border-tide flex min-w-0 items-start gap-4 rounded-2xl border px-4 py-3'
      >
        <span className='text-tide w-6 shrink-0 font-serif text-2xl'>{project.rank}</span>
        <span className='min-w-0'>
          <span className='flex flex-wrap items-center gap-2 text-lg'>
            {project.name}
            {project.named ? null : <ConfirmBadge />}
          </span>
          <span className='text-foreground/75 mt-1 block text-sm leading-6'>{project.summary}</span>
        </span>
      </Link>
    </li>
  );
}
