import Link from 'next/link';
import { ConfirmBadge } from '@/components/ConfirmBadge';
import { formatNumber } from '@/lib/formatters';
import type { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        data-project-card
        data-project-slug={project.slug}
        className='border-line bg-paper hover:border-tide flex min-w-0 items-start gap-4 rounded-2xl border px-4 py-3'
      >
        <span className='text-tide w-8 shrink-0 font-serif text-2xl'>
          {formatNumber(project.rank)}
        </span>
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
