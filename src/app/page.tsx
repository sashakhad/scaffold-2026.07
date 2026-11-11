import { ProjectCard } from '@/components/ProjectCard';
import { SiteHeader } from '@/components/SiteHeader';
import { formatNumber } from '@/lib/formatters';
import { homeCopy, namedProjects, projects, projectsInLane } from '@/lib/projects';

export default function Home() {
  const named = namedProjects();
  const active = projectsInLane('active');
  const someday = projectsInLane('someday');

  return (
    <>
      <SiteHeader />
      <main className='mx-auto w-full max-w-3xl px-5 pb-20'>
        <p className='text-tide text-sm'>{homeCopy.eyebrow}</p>
        <h1 className='mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl'>
          {homeCopy.title}
        </h1>
        <p className='text-foreground/80 mt-4 max-w-2xl text-base leading-7'>{homeCopy.intro}</p>

        <section className='border-tide/30 bg-tide text-paper mt-8 rounded-2xl border px-5 py-4'>
          <h2 className='font-serif text-2xl'>{homeCopy.guardrailTitle}</h2>
          <p className='mt-2 leading-7'>{homeCopy.guardrail}</p>
        </section>

        <section className='mt-6 grid gap-4 md:grid-cols-2'>
          <article className='border-line bg-paper rounded-2xl border p-5'>
            <h2 className='font-serif text-2xl'>{homeCopy.financialTitle}</h2>
            <p className='text-foreground/80 mt-2 text-sm leading-6'>{homeCopy.financial}</p>
          </article>
          <article className='border-line bg-paper rounded-2xl border p-5'>
            <h2 className='font-serif text-2xl'>{homeCopy.playTitle}</h2>
            <p className='text-foreground/80 mt-2 text-sm leading-6'>{homeCopy.play}</p>
          </article>
        </section>

        <section className='mt-10'>
          <h2 className='font-serif text-3xl'>{homeCopy.namedTitle}</h2>
          <p className='text-foreground/75 mt-2 text-sm leading-6'>{homeCopy.namedLede}</p>
          <ol className='mt-4 space-y-3'>
            {named.map(project => (
              <ProjectCard key={`named-${project.slug}`} project={project} />
            ))}
          </ol>
        </section>

        <section className='mt-10'>
          <h2 className='font-serif text-3xl'>{homeCopy.activeTitle}</h2>
          <ol className='mt-4 space-y-3'>
            {active.map(project => (
              <ProjectCard key={`active-${project.slug}`} project={project} />
            ))}
          </ol>
        </section>

        <section className='mt-10'>
          <h2 className='font-serif text-3xl'>{homeCopy.somedayTitle}</h2>
          <ol className='mt-4 space-y-3'>
            {someday.map(project => (
              <ProjectCard key={`someday-${project.slug}`} project={project} />
            ))}
          </ol>
        </section>

        <p className='text-foreground/60 mt-3 text-sm'>
          {formatNumber(projects.length)} projects on this page. {homeCopy.footerTail}
        </p>
      </main>
    </>
  );
}
