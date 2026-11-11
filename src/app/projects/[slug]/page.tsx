import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConfirmBadge } from '@/components/ConfirmBadge';
import { ProjectNotes } from '@/components/ProjectNotes';
import { SiteHeader } from '@/components/SiteHeader';
import { formatNumber } from '@/lib/formatters';
import { getProject, homeCopy, laneLabel, openFields, projects } from '@/lib/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  const params: { slug: string }[] = [];
  for (const project of projects) {
    params.push({ slug: project.slug });
  }
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: 'Project' };
  }
  return { title: project.name };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const rankNote = project.named ? 'one of the two he named' : 'draft rank';

  return (
    <>
      <SiteHeader showAllProjects />
      <main className='mx-auto w-full max-w-3xl px-5 pb-20'>
        <p className='text-tide mt-4 text-sm'>
          {laneLabel(project.lane)} · Rank {formatNumber(project.rank)} · {rankNote}
        </p>
        <div className='mt-2 flex flex-wrap items-center gap-3'>
          <h1 className='min-w-0 font-serif text-4xl leading-tight tracking-tight sm:text-5xl'>
            {project.name}
          </h1>
          {project.named ? null : <ConfirmBadge />}
        </div>
        <p className='text-foreground/70 mt-3 text-sm break-all'>{project.source}</p>

        <section className='mt-8'>
          <h2 className='font-serif text-2xl'>What it is</h2>
          <p className='mt-2 text-sm leading-6 break-words'>{project.whatItIs}</p>
        </section>

        <section className='mt-8'>
          <h2 className='font-serif text-2xl'>Why, deadline, status</h2>
          <p className='mt-2 text-sm leading-6 break-words'>{project.status}</p>
        </section>

        {openFields.map(label => (
          <section key={label} className='mt-8'>
            <h2 className='flex flex-wrap items-center gap-2 font-serif text-2xl'>
              {label}
              <ConfirmBadge />
            </h2>
            <p className='mt-2 text-sm leading-6'>{homeCopy.openFieldPlaceholder}</p>
          </section>
        ))}

        <ProjectNotes slug={project.slug} />
      </main>
    </>
  );
}
