import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ConfirmBadge } from '@/components/ConfirmBadge';
import { ProjectStudio } from '@/components/ProjectStudio';
import { getProject, projects, SASHA_TO_FILL, type Project } from '@/lib/projects';

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

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: 'Not found' };
  }

  return { title: project.name };
}

function FillParagraph({ children }: { children: string }) {
  return <p className='text-sm leading-6 break-words'>{children}</p>;
}

function FillList({ items }: { items: readonly string[] }) {
  return (
    <ol className='list-decimal space-y-2 pl-5 text-sm leading-6'>
      {items.map(function renderItem(item, index) {
        return <li key={`${index}-${item}`}>{item}</li>;
      })}
    </ol>
  );
}

function SectionHeading({ title, confirm }: { title: string; confirm?: boolean }) {
  return (
    <div className='mb-2 flex items-center justify-between gap-3'>
      <h2 className='font-serif text-2xl'>{title}</h2>
      {confirm ? <ConfirmBadge /> : null}
    </div>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <main className='mx-auto w-full max-w-3xl px-5 pb-20'>
      <Link href='/' className='text-tide text-sm underline-offset-4 hover:underline'>
        All projects
      </Link>
      <p className='text-tide mt-4 text-sm'>
        {project.lane === 'someday' ? 'Someday' : 'Active'} · Rank {project.rank} ·{' '}
        {project.named ? 'one of the two he named' : 'draft rank'}
      </p>
      <div className='mt-1 flex flex-wrap items-center gap-3'>
        <h1 className='min-w-0 font-serif text-4xl leading-tight tracking-tight sm:text-5xl'>
          {project.name}
        </h1>
        {project.named ? null : <ConfirmBadge />}
      </div>
      <p className='text-foreground/70 mt-3 text-sm break-all'>{project.path}</p>

      <div className='mt-8 space-y-8'>
        <section>
          <SectionHeading title='What it is' />
          <FillParagraph>{project.what}</FillParagraph>
        </section>
        <section>
          <SectionHeading title='Why, deadline, status' />
          <FillParagraph>{project.status}</FillParagraph>
        </section>
        <section>
          <SectionHeading title='Purpose' confirm />
          <p className='text-sm leading-6'>{SASHA_TO_FILL}</p>
        </section>
        <section>
          <SectionHeading title='By when' confirm />
          <FillParagraph>{SASHA_TO_FILL}</FillParagraph>
        </section>
        <section>
          <SectionHeading title='Endgame' confirm />
          <FillParagraph>{SASHA_TO_FILL}</FillParagraph>
        </section>
        <section>
          <SectionHeading title='Next actions' confirm />
          <FillList items={[SASHA_TO_FILL]} />
        </section>
        <section>
          <SectionHeading title='Who he needs' confirm />
          <FillParagraph>{SASHA_TO_FILL}</FillParagraph>
        </section>
        <section>
          <SectionHeading title='Money, roughly' confirm />
          <FillParagraph>{SASHA_TO_FILL}</FillParagraph>
        </section>
        <section>
          <SectionHeading title='Comparables' confirm />
          <FillList items={[SASHA_TO_FILL]} />
        </section>
        <section>
          <SectionHeading title='Where it meets the two goals' confirm />
          <FillParagraph>{SASHA_TO_FILL}</FillParagraph>
        </section>
      </div>

      <div className='mt-12'>
        <ProjectStudio slug={project.slug} />
      </div>
    </main>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  return <ProjectBody project={project} />;
}
