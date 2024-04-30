import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className='hero-container'>
      <video ref={videoRef} src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>P A C O P A C O</h1>
      <p>The Transcendent Taco Experience.</p>
      <div className='hero-btns'>
        <Link href="/menu" passHref className='navlink'>
          ORDER NOW
        </Link>
        <button className='pause-button' onClick={toggleVideo}>
          {isPlaying ? '   Pause' : '   Play'}
        </button> 
      </div>
    </div>
  );
};

export default HeroSection;
