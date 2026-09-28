import React, { useRef } from 'react';
import { Play, Plus } from 'lucide-react';
import './FilmPreview.css';

interface FilmPreviewProps {
  title: string;
  description: string;
  src: string;
  poster: string;
}

// Load video only on demand; opening the preview never starts playback automatically.
export const FilmPreview: React.FC<FilmPreviewProps> = ({ title, description, src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <details className="film-preview" onToggle={event => {
      if (!event.currentTarget.open) videoRef.current?.pause();
    }}>
      <summary>
        <span className="film-preview__play"><Play size={17} /></span>
        <span className="film-preview__copy"><strong>{title}</strong><small>{description}</small></span>
        <span className="film-preview__duration">8 SEC</span>
        <Plus className="film-preview__expand" size={17} />
      </summary>
      <div className="film-preview__body">
        <video ref={videoRef} src={src} poster={poster} controls playsInline muted preload="none" aria-label={title} />
        <p>AI-generated visual example · Google Flow</p>
      </div>
    </details>
  );
};
