import React, { useEffect, useState, useMemo } from 'react';

const generateStarBoxShadow = (count) => {
  let shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #FFF`);
  }
  return shadows.join(', ');
};

export default function CosmicParallaxBg({ className = '' }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const smallStars = useMemo(() => generateStarBoxShadow(isMobile ? 300 : 700), [isMobile]);
  const mediumStars = useMemo(() => generateStarBoxShadow(isMobile ? 100 : 200), [isMobile]);
  const bigStars = useMemo(() => generateStarBoxShadow(isMobile ? 50 : 100), [isMobile]);

  return (
    <div className={`cosmic-parallax-container ${className}`}>
      <div className="cosmic-stars" style={{ boxShadow: smallStars }} />
      <div className="cosmic-stars-medium" style={{ boxShadow: mediumStars }} />
      <div className="cosmic-stars-large" style={{ boxShadow: bigStars }} />
    </div>
  );
}
