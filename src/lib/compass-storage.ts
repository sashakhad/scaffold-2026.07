export type ReactionId = '' | 'yes' | 'pause' | 'later' | 'love';

export type SavedInterview = {
  why: string;
  byWhen: string;
  endgame: string;
  updatedAt: string;
};

export type SavedNote = {
  reaction: ReactionId;
  comment: string;
  updatedAt: string;
};

const reactions = new Set<string>(['', 'yes', 'pause', 'later', 'love']);

export function interviewStorageKey(slug: string): string {
  return `compass:interview:${slug}`;
}

export function noteStorageKey(slug: string): string {
  return `compass:note:${slug}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseInterview(raw: string): SavedInterview | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }
    if (
      typeof parsed.why !== 'string' ||
      typeof parsed.byWhen !== 'string' ||
      typeof parsed.endgame !== 'string' ||
      typeof parsed.updatedAt !== 'string'
    ) {
      return null;
    }

    return {
      why: parsed.why,
      byWhen: parsed.byWhen,
      endgame: parsed.endgame,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
}

export function parseNote(raw: string): SavedNote | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }
    if (
      typeof parsed.comment !== 'string' ||
      typeof parsed.updatedAt !== 'string' ||
      typeof parsed.reaction !== 'string' ||
      !reactions.has(parsed.reaction)
    ) {
      return null;
    }

    return {
      reaction: parsed.reaction as ReactionId,
      comment: parsed.comment,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
}

export function savedStamp(raw: string, kind: 'interview' | 'note'): string {
  const parsed = kind === 'interview' ? parseInterview(raw) : parseNote(raw);
  return parsed?.updatedAt ?? '';
}
