'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  interviewStorageKey,
  noteStorageKey,
  parseInterview,
  parseNote,
  savedStamp,
  type ReactionId,
} from '@/lib/compass-storage';

const LOCAL_EVENT = 'compass-local';

const interviewSchema = z.object({
  why: z.string(),
  byWhen: z.string(),
  endgame: z.string(),
});

const noteSchema = z.object({
  reaction: z.string(),
  comment: z.string(),
});

type InterviewValues = z.infer<typeof interviewSchema>;
type NoteValues = z.infer<typeof noteSchema>;

const reactionOptions: { id: Exclude<ReactionId, ''>; label: string }[] = [
  { id: 'yes', label: 'Run this' },
  { id: 'pause', label: 'Pause' },
  { id: 'later', label: 'Later' },
  { id: 'love', label: 'Keep the joy' },
];

type ProjectStudioProps = {
  slug: string;
};

function subscribeToCompassStorage(onStoreChange: () => void): () => void {
  window.addEventListener(LOCAL_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return function unsubscribe() {
    window.removeEventListener(LOCAL_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

function readStorage(key: string): string {
  return window.localStorage.getItem(key) ?? '';
}

function emptyStorage(): string {
  return '';
}

function writeCompassStorage(key: string, value: string): void {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event(LOCAL_EVENT));
}

function isReactionId(value: string): value is ReactionId {
  return (
    value === '' || value === 'yes' || value === 'pause' || value === 'later' || value === 'love'
  );
}

function SaveState({ raw, kind }: { raw: string; kind: 'interview' | 'note' }) {
  if (savedStamp(raw, kind)) {
    return <span className='text-foreground/60 text-xs'>Saved on this browser</span>;
  }

  return <span className='text-foreground/50 text-xs'>Not saved yet</span>;
}

export function ProjectStudio({ slug }: ProjectStudioProps) {
  const interviewKey = interviewStorageKey(slug);
  const noteKey = noteStorageKey(slug);
  const interviewRaw = useSyncExternalStore(
    subscribeToCompassStorage,
    function getInterview() {
      return readStorage(interviewKey);
    },
    emptyStorage
  );
  const noteRaw = useSyncExternalStore(
    subscribeToCompassStorage,
    function getNote() {
      return readStorage(noteKey);
    },
    emptyStorage
  );

  const interviewForm = useForm<InterviewValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: { why: '', byWhen: '', endgame: '' },
  });
  const noteForm = useForm<NoteValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { reaction: '', comment: '' },
  });

  useEffect(
    function restoreInterview() {
      const saved = parseInterview(interviewRaw);
      interviewForm.reset({
        why: saved?.why ?? '',
        byWhen: saved?.byWhen ?? '',
        endgame: saved?.endgame ?? '',
      });
    },
    [interviewForm, interviewRaw]
  );

  useEffect(
    function restoreNote() {
      const saved = parseNote(noteRaw);
      noteForm.reset({
        reaction: saved?.reaction ?? '',
        comment: saved?.comment ?? '',
      });
    },
    [noteForm, noteRaw]
  );

  function onSaveInterview(values: InterviewValues) {
    writeCompassStorage(
      interviewKey,
      JSON.stringify({
        why: values.why,
        byWhen: values.byWhen,
        endgame: values.endgame,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  function onSaveNote(values: NoteValues) {
    const reaction = isReactionId(values.reaction) ? values.reaction : '';
    writeCompassStorage(
      noteKey,
      JSON.stringify({
        reaction,
        comment: values.comment,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  const selectedReaction = useWatch({ control: noteForm.control, name: 'reaction' });

  return (
    <div className='grid min-w-0 gap-6 md:grid-cols-2'>
      <form
        className='border-line bg-paper min-w-0 rounded-2xl border p-5'
        onSubmit={interviewForm.handleSubmit(onSaveInterview)}
      >
        <h2 className='text-tide font-serif text-2xl'>Sasha, in his words</h2>
        <p className='text-foreground/70 mt-1 text-sm'>
          Why, by when, and the endgame. Saved in this browser only.
        </p>
        <label className='mt-4 block text-sm' htmlFor='why'>
          Why
          <textarea
            id='why'
            rows={3}
            className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2'
            {...interviewForm.register('why')}
          />
        </label>
        <label className='mt-3 block text-sm' htmlFor='by-when'>
          By when
          <input
            id='by-when'
            className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2'
            {...interviewForm.register('byWhen')}
          />
        </label>
        <label className='mt-3 block text-sm' htmlFor='endgame'>
          Endgame
          <textarea
            id='endgame'
            rows={3}
            className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2'
            {...interviewForm.register('endgame')}
          />
        </label>
        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
          <button type='submit' className='bg-tide text-paper rounded-full px-4 py-2 text-sm'>
            Save answers
          </button>
          <SaveState raw={interviewRaw} kind='interview' />
        </div>
      </form>

      <form
        className='border-line bg-paper min-w-0 rounded-2xl border p-5'
        onSubmit={noteForm.handleSubmit(onSaveNote)}
      >
        <h2 className='text-tide font-serif text-2xl'>Melissa</h2>
        <p className='text-foreground/70 mt-1 text-sm'>
          A reaction and a note. Same browser, no account.
        </p>
        <div className='mt-4 flex flex-wrap gap-2'>
          {reactionOptions.map(function renderReaction(option) {
            const selected = selectedReaction === option.id;
            return (
              <button
                key={option.id}
                type='button'
                className={
                  selected
                    ? 'bg-tide text-paper rounded-full px-3 py-1.5 text-sm'
                    : 'border-line rounded-full border px-3 py-1.5 text-sm'
                }
                onClick={function selectReaction() {
                  noteForm.setValue('reaction', option.id);
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <label className='mt-4 block text-sm' htmlFor='comment'>
          Note
          <textarea
            id='comment'
            rows={5}
            className='border-line mt-1 w-full max-w-full rounded-lg border bg-white px-3 py-2'
            {...noteForm.register('comment')}
          />
        </label>
        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
          <button type='submit' className='bg-tide text-paper rounded-full px-4 py-2 text-sm'>
            Save note
          </button>
          <SaveState raw={noteRaw} kind='note' />
        </div>
      </form>
    </div>
  );
}
