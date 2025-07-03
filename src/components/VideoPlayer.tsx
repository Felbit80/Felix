import React from 'react';

interface VideoPlayerProps {
  videoKey: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoKey, title }) => {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&controls=1&showinfo=0&rel=0`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;