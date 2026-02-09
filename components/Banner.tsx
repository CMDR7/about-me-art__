
import React, { useMemo } from 'react';
import { Target } from 'lucide-react';

interface BannerProps {
  scrollY: number;
}

const Banner: React.FC<BannerProps> = ({ scrollY }) => {
  const bannerImage = 'https://raw.githubusercontent.com/CMDR7/IMG-BANK/0bb3071426273b37bc86211889d98aa96d5a5505/project-bank/MULTISTOP-SUBSTACK-BANNER.png';
  const profileImage = 'https://raw.githubusercontent.com/CMDR7/IMG-BANK/b09924424d60bf474ee637d4ed5d8cbf17970eda/project-bank/MR.png';

  // Calculate proportional fade and lift based on scroll
  // Threshold is roughly the banner height in vh (approx 300px)
  const fadeEffect = useMemo(() => {
    const threshold = 300; 
    const opacity = Math.max(0, 1 - scrollY / threshold);
    const translateY = -Math.min(scrollY * 0.4, 150); // Move up slower than scroll
    return { opacity, transform: `translateY(${translateY}px)` };
  }, [scrollY]);

  return (
    <div 
      className="fixed top-0 left-0 w-full z-0 overflow-hidden bg-cyber-bg border-b border-cyber-accent/20 h-[30vh] min-h-[220px] transition-colors duration-500 pointer-events-none"
      style={fadeEffect}
    >
      {/* Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url("${bannerImage}")`,
          filter: 'brightness(1.1)'
        }}
      ></div>
      
      {/* 8% Gaussian Blur Overlay - Optimized for device width */}
      <div 
        className="absolute inset-y-0 left-0 w-full md:w-1/2 z-10 pointer-events-none backdrop-blur-[4px] md:backdrop-blur-[8px]"
        style={{
          maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)'
        }}
      ></div>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-cyber-bg/25 z-10 backdrop-brightness-75"></div>

      {/* Cybernetic Grid / Scanlines */}
      <div className="absolute inset-0 z-20 scanline opacity-20 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative h-full flex flex-col justify-end pb-4 md:pb-8 px-4 md:px-12 max-w-[1400px] mx-auto w-full z-30">
        <div className="flex items-end justify-between md:justify-end gap-3 md:gap-8 text-right">
          
          {/* Cyberpunk Framed Profile Image */}
          <div className="relative h-14 md:h-24 aspect-square group overflow-hidden p-[2px] shadow-[0_0_15px_rgba(var(--cyber-accent-rgb),0.2)]">
             
             {/* REFLECTIVE BORDER BACKGROUND */}
             <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,var(--cyber-accent)_180deg,transparent_200deg,transparent_360deg)] animate-[spin_3s_linear_infinite] z-0 opacity-80"></div>
             
             {/* The Sequential Trace Outline */}
             <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-accent scale-x-0 animate-trace-top z-50 shadow-[0_0_10px_var(--cyber-accent)]"></div>
             <div className="absolute top-0 right-0 w-[2px] h-full bg-cyber-accent scale-y-0 animate-trace-right z-50 shadow-[0_0_10px_var(--cyber-accent)]"></div>
             <div className="absolute bottom-0 right-0 w-full h-[2px] bg-cyber-accent scale-x-0 animate-trace-bottom z-50 shadow-[0_0_10px_var(--cyber-accent)]"></div>
             <div className="absolute bottom-0 left-0 w-[2px] h-full bg-cyber-accent scale-y-0 animate-trace-left z-50 shadow-[0_0_10px_var(--cyber-accent)]"></div>

             {/* Inner Frame */}
             <div className="w-full h-full bg-cyber-bg border border-white/10 overflow-hidden relative z-10">
                <div className="absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                
                <img 
                  src={profileImage} 
                  alt="MR" 
                  className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
                
                {/* Random "Glitched" Scan Overlay */}
                <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover:opacity-20 animate-pulse pointer-events-none"></div>
             </div>

             {/* Decorative HUD corners */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-accent shadow-[0_0_5px_var(--cyber-accent)] z-40"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-accent shadow-[0_0_5px_var(--cyber-accent)] z-40"></div>
          </div>

          <div className="flex flex-col items-end max-w-[70%] md:max-w-none">
            {/* Role Indicator */}
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="text-[7px] md:text-[8px] font-cyber font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-cyber-violet animate-glitch-violet">
                Digital Synthetic Architect
              </span>
              <Target size={10} className="text-cyber-violet animate-pulse flex-shrink-0 transition-colors duration-500" />
            </div>
            
            {/* Primary Identity */}
            <h1 className="text-lg md:text-5xl font-cyber font-black uppercase text-white tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none break-words">
              Arthur Rambo <span className="text-cyber-accent font-light opacity-90 block md:inline transition-colors duration-500">[Art__ii]</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 border-b border-white/5 bg-black/50 backdrop-blur-md px-4 md:px-6 flex items-center justify-between text-[6px] font-cyber text-cyber-muted tracking-[0.2em] md:tracking-[0.3em] uppercase z-40">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-cyber-accent whitespace-nowrap transition-colors duration-500">Stream_ID: MULTISTOP-77</span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <div className="w-1 h-1 bg-cyber-orange rounded-full animate-pulse shadow-[0_0_6px_var(--cyber-secondary)] transition-all duration-500"></div>
            Sync: Verified
          </span>
        </div>
        <div className="hidden sm:block opacity-60">
          Neural_Link: Enabled // Protocol_V.04
        </div>
      </div>
    </div>
  );
};

export default Banner;
