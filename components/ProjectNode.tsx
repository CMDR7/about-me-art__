
import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';

interface ProjectNodeProps {
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  link: string;
  idx: number;
  mobile?: boolean;
  onClick?: () => void;
}

const ProjectNode: React.FC<ProjectNodeProps> = ({ 
  title, 
  subtitle, 
  color, 
  glow, 
  link, 
  idx, 
  mobile = false,
  onClick 
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const isPending = link === '#';

  const baseStyles = `
    group relative overflow-hidden bg-cyber-surface/60 border cyber-border 
    transition-all duration-300 hover:-translate-x-1 animate-crt-flicker 
    ${isPending ? 'cursor-default opacity-50' : 'cursor-pointer hover:animate-border-pulse'}
    ${mobile ? 'p-5 scale-100 hover:scale-[1.02]' : 'p-3 md:p-5'}
    ${isNavigating ? 'border-cyber-accent shadow-[0_0_15px_rgba(var(--cyber-accent-rgb),0.4)]' : ''}
    crt-effect
  `;

  const handleInteraction = () => {
    if (!isPending) {
      onClick?.();
      setIsNavigating(true);
    }
  };

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => setIsNavigating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  return (
    <a 
      href={link}
      target={isPending ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseDown={handleInteraction}
      className={baseStyles}
      style={{
        animationDelay: `${idx * 0.05}s`
      }}
    >
      {/* Reflective Shimmer Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"></div>

      {/* Loading Overlay Bar */}
      {isNavigating && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-accent animate-pulse z-50 transition-colors duration-500"></div>
      )}

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[6px] md:text-[8px] opacity-40 font-cyber">NODE.0{idx+1}</span>
            {isNavigating && (
              <span className="text-[6px] md:text-[7px] text-cyber-accent font-cyber animate-pulse uppercase tracking-tighter transition-colors duration-500">
                // Connecting...
              </span>
            )}
          </div>
          {!isPending && !isNavigating && (
            <ExternalLink 
              size={mobile ? 14 : 10} 
              className="text-cyber-accent opacity-30 group-hover:opacity-100 transition-opacity transition-colors duration-500" 
            />
          )}
          {isNavigating && (
            <Loader2 size={mobile ? 14 : 10} className="text-cyber-accent animate-spin transition-colors duration-500" />
          )}
        </div>
        
        <span className={`
          font-cyber font-black tracking-widest uppercase transition-colors duration-500
          ${mobile ? 'text-lg' : 'text-[9px] md:text-sm'}
          ${isNavigating ? 'text-white' : color}
        `}>
          {isNavigating ? 'UPLINK_ACTIVE' : title}
        </span>
        
        <span className={`
          text-cyber-muted uppercase font-cyber tracking-tight opacity-70 mt-1 transition-colors duration-500
          ${mobile ? 'text-[9px]' : 'text-[7px] md:text-[9px] hidden md:block'}
        `}>
          {isNavigating ? 'Establishing neural handshake...' : subtitle}
        </span>
      </div>

      {/* Pulsing glow accent for the corner */}
      <div className={`absolute bottom-0 right-0 w-3 h-3 overflow-hidden transition-opacity ${isNavigating ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
         <div className={`absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-2 border-r-2 transition-colors duration-500 ${isNavigating ? 'border-white' : 'border-cyber-accent'}`}></div>
      </div>
    </a>
  );
};

export default ProjectNode;
