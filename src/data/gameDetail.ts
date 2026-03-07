export const gameDetail = {
  id: "jam-stack-towers",
  title: "Jam Stack Towers",
  sourceGameA: {
    title: "Block Jam",
    gradient: "bg-gradient-to-br from-pink-400 to-rose-500",
  },
  sourceGameB: {
    title: "Bolt Sort Puzzle",
    gradient: "bg-gradient-to-br from-slate-400 to-slate-600",
  },
  resultGame: {
    title: "Jam Stack Towers",
    gradient: "bg-gradient-to-br from-violet-400 to-purple-600",
  },
  infoCards: [
    {
      id: "core-setup",
      title: "Core Setup",
      body: "A dense, multi-layered isometric grid of colored block-characters sits at the top (Base Layout). The bottom area features 4 vertical stacking podiums instead of a linear parking bar.",
    },
    {
      id: "rules",
      title: "Rules",
      items: [
        "Tap an 'awake' (unblocked) character from the top grid to move it.",
        "The character flies to the bottom podiums.",
        "Smart Sorting: The character automatically lands on a podium that already has the same color, or an empty podium.",
        "If all podiums are occupied by different colors and the tapped character matches none, the move fails (or triggers Game Over).",
        "When a podium accumulates a full stack (3 characters) of the same color, the stack clears and frees the podium.",
        "Sleeping characters in the grid wake up as blockers in front of them are removed.",
      ],
    },
    {
      id: "challenge",
      title: "Challenge",
      body: "The mismatch between the available colors on the grid surface and the specific color requirements of the active podium stacks.",
    },
    {
      id: "innovation",
      title: "Innovation",
      body: "Replaces the forgiving linear buffer of Block Jam with strict 'Bolt Sort' style vertical stacks, turning the game into a digging puzzle where move order is dictated by active sorting piles.",
    },
  ],
  objective:
    "Clear the entire crowd of characters by sorting them into valid color stacks.",
};

export type InfoCard = {
  id: string;
  title: string;
  body?: string;
  items?: string[];
};

export const queueItems = [
  {
    id: "jam-stack-towers",
    title: "Jam Stack Towers",
    subtitle: "Block Jam + Bolt Sort Puzzle",
    gradient: "bg-gradient-to-br from-violet-400 to-purple-600",
    initials: "JS",
  },
  {
    id: "terminal-jam",
    title: "Terminal Jam: Bus Order",
    subtitle: "Block Jam + Sky Rush",
    gradient: "bg-gradient-to-br from-emerald-400 to-teal-500",
    initials: "TJ",
  },
  {
    id: "arrow-jam-match",
    title: "Arrow Jam Match",
    subtitle: "Block Jam + Crowd Express",
    gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
    initials: "AJ",
  },
];

export type InspirationItem = {
  name: string;
  gradient: string;
  initials: string;
};

export type GameCard = {
  id: string;
  title: string;
  points: number;
  matchType: "Exact Match" | "Partial" | "Keyword";
  developer: string;
  date: string;
  downloads: string;
  revenue: string;
  inspirations: InspirationItem[];
  description: string;
  iconGradient: string;
  iconInitials: string;
  priority: 2 | 3;
};

export const relatedGames: GameCard[] = [
  {
    id: "bloom-sort-3d",
    title: "Bloom Sort 3D",
    points: 200,
    matchType: "Exact Match",
    developer: "Happy Bat",
    date: "Sep 11, 2025",
    downloads: "> 10,000",
    revenue: "$< 5,000",
    inspirations: [
      { name: "Collecti...", gradient: "bg-gradient-to-br from-red-400 to-rose-500", initials: "C" },
      { name: "Block Jam", gradient: "bg-gradient-to-br from-blue-400 to-blue-600", initials: "B" },
      { name: "Flower...", gradient: "bg-gradient-to-br from-green-400 to-emerald-500", initials: "F" },
    ],
    description:
      "Love playing relaxing puzzle games? Bloom Sort 3D is a satisfying sort puzzle that blends color matching with beautiful blooming visuals.",
    iconGradient: "bg-gradient-to-br from-yellow-300 to-amber-500",
    iconInitials: "BS",
    priority: 2,
  },
  {
    id: "bolt-stack",
    title: "Bolt Stack",
    points: 200,
    matchType: "Exact Match",
    developer: "HOMA GAMES",
    date: "Mar 08, 2025",
    downloads: "> 10,000",
    revenue: "$< 5,000",
    inspirations: [
      { name: "Nut n sort", gradient: "bg-gradient-to-br from-violet-400 to-purple-600", initials: "N" },
      { name: "Block...", gradient: "bg-gradient-to-br from-blue-400 to-blue-600", initials: "B" },
    ],
    description:
      "In this fun and brainy game, try to sort the nuts correctly to finish the levels. Each level will challenge your logical thinking.",
    iconGradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
    iconInitials: "BT",
    priority: 2,
  },
  {
    id: "crowd-valley",
    title: "Crowd Valley",
    points: 200,
    matchType: "Exact Match",
    developer: "Full Fat Productions Ltd",
    date: "May 23, 2025",
    downloads: "< 5,000",
    revenue: "",
    inspirations: [
      { name: "Tetra Bus", gradient: "bg-gradient-to-br from-red-400 to-rose-500", initials: "T" },
      { name: "Boats", gradient: "bg-gradient-to-br from-green-400 to-emerald-500", initials: "B" },
    ],
    description:
      "Gather all the animals and make new friends! Run around stunning environments around the world.",
    iconGradient: "bg-gradient-to-br from-red-400 to-pink-500",
    iconInitials: "CV",
    priority: 2,
  },
  {
    id: "hexa-jam",
    title: "Hexa Jam",
    points: 200,
    matchType: "Exact Match",
    developer: "Boomie Studio",
    date: "Aug 26, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Hexa sort", gradient: "bg-gradient-to-br from-yellow-400 to-amber-500", initials: "H" },
      { name: "Hole...", gradient: "bg-gradient-to-br from-violet-400 to-purple-600", initials: "H" },
      { name: "Block jam", gradient: "bg-gradient-to-br from-blue-400 to-blue-600", initials: "B" },
    ],
    description:
      "Welcome to Hexa Jam – the ultimate ASMR-rich match-3 puzzle game with an out-of-this-world twist.",
    iconGradient: "bg-gradient-to-br from-violet-400 to-indigo-600",
    iconInitials: "HJ",
    priority: 2,
  },
  {
    id: "hole-puzzle",
    title: "Hole Puzzle: Block Jam...",
    points: 200,
    matchType: "Exact Match",
    developer: "Think Different FC.",
    date: "Oct 09, 2025",
    downloads: "< 5,000",
    revenue: "",
    inspirations: [
      { name: "Hole...", gradient: "bg-gradient-to-br from-red-400 to-rose-500", initials: "H" },
      { name: "block jam", gradient: "bg-gradient-to-br from-blue-400 to-blue-600", initials: "B" },
    ],
    description:
      "Hole Puzzle: Simple, Strategic, and Seriously Addictive! Get ready to dive into Hole Puzzle.",
    iconGradient: "bg-gradient-to-br from-green-400 to-teal-500",
    iconInitials: "HP",
    priority: 2,
  },
  {
    id: "hoops-loop",
    title: "Hoops Loop",
    points: 200,
    matchType: "Exact Match",
    developer: "Ataberk Atik",
    date: "Sep 10, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Block jam", gradient: "bg-gradient-to-br from-blue-400 to-blue-600", initials: "B" },
      { name: "hoops", gradient: "bg-gradient-to-br from-orange-400 to-amber-500", initials: "H" },
    ],
    description:
      "Hoops Loop is a puzzle game where you sort hoops by color. Tap and hold the hoops to launch them.",
    iconGradient: "bg-gradient-to-br from-orange-400 to-yellow-500",
    iconInitials: "HL",
    priority: 2,
  },
  {
    id: "jam-madness-1",
    title: "Jam Madness: Color Sort...",
    points: 200,
    matchType: "Exact Match",
    developer: "Twitchtime Tech",
    date: "Apr 01, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Park...", gradient: "bg-gradient-to-br from-red-400 to-rose-500", initials: "P" },
      { name: "Boats", gradient: "bg-gradient-to-br from-green-400 to-emerald-500", initials: "B" },
    ],
    description:
      "A thrilling world of Jam Madness, where traffic chaos meets strategy in this vibrant Color Sort.",
    iconGradient: "bg-gradient-to-br from-pink-400 to-rose-600",
    iconInitials: "JM",
    priority: 2,
  },
  {
    id: "jam-madness-2",
    title: "Jam Madness: Color Sort...",
    points: 200,
    matchType: "Exact Match",
    developer: "Twitchtime Tech",
    date: "Apr 01, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Park...", gradient: "bg-gradient-to-br from-red-400 to-rose-500", initials: "P" },
      { name: "Boats", gradient: "bg-gradient-to-br from-green-400 to-emerald-500", initials: "B" },
    ],
    description:
      "A thrilling world of Jam Madness, where traffic chaos meets strategy in this vibrant Color Sort.",
    iconGradient: "bg-gradient-to-br from-pink-400 to-fuchsia-600",
    iconInitials: "JM",
    priority: 2,
  },
  {
    id: "goods-deal-match",
    title: "Goods Deal Match",
    points: 90,
    matchType: "Keyword",
    developer: "Mehmet Fatih Sahin",
    date: "Jun 27, 2025",
    downloads: "< 5,000",
    revenue: "",
    inspirations: [
      { name: "Goods...", gradient: "bg-gradient-to-br from-amber-400 to-orange-500", initials: "G" },
      { name: "Card...", gradient: "bg-gradient-to-br from-indigo-400 to-violet-500", initials: "C" },
    ],
    description:
      "Goods Deal Match is a fun and satisfying sorting game where you match items and earn money!",
    iconGradient: "bg-gradient-to-br from-amber-400 to-orange-500",
    iconInitials: "GD",
    priority: 3,
  },
  {
    id: "aqua-slide-frenzy",
    title: "Aqua Slide Frenzy",
    points: 0,
    matchType: "Partial",
    developer: "Aden Games",
    date: "Jun 05, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Color...", gradient: "bg-gradient-to-br from-blue-400 to-cyan-500", initials: "C" },
      { name: "Aqua...", gradient: "bg-gradient-to-br from-cyan-400 to-teal-500", initials: "A" },
    ],
    description:
      "Dive into the colorful chaos of Aqua Slide Frenzy, the fast-paced, drag-and-match puzzle game.",
    iconGradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    iconInitials: "AF",
    priority: 3,
  },
  {
    id: "battery-lab",
    title: "Battery Lab",
    points: 0,
    matchType: "Partial",
    developer: "Valery Burachonak",
    date: "Jun 28, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Color...", gradient: "bg-gradient-to-br from-blue-400 to-cyan-500", initials: "C" },
      { name: "Battery", gradient: "bg-gradient-to-br from-green-400 to-emerald-500", initials: "B" },
    ],
    description:
      "Use your laser and charge colorful batteries! Battery Lab is a unique and interesting puzzle game.",
    iconGradient: "bg-gradient-to-br from-yellow-400 to-green-500",
    iconInitials: "BL",
    priority: 3,
  },
  {
    id: "blast-bits",
    title: "Blast Bits",
    points: 0,
    matchType: "Partial",
    developer: "Mousetap Games",
    date: "Jul 04, 2025",
    downloads: "",
    revenue: "",
    inspirations: [
      { name: "Color...", gradient: "bg-gradient-to-br from-blue-400 to-cyan-500", initials: "C" },
      { name: "This is...", gradient: "bg-gradient-to-br from-orange-400 to-red-500", initials: "T" },
    ],
    description:
      "Blast Bits is a satisfying puzzle blaster where strategy meets chaos! Unlock cannons, aim them at targets.",
    iconGradient: "bg-gradient-to-br from-red-400 to-orange-500",
    iconInitials: "BB",
    priority: 3,
  },
];
