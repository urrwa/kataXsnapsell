import React from 'react';
import FlexCarousel from './FlexCarousel';
import { EDITORIAL_IMAGES } from '../data/images';
import { Sparkles, ShoppingBag, MessageSquare } from 'lucide-react';

interface MediaCard {
  id: string;
  image: string;
  alt: string;
  objectPosition?: string;
  tag?: string;
  icon?: React.ComponentType<{ className?: string }>;
  headline?: string;
  caption?: string;
  isAiAssistant?: boolean;
}

const CARDS_DATA: MediaCard[] = [
  {
    id: 'hero-kata',
    image: EDITORIAL_IMAGES.chat.src,
    alt: EDITORIAL_IMAGES.chat.alt,
    objectPosition: 'object-center',
    isAiAssistant: true,
    tag: 'Kata AI Assistant',
    headline: 'Active 24/7',
    caption: '“Hey! Here is your exclusive Mediterranean Lookbook link & style presets.”'
  },
  {
    id: 'ai-visual-sync',
    image: EDITORIAL_IMAGES.content.src,
    alt: EDITORIAL_IMAGES.content.alt,
    objectPosition: 'object-center',
    tag: 'AI Visual Sync',
    icon: Sparkles,
    headline: 'Consistent Identity',
    caption: 'Multi-format studio outputs ready'
  },
  {
    id: 'creator-coaching',
    image: EDITORIAL_IMAGES.coaching.src,
    alt: EDITORIAL_IMAGES.coaching.alt,
    objectPosition: 'object-center',
    tag: 'Creator Masterclass',
    icon: MessageSquare,
    headline: 'Kata Coaching',
    caption: 'Intimate Masterclass & Strategy'
  },
  {
    id: 'direct-sales',
    image: EDITORIAL_IMAGES.commerce.src,
    alt: EDITORIAL_IMAGES.commerce.alt,
    objectPosition: 'object-center',
    tag: 'SnapSell Direct Sales',
    icon: ShoppingBag,
    headline: 'One Simple Link',
    caption: 'Instant Digital Checkout & Delivery'
  },
  {
    id: 'production-pipeline',
    image: EDITORIAL_IMAGES.studio.src,
    alt: EDITORIAL_IMAGES.studio.alt,
    objectPosition: 'object-center',
    tag: 'Studio Productions',
    icon: Sparkles,
    headline: 'Automated Pipeline',
    caption: 'Create more without daily filming'
  },
  {
    id: 'founder-kata',
    image: EDITORIAL_IMAGES.mentor.src,
    alt: EDITORIAL_IMAGES.mentor.alt,
    objectPosition: 'object-center',
    tag: 'Creator Coach',
    headline: 'Founder Kata',
    caption: '20 Years Coaching & Training'
  },
  {
    id: 'streamlined-workflow',
    image: EDITORIAL_IMAGES.systems.src,
    alt: EDITORIAL_IMAGES.systems.alt,
    objectPosition: 'object-center',
    tag: 'Zero Burnout',
    headline: 'Smart Systems',
    caption: 'Sustainable Growth & Balance'
  },
  {
    id: 'global-network',
    image: EDITORIAL_IMAGES.network.src,
    alt: EDITORIAL_IMAGES.network.alt,
    objectPosition: 'object-center',
    tag: 'SnapSell Network',
    headline: 'Global Creators',
    caption: 'Community of Confident Creators'
  }
];

const CARD_DETAILS: Record<string, string> = {
  'hero-kata': 'AI chat support answers everyday questions and guides interested buyers to your offers—even while you are offline.',
  'ai-visual-sync': 'Turn your approved identity and style into photos, clips and captions. You stay in control of the final content.',
  'creator-coaching': 'Build your personal brand with practical coaching, creator strategy and hands-on guidance from Kata.',
  'direct-sales': 'Upload your digital content, set your price and share one SnapSell link for checkout and delivery.',
  'production-pipeline': 'Create with photographers, filmmakers and production teams. Available support depends on your program.',
  'founder-kata': 'Learn from Kata’s around 20 years of coaching and training experience, focused on your next chapter as a creator.',
  'streamlined-workflow': 'Connect your content, conversations and sales in one workflow, with less repetitive work and more time to create.',
  'global-network': 'Explore creator connections, productions and international opportunities, subject to selection and availability.'
};

const CAROUSEL_ITEMS = CARDS_DATA.map(card => ({
  ...card,
  src: card.image,
  title: card.tag || card.headline,
}));

export const HeroMediaStrip: React.FC = () => (
  <FlexCarousel
    items={CAROUSEL_ITEMS}
    label="SnapSell Academy creator visual media slider"
    className="academy-flex-carousel"
    intro="none"
    autoplay
    continuous
    speed={48}
    fixedCardSize
    gap={16}
    radius={24}
    bend={0}
    dispersion={0}
    liquid={0}
    squeeze={0}
    focusOnClick={false}
    captureWheel={false}
    captions={false}
    renderItem={(card, { expanded, detailId }) => {
      const Icon = card.icon;
      return <>
        <span className="carousel-card-shade" aria-hidden="true" />
        <span className="carousel-card-tag">{Icon && <Icon />}{card.tag}</span>
        <span className="carousel-card-summary" aria-hidden={expanded}>
          {card.isAiAssistant && <span className="assistant-status">● Active 24/7</span>}
          {!card.isAiAssistant && <strong>{card.headline}</strong>}
          <p>{card.caption}</p>
        </span>
        <span className="carousel-card-detail" id={detailId} aria-hidden={!expanded}>
          <strong>{card.headline}</strong>
          <p>{CARD_DETAILS[card.id]}</p>
          <small>Move away to resume · Tap to close</small>
        </span>
      </>;
    }}
  />
);
