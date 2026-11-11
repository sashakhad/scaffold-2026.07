export type ProjectLane = 'active' | 'someday';

export type Project = {
  slug: string;
  name: string;
  rank: number;
  lane: ProjectLane;
  named: boolean;
  summary: string;
  source: string;
  whatItIs: string;
  status: string;
};

export const homeCopy = {
  eyebrow: 'Before Wednesday, Nov 11, 2026, 3:15 PM',
  title: 'What is actually in motion',
  intro:
    'Twenty-one projects from his project list. He named two: the album (High Tide — Bula!) and PIGU/Gaochao. Every other rank is a draft. A field the list does not state says Sasha to fill.',
  guardrailTitle: 'Guardrail',
  guardrail:
    'Keep the SpaceX job unless a project hits a compelling financial threshold. Virality, attention, or an ego hit is not that threshold. Agreed Nov 10.',
  financialTitle: 'Financial',
  financial:
    'There is a money goal. It is not printed here. Qualitatively: enough room that a real experiment is not a stress, and cash matters more to him right now than fame.',
  playTitle: 'Play',
  play: 'Quality of life, as framed for this page: freedom to keep playing in these projects, with some time, without killing the joy by over-managing them.',
  namedTitle: 'The two he named',
  namedLede: 'The album first, then PIGU/Gaochao. PIGU and Gaochao share rank 2.',
  activeTitle: 'Active',
  somedayTitle: 'Someday',
  footerTail: 'Family, health, and money-admin are not here.',
  openFieldPlaceholder: 'Sasha to fill',
} as const;

export const openFields = [
  'Purpose',
  'By when',
  'Endgame',
  'Next actions',
  'Who he needs',
  'Money, roughly',
  'Comparables',
  'Where it meets the two goals',
] as const;

export const projects: Project[] = [
  {
    slug: 'high-tide',
    name: 'High Tide — Bula!',
    rank: 1,
    lane: 'active',
    named: true,
    summary: 'High Tide album release and promo — 13-track Bula!, plus singles and the band site.',
    source: 'projects/high-tide-bula-distrokid-2026-10/',
    whatItIs: 'High Tide album release and promo — 13-track Bula!, plus singles and the band site.',
    status:
      'Album delivered to stores; release Friday, Dec 11, 2026. Singles: Kava on Carl Fri Nov 20, Dance of the Fire Snake Fri Nov 27, Átash Ábi Fri Dec 4. SubmitHub outreach is underway (including The Naming batch sent Nov 10). Live site and share kits are at musicbyhightide.com. Engineer credits were verified live Nov 10.',
  },
  {
    slug: 'pigu',
    name: 'PIGU',
    rank: 2,
    lane: 'active',
    named: true,
    summary: 'Launch clothing sub-house of the Gaochao universe — deadpan luxury lifestyle brand.',
    source:
      'pigu-by-gaochao/ (current draft: pigu-by-gaochao/trademark/2026-11-09-uspto-itu-review-package-DRAFT/v4/)',
    whatItIs:
      'Launch clothing sub-house of the Gaochao universe — deadpan luxury lifestyle brand (屁股, "butt," implied, never overt). Word mark and wordless two-arch design mark, Class 25.',
    status:
      'USPTO ITU review package v4 is a draft: nothing ordered, filed, signed, or paid. Waiting on Sasha to review and decide whether to proceed. Helvetica Lake versions stay in v3/ as the fallback.',
  },
  {
    slug: 'gaochao',
    name: 'Gaochao',
    rank: 2,
    lane: 'active',
    named: true,
    summary: 'Parent brand universe for PIGU and later sub-houses.',
    source:
      'pigu-by-gaochao/ and pigu-by-gaochao/trademark/2026-11-09-uspto-itu-review-package-DRAFT/v4/',
    whatItIs:
      'Parent brand universe (高潮 / Gaochao) for PIGU and later sub-houses, plus a planned new Delaware LLC, Gaochao LLC, with Sasha as sole member.',
    status:
      'Pre-formation, fun/silly project. v4 is LLC-first. A Delaware name search on Nov 10, 2026 found no matches (per the PIGU lane). IncNow order worksheet is drafted only — do not submit or pay from it.',
  },
  {
    slug: 'high-tide-photos',
    name: 'High Tide band photos',
    rank: 3,
    lane: 'active',
    named: false,
    summary: 'Band photo set used for High Tide press and share kits.',
    source: 'projects/high-tide-band-photos/',
    whatItIs: 'Band photo set used for High Tide press and share kits.',
    status: '18 photos from Sept 6, 2025, filed for the Bula! campaign.',
  },
  {
    slug: 'music-for-vegans',
    name: 'Music for Vegans (MFV)',
    rank: 4,
    lane: 'active',
    named: false,
    summary: 'Suno-made MFV album project — full-song masters, stem work, and the listen site.',
    source: 'projects/mfv-1nvaders-stems-2026-09/',
    whatItIs:
      "Sasha's Suno-made MFV album project — full-song masters, stem work, and the listen site.",
    status:
      'Lane owner Dumbo. Full-song WAV pack is about 36 of 41 (not multi-track stems). Still missing digs for Tickle, Baklavallah, Mama Papaya, and Papay4huasca; nect4r and nØ wheyyy are on hold. Some real multi-track stems already exist. Nothing goes to Javi until Sasha says yes. Site: https://music-for-vegans.vercel.app/',
  },
  {
    slug: '1nvaders',
    name: '1nvaders',
    rank: 5,
    lane: 'active',
    named: false,
    summary: 'Companion Suno album to MFV, with real multi-track stem packs.',
    source:
      'projects/mfv-1nvaders-stems-2026-09/ (see also README-1nvaders-stems.md and stems-multitrack/)',
    whatItIs: 'Companion Suno album to MFV, with real multi-track stem packs.',
    status:
      'Multi-stem packs for inv-01 through inv-11 are done (filed Oct 6, 2026). Send to Javi is still waiting on Sasha.',
  },
  {
    slug: 'mfv-essay',
    name: 'MFV essay',
    rank: 6,
    lane: 'active',
    named: false,
    summary: 'Behind-the-album essay about making MFV with Suno.',
    source: 'projects/mfv-1nvaders-stems-2026-09/blog-post/',
    whatItIs:
      'Behind-the-album essay about making MFV with Suno. Title: "Suno Made Every Sound. I Made Every Call."',
    status:
      'Merged Nov 4, 2026 to the holopeño repo as a hidden draft (draft: true, noindex) at https://holopeno.vercel.app/posts/suno-made-every-sound. No deadline. An older NOW.md someday line still points at draft v4; the Nov 4 note supersedes that for filing status.',
  },
  {
    slug: 'epkify',
    name: 'EPKify',
    rank: 7,
    lane: 'active',
    named: false,
    summary: 'Product for building electronic press kits.',
    source:
      'projects/epkify-agentic-mcp/ (also projects/epkify-growth/, projects/epkify-signup-attribution-2026/, projects/epkify-resend-2026-10-02/, projects/epkify-product-direction-2026-10-02.md)',
    whatItIs:
      'Product for building electronic press kits (repo HelveticaLake/epkify; live product at epkify.com).',
    status:
      'Open. October 2 product direction: creator interviews, live Stripe, unlisted and password-protected EPKs, speaker-kit test, PDFs, and AI assembly. Out unless Sasha says otherwise: custom domains, team collaboration, a public marketplace, a rename, and a generic kit editor. Draft pull request 100 (agentic MCP) is open and not merged; the flag stays off in production. Stripe live switch is still open. Growth and signup-attribution trails are on file.',
  },
  {
    slug: 'kelvin',
    name: 'Kelvin',
    rank: 8,
    lane: 'active',
    named: false,
    summary: "King Louie's parody energy-drink brand, sold only at Shrimp Club.",
    source: 'Not filed in Mac PKS as of Nov 10, 2026.',
    whatItIs:
      "King Louie's parody energy-drink brand, sold only at Shrimp Club. The joke is a temperature conversion (Kelvin = Celsius + 273.15). No health or athletic claims; pre-orders are requests, nothing is charged.",
    status:
      'Creative/business parody site and can campaign exist as working files, but this has not been filed as a PKS project folder yet (search of projects/ and top-level venture folders on Nov 10 found no Kelvin directory). Closest PKS link is the Shrimp Club merch receipt.',
  },
  {
    slug: 'shrimp-club',
    name: 'Shrimp Club',
    rank: 9,
    lane: 'active',
    named: false,
    summary:
      'Playful brand world around King Louie — merch site plus a private music-pilot concept.',
    source:
      'life-admin/receipts/2026-10-27-zazzle-shrimp-club-mug-and-plus-cancel/ (merch); projects/suno-album-factory-2026-11/ (album pilot)',
    whatItIs:
      'Playful brand world around King Louie — merch site plus a private music-pilot concept.',
    status:
      'Merch page deployed at https://shrimpclub.vercel.app/merch (repo sashakhad/shrimp-club). A custom King Louie mug was ordered Oct 27, 2026; NOW.md was watching delivery in the Nov 5–9 window. Separately, the Suno album factory\'s recommended private 5-track pilot is a Shrimp Club concept called "Gloved Service" (nothing generated or shared until Sasha says go).',
  },
  {
    slug: 'dad-bod',
    name: 'Dad Bod / Pleasurable Weight Gain',
    rank: 10,
    lane: 'active',
    named: false,
    summary: 'Book project under pen name Teddy Rowe / The Soft Armor.',
    source: 'projects/dad-bod-book/',
    whatItIs:
      'Book project under pen name Teddy Rowe / The Soft Armor, published via KDP and Spotify for Authors.',
    status:
      'Kindle and paperback editions are live (paperback cover fix uploaded Oct 21). A 2nd-edition writing direction is still unpicked; full audiobook narration waits on that (NOW.md someday/parked line). Illustrated 2nd-ed interior, A+ content, and ensemble art samples are prepared and not uploaded.',
  },
  {
    slug: 'bugs-buns',
    name: 'Bugs, Buns, and Other Crunchy Comforts',
    rank: 11,
    lane: 'active',
    named: false,
    summary: 'Illustrated cookbook (chef Orsa).',
    source: 'projects/bugs-buns-cookbook/',
    whatItIs: 'Illustrated cookbook (chef Orsa).',
    status:
      'Paperback published Oct 21, 2026 (republished live Oct 24); Kindle edition live Oct 20. Domain bugsandbuns.club is registered. A+ content and a Look Inside rebuild (including a later chef-Orsa consistency pass) are prepared and not uploaded.',
  },
  {
    slug: 'holopeno',
    name: 'holopeño',
    rank: 12,
    lane: 'active',
    named: false,
    summary: 'Rebrand of the Must Love LLaMas blog and X account @mustlovellamas.',
    source: 'projects/holopeno-rebrand-2026-11/',
    whatItIs:
      "Rebrand of the Must Love LLaMas blog and X account @mustlovellamas into holopeño (always lowercase, with the ñ). Not Sasha's personal blog (blog.sashabayan.com).",
    status:
      'Live at https://holopeno.vercel.app (repo sashakhad/holopeno). Post migration and logo are in progress. Next: Sasha picks a bio and pinned post; other handle, domain, and "keep mustlovellamas alongside?" decisions are still open. No deadline.',
  },
  {
    slug: 'suno-album-factory',
    name: 'Suno album factory (Clumbus)',
    rank: 13,
    lane: 'active',
    named: false,
    summary: 'A repeatable album-making pipeline, from concept through a mobile ranking app.',
    source: 'projects/suno-album-factory-2026-11/',
    whatItIs:
      'A repeatable album-making pipeline: concept, track names, parallel prompts, Suno renders, downloads, and a mobile ranking app.',
    status:
      'Open, started Nov 2, 2026. Clumbus owns music facts (this lane replaced the retired Suno album factory bot on Nov 4). Suno Premier is active (renews Dec 4). Repo sashakhad/album-kit exists and is private until Sasha\'s passkey makes it public. HOLD: no generations until Sasha reviews the plan Page and says go. Recommended first pilot is the private Shrimp Club 5-track set ("Gloved Service").',
  },
  {
    slug: 'alameda-brief',
    name: 'The Alameda Brief',
    rank: 14,
    lane: 'active',
    named: false,
    summary: 'Daily local-news digest for Alameda, assembled from public sources.',
    source: 'Not filed in Mac PKS as of Nov 10, 2026.',
    whatItIs:
      'Daily local-news digest for Alameda, assembled from public city, ferry, power, and neighborhood sources (Alameda Post, ALAMEDUH, City agendas, SF Bay Ferry, AMP, and others).',
    status:
      'Built as an ongoing pipeline with a hard rule: never repeat stories day to day; skip a day if nothing new landed. Source verification and a Gmail/signup checklist were prepared Oct 24, 2026. This has not been filed as a PKS project folder yet.',
  },
  {
    slug: 'aurelia',
    name: 'Aurelia mix',
    rank: 15,
    lane: 'active',
    named: false,
    summary: 'Sitar-and-bass album with Sam Suggs.',
    source: 'projects/aurelia-mix-2026-11/',
    whatItIs:
      'Sitar-and-bass album with Sam Suggs (working title may also be "Explorations"), recorded May 10–12, 2025 at Blue House Productions.',
    status:
      "Open. Jeff Gruber (the recording engineer) offered to mix. Sasha's draft asking him to do that is on Sasha's card and has not been sent. Distribution prep comes after the mix. Blocked on Sasha sending the draft. No deadline.",
  },
  {
    slug: 'social-comedy-bits',
    name: 'Social comedy bits',
    rank: 16,
    lane: 'active',
    named: false,
    summary: 'Party and social charm bits — prop jokes and misdirects, not standup.',
    source: 'projects/social-comedy-bits/',
    whatItIs:
      'Party and social charm bits — prop jokes and misdirects for rooms and gatherings, not standup and not a content calendar.',
    status:
      'Open. Research pack and a locked starter kit are filed (Sept 19, 2026). Mini-Coke is retired as an example. No scheduled routine unless Sasha asks.',
  },
  {
    slug: 'sitar-javier',
    name: 'Sitar with Javier mixes',
    rank: 17,
    lane: 'active',
    named: false,
    summary: "Eight quick Javi mixes of Sasha's sitar demos.",
    source: 'projects/sitar-with-javier-mixes/',
    whatItIs:
      "Eight quick Javi mixes of Sasha's sitar demos (sitar with beats, sitar with drums, and solo sitar).",
    status:
      'Kept so they can be published on a personal website / music page. No deadline on file.',
  },
  {
    slug: 'inbox-zero',
    name: 'Inbox-zero blog post',
    rank: 18,
    lane: 'someday',
    named: false,
    summary: 'Essay draft titled "I Thought Inbox Zero Was a Myth Until Grok Bot".',
    source: 'projects/inbox-zero-blog/blog-post/',
    whatItIs:
      'Essay draft titled "I Thought Inbox Zero Was a Myth Until Grok Bot" (byline Sasha Khadivian).',
    status:
      "Parked for Sasha's review. Draft v2 is about 1,264 words, with preview and points files. No deadline. Listed on the NOW.md someday/parked line.",
  },
  {
    slug: 'mfv-walkthrough',
    name: 'MFV walkthrough site',
    rank: 19,
    lane: 'someday',
    named: false,
    summary: 'A private walkthrough site for the MFV essay, tracks, and voting rounds.',
    source: 'projects/mfv-1nvaders-stems-2026-09/blog-post/',
    whatItIs:
      'After the MFV essay reads right, publish it as a private walkthrough site: the post plus playable tracks, then a step-by-step of each voting round.',
    status:
      'Parked. Candidate URL musicforvegans.com or another; repo stays private; not public until Sasha says go.',
  },
  {
    slug: 'blog-book-library',
    name: 'Blog book-library normalization',
    rank: 20,
    lane: 'someday',
    named: false,
    summary: "A stable publishing format for the blog's book-highlight library.",
    source: 'projects/queue/blog-book-library-normalization.md',
    whatItIs:
      "Give the blog's book-highlight / quote library a stable, validated publishing format (book-quotes/v1) instead of hardcoded metadata and per-book pages.",
    status:
      'Queue idea (added 2026-07-17), not promoted to a PARA project. Medium-effort guess. Depends on the PKS book-highlights export contract.',
  },
];

export function getProject(slug: string): Project | undefined {
  for (const project of projects) {
    if (project.slug === slug) {
      return project;
    }
  }
  return undefined;
}

export function projectsInLane(lane: ProjectLane): Project[] {
  const matches: Project[] = [];
  for (const project of projects) {
    if (project.lane === lane) {
      matches.push(project);
    }
  }
  return matches;
}

export function namedProjects(): Project[] {
  const matches: Project[] = [];
  for (const project of projects) {
    if (project.named) {
      matches.push(project);
    }
  }
  return matches;
}

export function laneLabel(lane: ProjectLane): string {
  if (lane === 'active') {
    return 'Active';
  }
  return 'Someday';
}
