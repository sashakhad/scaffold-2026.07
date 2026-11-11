'use client';

import { useState, useSyncExternalStore } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const sashaSchema = z.object({
  why: z.string(),
  byWhen: z.string(),
  endgame: z.string(),
});

const melissaSchema = z.object({
  reaction: z.enum(['run', 'pause', 'later', 'joy', '']),
  note: z.string(),
});

type SashaNotes = z.infer<typeof sashaSchema>;
type MelissaNotes = z.infer<typeof melissaSchema>;
type NotesStore = {
  sasha: SashaNotes | null;
  melissa: MelissaNotes | null;
};

const emptySasha: SashaNotes = { why: '', byWhen: '', endgame: '' };
const emptyMelissa: MelissaNotes = { reaction: '', note: '' };
const emptyStore: NotesStore = { sasha: null, melissa: null };

const reactions: { id: Exclude<MelissaNotes['reaction'], ''>; label: string }[] = [
  { id: 'run', label: 'Run this' },
  { id: 'pause', label: 'Pause' },
  { id: 'later', label: 'Later' },
  { id: 'joy', label: 'Keep the joy' },
];

type ProjectNotesProps = {
  slug: string;
};

const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string; value: NotesStore }>();

function storageKey(slug: string, who: 'sasha' | 'melissa'): string {
  return `project-compass:${slug}:${who}`;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function readJson(raw: string | null): unknown {
  if (raw === null) {
    return null;
  }
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function readStore(slug: string): NotesStore {
  const sashaParsed = sashaSchema.safeParse(
    readJson(window.localStorage.getItem(storageKey(slug, 'sasha')))
  );
  const melissaParsed = melissaSchema.safeParse(
    readJson(window.localStorage.getItem(storageKey(slug, 'melissa')))
  );
  const sasha = sashaParsed.success ? sashaParsed.data : null;
  const melissa = melissaParsed.success ? melissaParsed.data : null;
  if (!sasha && !melissa) {
    return emptyStore;
  }
  return { sasha, melissa };
}

function getSnapshot(slug: string): NotesStore {
  const raw = `${window.localStorage.getItem(storageKey(slug, 'sasha')) ?? ''}\u0000${window.localStorage.getItem(storageKey(slug, 'melissa')) ?? ''}`;
  const existing = cache.get(slug);
  if (existing && existing.raw === raw) {
    return existing.value;
  }
  const value = readStore(slug);
  cache.set(slug, { raw, value });
  return value;
}

function getServerSnapshot(): NotesStore {
  return emptyStore;
}

function useStoredNotes(slug: string): NotesStore {
  return useSyncExternalStore(subscribe, () => getSnapshot(slug), getServerSnapshot);
}

function saveNotes(slug: string, who: 'sasha' | 'melissa', value: SashaNotes | MelissaNotes): void {
  window.localStorage.setItem(storageKey(slug, who), JSON.stringify(value));
  cache.delete(slug);
  emit();
}

type NotesFormsProps = {
  slug: string;
  stored: NotesStore;
};

function NotesForms({ slug, stored }: NotesFormsProps) {
  const [selectedReaction, setSelectedReaction] = useState<MelissaNotes['reaction']>(
    stored.melissa?.reaction ?? ''
  );

  const sashaForm = useForm<SashaNotes>({
    resolver: zodResolver(sashaSchema),
    defaultValues: stored.sasha ?? emptySasha,
  });

  const melissaForm = useForm<MelissaNotes>({
    resolver: zodResolver(melissaSchema),
    defaultValues: stored.melissa ?? emptyMelissa,
  });

  function onSaveSasha(values: SashaNotes) {
    saveNotes(slug, 'sasha', values);
  }

  function onSaveMelissa(values: MelissaNotes) {
    saveNotes(slug, 'melissa', { ...values, reaction: selectedReaction });
  }

  function chooseReaction(reaction: MelissaNotes['reaction']) {
    const next = selectedReaction === reaction ? '' : reaction;
    setSelectedReaction(next);
    melissaForm.setValue('reaction', next, { shouldDirty: true });
  }

  const sashaStatus = stored.sasha ? 'Saved in this browser' : 'Not saved yet';
  const melissaStatus = stored.melissa ? 'Saved in this browser' : 'Not saved yet';

  return (
    <div className='mt-10 space-y-4'>
      <Form {...sashaForm}>
        <form
          onSubmit={sashaForm.handleSubmit(onSaveSasha)}
          className='border-line bg-paper min-w-0 rounded-2xl border p-5'
          noValidate
        >
          <h2 className='text-tide font-serif text-2xl'>Sasha, in his words</h2>
          <p className='text-foreground/70 mt-1 text-sm'>
            Why, by when, and the endgame. Saved in this browser only.
          </p>
          <FormField
            control={sashaForm.control}
            name='why'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Why</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2 text-base'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={sashaForm.control}
            name='byWhen'
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel>By when</FormLabel>
                <FormControl>
                  <Input {...field} className='border-line mt-1 bg-white' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={sashaForm.control}
            name='endgame'
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel>Endgame</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2 text-base'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='mt-4 flex flex-wrap items-center gap-3'>
            <Button type='submit' className='bg-tide text-paper hover:bg-tide/90 rounded-full px-4'>
              Save answers
            </Button>
            <span className='text-foreground/50 text-xs'>{sashaStatus}</span>
          </div>
        </form>
      </Form>

      <Form {...melissaForm}>
        <form
          onSubmit={melissaForm.handleSubmit(onSaveMelissa)}
          className='border-line bg-paper min-w-0 rounded-2xl border p-5'
          noValidate
        >
          <h2 className='text-tide font-serif text-2xl'>Melissa</h2>
          <p className='text-foreground/70 mt-1 text-sm'>
            A reaction and a note. Same browser, no account.
          </p>
          <div className='mt-4 flex flex-wrap gap-2' role='group' aria-label='Melissa reaction'>
            {reactions.map(reaction => {
              const selected = selectedReaction === reaction.id;
              return (
                <Button
                  key={reaction.id}
                  type='button'
                  variant='outline'
                  aria-pressed={selected}
                  onClick={() => {
                    chooseReaction(reaction.id);
                  }}
                  className={
                    selected
                      ? 'border-tide bg-tide text-paper hover:bg-tide/90 hover:text-paper rounded-full px-3'
                      : 'border-line bg-paper text-foreground hover:border-tide rounded-full px-3'
                  }
                >
                  {reaction.label}
                </Button>
              );
            })}
          </div>
          <FormField
            control={melissaForm.control}
            name='note'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2 text-base'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='mt-4 flex flex-wrap items-center gap-3'>
            <Button type='submit' className='bg-tide text-paper hover:bg-tide/90 rounded-full px-4'>
              Save note
            </Button>
            <span className='text-foreground/50 text-xs'>{melissaStatus}</span>
          </div>
        </form>
      </Form>
    </div>
  );
}

export function ProjectNotes({ slug }: ProjectNotesProps) {
  const stored = useStoredNotes(slug);
  const formKey = `${stored.sasha ? 'sasha' : 'new'}-${stored.melissa ? 'melissa' : 'new'}`;
  return <NotesForms key={`${slug}-${formKey}`} slug={slug} stored={stored} />;
}
