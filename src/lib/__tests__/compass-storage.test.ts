import { describe, expect, it } from 'vitest';

import {
  interviewStorageKey,
  noteStorageKey,
  parseInterview,
  parseNote,
  savedStamp,
} from '../compass-storage';

describe('compass storage', () => {
  it('round-trips an interview saved in this browser', () => {
    const raw = JSON.stringify({
      why: 'The album',
      byWhen: 'December',
      endgame: 'Release',
      updatedAt: '2026-11-11T23:15:00.000Z',
    });

    expect(interviewStorageKey('high-tide')).toBe('compass:interview:high-tide');
    expect(parseInterview(raw)?.why).toBe('The album');
    expect(savedStamp(raw, 'interview')).toBe('2026-11-11T23:15:00.000Z');
  });

  it('rejects a note with an unknown reaction', () => {
    const raw = JSON.stringify({
      reaction: 'ship-it',
      comment: 'no',
      updatedAt: '2026-11-11T23:15:00.000Z',
    });

    expect(noteStorageKey('pigu')).toBe('compass:note:pigu');
    expect(parseNote(raw)).toBeNull();
    expect(parseInterview('not-json')).toBeNull();
    expect(savedStamp('', 'note')).toBe('');
  });
});
