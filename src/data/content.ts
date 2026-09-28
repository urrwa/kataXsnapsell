import { EDITORIAL_IMAGES } from './images';

export const SECTIONS = [
  {
    id: "section-1",
    numberStr: "01",
    shortTitle: "Hero",
    eyebrow: "KATA x SNAPSELL ACADEMY",
    headline: "Build More. Work Less. Live Bigger.",
    supportingCopy: "Join Kata’s SnapSell Academy and build a creator business powered by AI, direct sales and professional support."
  },
  {
    id: "section-2",
    numberStr: "02",
    shortTitle: "The Struggle",
    eyebrow: "THE BOTTLENECK",
    headline: "Still Doing Everything Alone?",
    supportingCopy: "You don’t need to work harder. You need a better system."
  },
  {
    id: "section-3",
    numberStr: "03",
    shortTitle: "Meet Kata",
    eyebrow: "YOUR CREATOR COACH",
    headline: "Learn From Kata",
    supportingCopy: "Kata combines around 20 years of coaching and training experience with practical knowledge of building and monetizing a personal brand."
  },
  {
    id: "section-4",
    numberStr: "04",
    shortTitle: "Three Pillars",
    eyebrow: "THE COMPLETE SYSTEM",
    headline: "Three Pillars. One Creator Business.",
    supportingCopy: "Create attention. Build conversations. Turn interest into sales."
  },
  {
    id: "section-5",
    numberStr: "05",
    shortTitle: "AI Chat",
    eyebrow: "PILLAR 01",
    headline: "Stay Available Without Being Online All Day",
    supportingCopy: "Your AI assistant supports repetitive conversations and guides interested buyers toward the right offer."
  },
  {
    id: "section-6",
    numberStr: "06",
    shortTitle: "AI Content",
    eyebrow: "PILLAR 02",
    headline: "Create More Without Filming Every Day",
    supportingCopy: "Turn your approved identity and style into content for all your important channels."
  },
  {
    id: "section-7",
    numberStr: "07",
    shortTitle: "SnapSell",
    eyebrow: "PILLAR 03",
    headline: "Your Content. Your Price. One Link.",
    supportingCopy: "Package your digital content and connect it directly with your buyers."
  },
  {
    id: "section-8",
    numberStr: "08",
    shortTitle: "Connected Journey",
    eyebrow: "HOW IT WORKS",
    headline: "From Attention to Payment",
    supportingCopy: "One connected system instead of separate tools and manual tasks."
  },
  {
    id: "section-9",
    numberStr: "09",
    shortTitle: "Expert Team",
    eyebrow: "YOU’RE NOT ALONE",
    headline: "You Stay the Face. We Support the Business.",
    supportingCopy: "Depending on your program, our team can help with the work behind your creator brand."
  },
  {
    id: "section-10",
    numberStr: "10",
    shortTitle: "Global Lifestyle",
    eyebrow: "MORE POSSIBILITIES",
    headline: "Create Content Around the World",
    supportingCopy: "Selected members may access international productions, creator trips, events and professional collaborations."
  },
  {
    id: "section-11",
    numberStr: "11",
    shortTitle: "Productions",
    eyebrow: "PREMIUM CONTENT",
    headline: "Work With World-Class Creatives",
    supportingCopy: "Create a professional portfolio with experienced international photographers, filmmakers and production teams."
  },
  {
    id: "section-12",
    numberStr: "12",
    shortTitle: "Growth Potential",
    eyebrow: "YOUR GROWTH PATH",
    headline: "Build Your Path Toward $20K Months",
    supportingCopy: "Create the content, conversation and sales systems needed to pursue ambitious growth."
  },
  {
    id: "section-13",
    numberStr: "13",
    shortTitle: "Apply Now",
    eyebrow: "YOUR NEXT CHAPTER",
    headline: "Ready to Stop Doing Everything Alone?",
    supportingCopy: "Join Kata’s SnapSell Academy and build your creator business with AI, direct sales and professional support."
  }
];

export const THREE_PILLARS = [
  {
    id: "pillar-1",
    targetSection: "section-5",
    pillarNumber: "01",
    title: "AI Chat Support",
    tagline: "Stay connected—even while you’re offline.",
    description: "An intelligent assistant trained on your tone to answer messages, nurture interest, and guide followers toward exclusive offers 24/7.",
    icon: "message-square",
    image: EDITORIAL_IMAGES.chat
  },
  {
    id: "pillar-2",
    targetSection: "section-6",
    pillarNumber: "02",
    title: "AI Content Creation",
    tagline: "Create more without filming every day.",
    description: "Turn your approved aesthetic and persona into photorealistic lifestyle imagery, talking clips, captions and reels at scale.",
    icon: "sparkles",
    image: EDITORIAL_IMAGES.content
  },
  {
    id: "pillar-3",
    targetSection: "section-7",
    pillarNumber: "03",
    title: "SnapSell",
    tagline: "Sell your content through one simple link.",
    description: "Monetize digital media, photo packs, and exclusive content instantly with frictionless checkout and automatic delivery.",
    icon: "shopping-bag",
    image: EDITORIAL_IMAGES.commerce
  }
];

// Generated scenes illustrate services; only the supplied portrait depicts Kata.
export const ASSET_SLOTS = {
  heroKata: { slotName: "AI Assistant Visual", ...EDITORIAL_IMAGES.chat },
  kataPortrait: { slotName: "Supplied Kata Portrait", ...EDITORIAL_IMAGES.mentor },
  kataCoachingVideoPoster: { slotName: "Kata Coaching Video Cover", ...EDITORIAL_IMAGES.mentor },
  creatorOverwhelm: { slotName: "Creator Workflow Overload", ...EDITORIAL_IMAGES.overwhelm },
  teamLineup: { slotName: "Creative Team Workspace", ...EDITORIAL_IMAGES.team },
  btsShoot: { slotName: "Production Studio", ...EDITORIAL_IMAGES.studio },
  finishedCampaign: { slotName: "Editorial Campaign Direction", ...EDITORIAL_IMAGES.campaign },
  finalCommunity: { slotName: "Global Creator Network", ...EDITORIAL_IMAGES.network }
};
