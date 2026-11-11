import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className='mx-auto w-full max-w-3xl px-5 py-6'>
      <Link href='/' className='text-tide font-serif text-lg tracking-tight'>
        Project Compass
      </Link>
    </header>
  );
}
