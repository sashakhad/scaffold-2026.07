import Link from 'next/link';

type SiteHeaderProps = {
  showAllProjects?: boolean;
};

export function SiteHeader({ showAllProjects = false }: SiteHeaderProps) {
  return (
    <header className='mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-6'>
      <Link href='/' className='text-tide font-serif text-lg tracking-tight'>
        Project Compass
      </Link>
      {showAllProjects ? (
        <Link href='/' className='text-tide text-sm underline-offset-4 hover:underline'>
          All projects
        </Link>
      ) : null}
    </header>
  );
}
