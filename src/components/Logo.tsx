import React, { useState, useEffect } from 'react';
import '../styles/animated-logo.css';

// Constants (DRY principle)
const LOGO_CONFIG = {
  text: 'BLOKKO',
  fontFamily: 'Boogaloo, Bangers, cursive',
  fontSize: 64,
  centerX: 200,
  centerY: 75,
  fontWeight: 'bold' as const,
  textAnchor: 'middle' as const,
  strokeLinejoin: 'round' as const,
} as const;

const STROKE_LAYERS = [
  { color: '#8B0000', width: 16, delay: 0 },
  { color: '#B22222', width: 12, delay: 0.3 },
  { color: '#CC4500', width: 8, delay: 0.6 },
] as const;

const FILL_LAYERS = [
  { fill: 'url(#mainGradient)', filter: 'url(#innerGlow)', delay: 0.9 },
  { fill: 'url(#glossGradient)', opacity: 0.7, delay: 1.2 },
] as const;

const ANIMATION_CONFIG = {
  characterDelay: 0.2,
  layerDelay: 0.3,         
  totalDuration: 3,
} as const;

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
}

interface AnimatedTextLayerProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  filter?: string;
  opacity?: number;
  layerDelay: number;
  isAnimated: boolean;
}

interface CharacterProps {
  char: string;
  index: number;
  delay: number;
  isAnimated: boolean;
}

const AnimatedCharacter: React.FC<CharacterProps> = ({ 
  char,
  index,
  delay, 
  isAnimated 
}) => (
  <tspan
    className={`animated-char ${isAnimated ? 'animate' : ''} ${index === 0 || index === 5 ? 'super-pop' : ''}`}
    style={{
      animationDelay: `${delay}s`,
    }}
  >
    {char}
  </tspan>
);

const AnimatedTextLayer: React.FC<AnimatedTextLayerProps> = ({ 
  fill = 'none', 
  stroke, 
  strokeWidth, 
  filter, 
  opacity = 1,
  layerDelay,
  isAnimated
}) => {
  const characters = LOGO_CONFIG.text.split('');
  const totalLayerDelay = layerDelay;

  return (
    <text
      x={LOGO_CONFIG.centerX}
      y={LOGO_CONFIG.centerY}
      textAnchor={LOGO_CONFIG.textAnchor}
      fontSize={LOGO_CONFIG.fontSize}
      fontFamily={LOGO_CONFIG.fontFamily}
      fontWeight={LOGO_CONFIG.fontWeight}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin={LOGO_CONFIG.strokeLinejoin}
      filter={filter}
      opacity={opacity}
      className={`animated-text-layer ${isAnimated ? 'animate' : ''}`}
      style={{
        animationDelay: `${totalLayerDelay}s`,
      }}
    >
      {characters.map((char, index) => (
        <AnimatedCharacter
          key={`${char}-${index}`}
          char={char}
          index={index}
          delay={totalLayerDelay + (index * ANIMATION_CONFIG.characterDelay)}
          isAnimated={isAnimated}
        />
      ))}
    </text>
  );
};

const LogoDefinitions: React.FC = () => (
  <defs>
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFD700" />
      <stop offset="25%" stopColor="#FFA500" />
      <stop offset="50%" stopColor="#FF8C00" />
      <stop offset="75%" stopColor="#FF6347" />
      <stop offset="100%" stopColor="#CC4500" />
    </linearGradient>

    <linearGradient id="glossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
      <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
      <stop offset="70%" stopColor="rgba(255,255,255,0.1)" />
      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
    </linearGradient>

    <filter id="innerGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="4" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.4)"/>
    </filter>
  </defs>
);

const StrokeLayers: React.FC<{ isAnimated: boolean }> = ({ isAnimated }) => (
  <>
    {STROKE_LAYERS.map((layer, index) => (
      <AnimatedTextLayer
        key={`stroke-${index}`}
        stroke={layer.color}
        strokeWidth={layer.width}
        layerDelay={layer.delay}
        isAnimated={isAnimated}
      />
    ))}
  </>
);

const FillLayers: React.FC<{ isAnimated: boolean }> = ({ isAnimated }) => (
  <>
    {FILL_LAYERS.map((layer, index) => (
      <AnimatedTextLayer
        key={`fill-${index}`}
        fill={layer.fill}
        filter={'filter' in layer ? layer.filter : undefined}
        opacity={'opacity' in layer ? layer.opacity : undefined}
        layerDelay={layer.delay}
        isAnimated={isAnimated}
      />
    ))}
  </>
);

const Logo: React.FC<LogoProps> = ({ 
  width = 400, 
  height = 120, 
  className = "",
  animated = true,
  autoPlay = true,
  onAnimationComplete
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (animated && autoPlay && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setHasAnimated(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [animated, autoPlay, hasAnimated]);

  useEffect(() => {
    if (isAnimating && onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, ANIMATION_CONFIG.totalDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, onAnimationComplete]);

  const triggerAnimation = () => {
    if (animated) {
      setIsAnimating(true);
    }
  };

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 400 120" 
      className={`animated-logo ${className} ${isAnimating ? 'animating' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={triggerAnimation}
    >
      <LogoDefinitions />
      <g filter="url(#dropShadow)">
        <StrokeLayers isAnimated={isAnimating} />
        <FillLayers isAnimated={isAnimating} />
      </g>
    </svg>
  );
};

export default Logo;
