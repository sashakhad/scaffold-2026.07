import { ProjectList } from '@/components/ProjectList';
import { namedProjects, projects, projectsInLane } from '@/lib/projects';

const cutoff = 'Before Wednesday, Nov 11, 2026, 3:15 PM';

export default function HomePage() {
  const named = namedProjects();
  const active = projectsInLane('active');
  const someday = projectsInLane('someday');

  return (
    <main className='mx-auto w-full max-w-3xl px-5 pb-20'>
      <p className='text-tide text-sm'>{cutoff}</p>
      <h1 className='mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl'>
        What is actually in motion
      </h1>
      <p className='text-foreground/80 mt-4 max-w-2xl text-base leading-7'>
        Twenty-one projects from his project list. He named two: the album (High Tide — Bula!) and
        PIGU/GaoChao. Every other rank is a draft. A field the list does not state says Sasha to
        fill.
      </p>

      <section className='border-tide/30 bg-tide text-paper mt-8 rounded-2xl border px-5 py-4'>
        <h2 className='font-serif text-2xl'>Guardrail</h2>
        <p className='mt-2 leading-7'>
          Keep the SpaceX job unless a project hits a compelling financial threshold. Virality,
          attention, or an ego hit is not that threshold. Agreed Nov 10.
        </p>
      </section>

      <section className='mt-6 grid gap-4 md:grid-cols-2'>
        <article className='border-line bg-paper rounded-2xl border p-5'>
          <h2 className='font-serif text-2xl'>Financial</h2>
          <p className='text-foreground/80 mt-2 text-sm leading-6'>
            There is a money goal. It is not printed here. Qualitatively: enough room that a real
            experiment is not a stress, and cash matters more to him right now than fame.
          </p>
        </article>
        <article className='border-line bg-paper rounded-2xl border p-5'>
          <h2 className='font-serif text-2xl'>Play</h2>
          <p className='text-foreground/80 mt-2 text-sm leading-6'>
            Quality of life, as framed for this page: freedom to keep playing in these projects,
            with some time, without killing the joy by over-managing them.
          </p>
        </article>
      </section>

      <section className='mt-10'>
        <h2 className='font-serif text-3xl'>The two he named</h2>
        <p className='text-foreground/75 mt-2 text-sm leading-6'>
          The album first, then PIGU/GaoChao. PIGU and GaoChao share rank 2.
        </p>
        <ProjectList projects={named} />
      </section>

      <section className='mt-10'>
        <h2 className='font-serif text-3xl'>Active</h2>
        <ProjectList projects={active} />
      </section>

      <section className='mt-10'>
        <h2 className='font-serif text-3xl'>Someday</h2>
        <ProjectList projects={someday} />
      </section>

      <p className='text-foreground/60 mt-3 text-sm'>
        {projects.length} projects on this page. Family, health, and money-admin are not here.
      </p>
    </main>
  );
}
