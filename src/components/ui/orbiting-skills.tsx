"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
// --- Type Definitions ---
type IconType = 'javascript' | 'react' | 'flutter' | 'dotnet' | 'cpp' | 'docker' | 'nextjs' | 'git' | 'postgresql' | 'vuejs';

type GlowColor = 'cyan' | 'purple' | 'blue' | 'green' | 'orange' | 'white' | 'darkblue';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1.5" fill="none">
          <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  flutter: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
         <path d="M14 2L5 11L8.5 14.5L17.5 5.5L14 2Z" fill="#54C5F8"/>
         <path d="M14 22L5 13L8.5 9.5L17.5 18.5L14 22Z" fill="#54C5F8"/>
         <path d="M17.5 5.5L21 9L11.5 18.5H7.5L17.5 5.5Z" fill="#0C519D" fillOpacity="0.5"/>
      </svg>
    ),
    color: '#54C5F8'
  },
  dotnet: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 19H22L12 2ZM12 16C11.45 16 11 15.55 11 15C11 14.45 11.45 14 12 14C12.55 14 13 14.45 13 15C13 15.55 12.55 16 12 16ZM8.5 12L10 9H14L15.5 12H8.5Z" fill="#512BD4"/>
      </svg>
    ),
    color: '#512BD4'
  },
  cpp: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M7 6L3 12L7 18H17L21 12L17 6H7ZM12 4L14 8H10L12 4ZM19 12L17.5 14.5L17.5 9.5L19 12ZM5 12L6.5 9.5L6.5 14.5L5 12Z" fill="#00599C"/>
        <text x="50%" y="60%" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">C++</text>
      </svg>
    ),
    color: '#00599C'
  },
  docker: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.983 11.078h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259h-2.119a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm-3.19 0h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259h-2.119a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm-3.19 0h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259H7.603a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm-3.19 0h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259H4.413a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm0-3.19h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259H4.413a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm3.19 0h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259H7.603a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm3.19 0h2.119c.695 0 1.259.564 1.259 1.259 0 .695-.564 1.259-1.259 1.259h-2.119a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259zm-1.376-7.401c-.129-.543-.56-.99-1.07-.99H6.425c-.51 0-.941.447-1.07.99l-.271 1.14c-.129.544.181 1.05.692 1.05h3.047c.51 0 .82-.506.691-1.05l-.272-1.14z" fill="#2496ED"/>
        <path d="M23.763 12.356c-.035-.054-.15-.224-.447-.468-.08-.066-.453-.339-.99-.339h-1.365a1.259 1.259 0 0 1-1.259-1.259c0-.695.564-1.259 1.259-1.259h2.119a1.259 1.259 0 0 1 1.259 1.259c0 .16-.564 13.911-13.911 13.911-3.69 0-6.735-2.008-8.121-5.11-.08-.135-.205-.195-.335-.195-.125 0-.251.056-.334.192-.619 1.051-1.373 1.956-2.228 2.682-.125.106-.188.261-.157.416.031.155.155.275.31.306.945.191 1.83.336 2.632.416.14.015.281.011.417-.034.402.085 13.827.245 13.827-11.232z" fill="#2496ED" />
      </svg>
    ),
    color: '#2496ED'
  },
  nextjs: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.228 17.575l-7.319-9.155v7.697H8.342V6.425h1.567l7.248 9.06V6.425h1.567v11.15h-1.496z" />
      </svg>
    ),
    color: '#000000'
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.855 2.47l2.12 2.12.016-.016a.465.465 0 0 1 .655 0c.181.181.181.474 0 .654l-.015.015L15.3 8.92c.164-.047.34-.055.51-.02.664.137 1.09.775.953 1.44-.136.663-.774 1.09-1.439.953-.38-.078-.679-.319-.844-.641l-2.903-2.901v7.61c.646.168 1.09.778.966 1.444-.124.666-.764 1.107-1.43 1.43-.666.124-1.306-.317-1.43-.983-.125-.666.319-1.307.985-1.431.144-.027.288-.035.43-.021V7.788c-.142-.02 -.285-.021-.43-.02-.666-.124-1.107-.764-.984-1.43.123-.665.764-1.106 1.43-1.106.666.124.985.764.862 1.43a1.411 1.411 0 0 1-.365.71l-.015.015 2.5 2.5.015-.015a.465.465 0 0 1 .654 0c.181.181.181.474 0 .654l-.015.015L23.546 13.12c.603.603.603 1.583 0 2.187l-2.12 2.12-2.12-2.12.016-.016c.181-.181.181-.474 0-.655a.465.465 0 0 0-.655 0c-.181.181-.181.474 0 .654l.016.015-8.855 8.856c-.603.603-1.583.603-2.187 0L.452 13.067c-.603-.604-.603-1.582 0-2.187L10.93.452a1.54 1.54 0 0 1 2.188 0l10.428 10.428a1.54 1.54 0 0 1 0 2.188l-2.12 2.12z" fill="#F05032" />
      </svg>
    ),
    color: '#F05032'
  },
  postgresql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 15.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-4-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="#336791" />
      </svg>
    ),
    color: '#336791'
  },
  vuejs: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24,1.6L12,22.4L0,1.6h4.8L12,14L19.2,1.6H24z M18.6,1.6L12,13L5.4,1.6H0.4L12,21.6L23.6,1.6H18.6z" fill="#42B883" />
        <path d="M12,11L18,0H24L12,21L0,0h6L12,11z" fill="#35495E" />
      </svg>
    ),
    color: '#42B883'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit (Radius: 100)
  { id: 'flutter', orbitRadius: 100, size: 40, speed: 1.2, iconType: 'flutter', phaseShift: 0, glowColor: 'blue', label: 'Flutter' },
  { id: 'javascript', orbitRadius: 100, size: 40, speed: 1.2, iconType: 'javascript', phaseShift: Math.PI, glowColor: 'orange', label: 'JavaScript' },
  
  // Middle Orbit (Radius: 180)
  { id: 'react', orbitRadius: 180, size: 50, speed: -0.8, iconType: 'react', phaseShift: 0, glowColor: 'cyan', label: 'React' },
  { id: 'dotnet', orbitRadius: 180, size: 45, speed: -0.8, iconType: 'dotnet', phaseShift: (2 * Math.PI) / 3, glowColor: 'purple', label: '.NET' },
  { id: 'cpp', orbitRadius: 180, size: 40, speed: -0.8, iconType: 'cpp', phaseShift: (4 * Math.PI) / 3, glowColor: 'blue', label: 'C++' },

  // Outer Orbit (Radius: 260)
  { id: 'docker', orbitRadius: 260, size: 45, speed: 0.5, iconType: 'docker', phaseShift: 0, glowColor: 'blue', label: 'Docker' },
  { id: 'nextjs', orbitRadius: 260, size: 45, speed: 0.5, iconType: 'nextjs', phaseShift: (2 * Math.PI) / 5, glowColor: 'white', label: 'Next.js' },
  { id: 'git', orbitRadius: 260, size: 40, speed: 0.5, iconType: 'git', phaseShift: (4 * Math.PI) / 5, glowColor: 'orange', label: 'Git' },
  { id: 'postgresql', orbitRadius: 260, size: 45, speed: 0.5, iconType: 'postgresql', phaseShift: (6 * Math.PI) / 5, glowColor: 'darkblue', label: 'PostgreSQL' },
  { id: 'vuejs', orbitRadius: 260, size: 40, speed: 0.5, iconType: 'vuejs', phaseShift: (8 * Math.PI) / 5, glowColor: 'green', label: 'Vue.js' },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: { primary: 'rgba(6, 182, 212, 0.4)', secondary: 'rgba(6, 182, 212, 0.2)', border: 'rgba(6, 182, 212, 0.3)' },
    purple: { primary: 'rgba(147, 51, 234, 0.4)', secondary: 'rgba(147, 51, 234, 0.2)', border: 'rgba(147, 51, 234, 0.3)' },
    blue: { primary: 'rgba(59, 130, 246, 0.4)', secondary: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.3)' },
    orange: { primary: 'rgba(249, 115, 22, 0.4)', secondary: 'rgba(249, 115, 22, 0.2)', border: 'rgba(249, 115, 22, 0.3)' },
    green: { primary: 'rgba(66, 184, 131, 0.4)', secondary: 'rgba(66, 184, 131, 0.2)', border: 'rgba(66, 184, 131, 0.3)' },
    white: { primary: 'rgba(255, 255, 255, 0.4)', secondary: 'rgba(255, 255, 255, 0.2)', border: 'rgba(255, 255, 255, 0.3)' },
    darkblue: { primary: 'rgba(51, 103, 145, 0.4)', secondary: 'rgba(51, 103, 145, 0.2)', border: 'rgba(51, 103, 145, 0.3)' }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 },
    { radius: 260, glowColor: 'green', delay: 3.0 }
  ];

  return (
    <main className="flex items-center justify-center overflow-hidden py-10">
      <div 
        className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center scale-75 md:scale-100"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-gray-600">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}

