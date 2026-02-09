
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Terminal, Zap, Target, ShieldCheck, Menu, X, Cpu, Activity, Database, Palette } from 'lucide-react';
import Banner from './components/Banner';
import CyberCard from './components/CyberCard';
import ProjectNode from './components/ProjectNode';

type Theme = 'default' | 'matrix' | 'vaporwave';

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING_BOOT_LOADER...');
  
  const bootLogs = [
    "[    0.000000] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-071)",
    "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-5.15 root=UUID=cyber-node-01 ro quiet splash",
    "[    0.412831] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
    "[    1.294812] NEURAL_LINK: Protocol handshake initiated...",
    "[    1.823910] SYNC: Synchronizing biometric data with central node...",
    "[    2.110293] GPU: Neural Rendering Engine v4.0.2 detected",
    "[    2.553912] MEM: Allocating memory for visual matrix...",
    "[    3.012831] ACCESS: Decoding security layer 0x7F2A...",
    "[    3.412831] UPLINK: Establishing high-bandwidth neural connection...",
    "[    3.912831] SUCCESS: Neural handshake verified."
  ];

  useEffect(() => {
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStatus('ACCESS_GRANTED');
          setTimeout(onComplete, 800);
          return 100;
        }
        if (prev > 90) setStatus('DECRYPTING_VISUAL_MATRIX...');
        else if (prev > 60) setStatus('UPLINKING_NEURAL_RESOURCES...');
        else if (prev > 30) setStatus('SYNCING_BIOMETRIC_DATA...');
        return prev + Math.random() * 12;
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-cyber-bg flex flex-col p-6 md:p-12 font-mono text-[10px] md:text-xs overflow-hidden crt-effect">
      <div className="flex-1 overflow-hidden space-y-1 text-cyber-accent opacity-80">
        {logs.map((log, i) => (
          <div key={i} className="animate-text-reveal overflow-hidden whitespace-nowrap">
            {log}
          </div>
        ))}
        {logs.length === bootLogs.length && (
          <div className="pt-8 flex flex-col gap-4 max-w-md">
            <div className="flex justify-between items-end">
              <span className="text-cyber-accent font-cyber text-[8px] tracking-widest">{status}</span>
              <span className="text-white font-cyber">{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="h-2 w-full bg-cyber-accent/10 border border-cyber-accent/20 relative overflow-hidden">
              <div 
                className="h-full bg-cyber-accent loading-bar-fill shadow-[0_0_15px_var(--cyber-accent)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-10 right-10 text-cyber-accent/20 font-cyber text-[40px] font-black italic select-none">
        A R T _ I I
      </div>
    </div>
  );
};

const HUDMetrics: React.FC = () => {
  const [cpu, setCpu] = useState(42);
  const [mem, setMem] = useState(64);
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
      setMem(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setPing(prev => Math.min(100, Math.max(5, prev + (Math.random() - 0.5) * 4)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 font-cyber text-[8px] tracking-[0.2em] text-cyber-accent/80 p-4 border border-cyber-accent/10 bg-cyber-accent/5 cyber-border-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="animate-pulse" />
          <span>CPU_LOAD</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-1 w-20 bg-cyber-border/40 relative overflow-hidden">
            <div className="h-full bg-cyber-accent transition-all duration-700" style={{ width: `${cpu}%` }}></div>
          </div>
          <span className="w-8 text-right">{Math.round(cpu)}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          <span>NEURAL_FLOW</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-1 w-20 bg-cyber-border/40 relative overflow-hidden">
            <div className="h-full bg-cyber-orange transition-all duration-700" style={{ width: `${mem}%` }}></div>
          </div>
          <span className="w-8 text-right">{Math.round(mem)}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database size={12} className="animate-pulse" />
          <span>PING_MS</span>
        </div>
        <span className="text-white">{Math.round(ping)}</span>
      </div>
    </div>
  );
};

const BackgroundGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
      <div 
        className="absolute inset-[-10%] moving-grid"
        style={{
          transform: `rotateX(60deg) translateY(${mousePos.y * 20}px) translateX(${mousePos.x * 20}px)`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [isUplinksOpen, setIsUplinksOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const playBeep = useCallback((freq = 880) => {
    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio feedback failed:', e);
    }
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ['default', 'matrix', 'vaporwave'];
    const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    setCurrentTheme(next);
    playBeep(440);
  };

  const handleUplinksTrigger = () => {
    playBeep();
    setIsUplinksOpen(true);
  };

  const projects = useMemo(() => [
    { 
      title: 'MISSION STATEMENT', 
      subtitle: 'VIEW & PHILOSOPHY ON PROMPTING',
      color: 'text-cyber-orange', 
      glow: 'glow-orange', 
      link: 'https://cmdr7.github.io/prompters-manifesto/' 
    },
    { 
      title: 'CITIZEN WATCH', 
      subtitle: 'PRE CRIME SIMULATOR TERMINAL',
      color: 'text-cyber-accent', 
      glow: 'glow-accent', 
      link: 'https://cmdr7.github.io/citizen-watch-terminal/' 
    },
    { 
      title: 'FREELANCER HIT LIST', 
      subtitle: 'PERSONALIZED REMOTE JOB SEARCH',
      color: 'text-cyber-orange', 
      glow: 'glow-orange', 
      link: 'https://cmdr7.github.io/freelance-hitlist/' 
    },
    { 
      title: 'STR33TT3CH TERMINAL', 
      subtitle: 'MMO CYBERPUNK GPT-CODED WEB APP',
      color: 'text-cyber-accent', 
      glow: 'glow-accent', 
      link: 'https://v0-str-33-tt-3-ch-control-system.vercel.app/' 
    },
    { 
      title: 'UPCOMING: N0DE5', 
      subtitle: 'STR33TT3CH COMMUNITY MMO WEB APP',
      color: 'text-cyber-orange', 
      glow: 'glow-orange', 
      link: '#',
      status: 'PENDING'
    },
    { 
      title: 'UPCOMING: Landing Page Example', 
      subtitle: 'MULTI-BOOST // SEO/GEO Creative Assistant',
      color: 'text-cyber-accent', 
      glow: 'glow-accent', 
      link: '#',
      status: 'PENDING'
    },
  ], []);

  return (
    <>
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      
      <div className={`min-h-screen w-full bg-cyber-bg flex flex-col font-mono text-cyber-text relative transition-all duration-1000 ${isUplinksOpen ? 'overflow-hidden' : ''} ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        
        <BackgroundGrid />
        
        {/* Fixed Banner with Scroll-based Fade */}
        <Banner scrollY={scrollY} />

        {/* Floating Theme Switcher */}
        <button 
          onClick={cycleTheme}
          className="fixed bottom-6 right-6 z-50 p-3 md:p-4 bg-cyber-surface/80 border border-cyber-accent/40 text-cyber-accent cyber-border hover:bg-cyber-accent hover:text-black transition-all group backdrop-blur-lg"
          title="Frequency Shift"
        >
          <Palette size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-[10px] font-cyber tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-cyber-accent/20">
            SHIFT_FREQUENCY: {currentTheme.toUpperCase()}
          </span>
        </button>

        {/* Main Content: Overlaps and scrolls over the fixed banner */}
        <div className="relative z-10 w-full pt-[30vh] min-h-screen">
          <main className="max-w-[1400px] mx-auto w-full p-4 md:p-8 pb-32 bg-cyber-bg/95 shadow-[0_-50px_100px_rgba(var(--cyber-bg),1)]">
            <div className="flex flex-col gap-10">
              
              <div className="md:hidden flex justify-center mt-4">
                <button 
                  onClick={handleUplinksTrigger}
                  className="group relative flex items-center gap-4 px-10 py-4 bg-cyber-surface border border-cyber-accent/50 cyber-border shadow-[0_0_20px_rgba(var(--cyber-accent-rgb),0.15)] hover:shadow-[0_0_30px_rgba(var(--cyber-accent-rgb),0.3)] transition-all active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Menu size={20} className="text-cyber-accent group-hover:rotate-90 transition-transform duration-300 relative z-10" />
                  <span className="text-sm font-cyber font-bold tracking-[0.5em] text-cyber-accent uppercase relative z-10">
                    Uplinks
                  </span>
                  <div className="absolute top-0 right-0 w-6 h-[2px] bg-cyber-accent animate-pulse shadow-[0_0_10px_var(--cyber-accent)]"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-cyber-accent animate-pulse shadow-[0_0_10px_var(--cyber-accent)]"></div>
                </button>
              </div>

              <CyberCard title="[ NODE_PRIMARY // DATA_UPLINKS ]">
                <div className="flex flex-row gap-4 md:gap-10 h-full">
                  
                  <div className="flex-1 space-y-6 overflow-hidden">
                    <div className="flex items-center gap-2 text-cyber-accent text-[9px] md:text-[10px] font-cyber">
                      <Terminal size={12} className="animate-pulse" />
                      <span className="tracking-[0.2em] uppercase opacity-60">Initializing Stream...</span>
                    </div>

                    <p className="text-lg md:text-2xl leading-tight md:leading-relaxed text-white font-cyber italic border-l-2 md:border-l-4 border-cyber-accent pl-4 md:pl-6 py-1">
                      “Master the systems, know your lane, and leverage knowledge wisely, technology is only as powerful as the clarity and creativity behind it.”
                    </p>

                    <div className="space-y-4 text-cyber-muted text-xs md:text-base leading-relaxed">
                      <p>
                        I’m a down-to-earth professional with a broad range of experience, but at my core, I excel at understanding, integrating with, and optimizing systems. I approach every project with curiosity and creativity, always seeking innovative solutions that drive results. I know the value of recognizing one’s position within a team. When I don’t know something, I seek the answer, and when a process is beyond my expertise, I find the right person to guide or take the lead.
                      </p>
                      <p>
                        We live in a time where the gap between “degreed professionals” and tinkerers is rapidly closing. Knowledge is widely accessible, and knowing how to leverage it effectively is essential to becoming a vital contributor in IT. I focus on understanding my lane and adding to the development chain where my skills are most applicable. I’ve long been fascinated by cybernetic philosophy, especially the works of Norbert Wiener, whose ideas I explored in high school, back when the seeds of AI jargon were already planted in his writings. This early exposure gives me a unique perspective on prompt engineering, AI, and the generative process.
                      </p>
                      <p className="p-4 bg-cyber-orange/5 border border-cyber-orange/20 border-l-4 border-l-cyber-orange text-cyber-text">
                        Currently, I work as an on-call freelancer for <span className="text-cyber-orange font-bold">Mindrift</span> as an AI tutor, trainer, and copywriter. I’m open to more consistent opportunities, though I remain versatile and adaptable, I'm always ready to learn new systems and gradually grow while contributing meaningfully to a team.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-cyber-surface/40 border border-cyber-border hover:border-cyber-orange transition-all cyber-border group backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="text-cyber-orange" size={16} />
                          <h3 className="font-cyber text-[9px] uppercase tracking-widest">Directive_01</h3>
                        </div>
                        <p className="text-[10px] text-cyber-muted">Engineer fluid interaction and structural integrity.</p>
                      </div>
                      <div className="p-4 bg-cyber-surface/40 border border-cyber-border hover:border-cyber-accent transition-all cyber-border group backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="text-cyber-accent" size={16} />
                          <h3 className="font-cyber text-[9px] uppercase tracking-widest">Directive_02</h3>
                        </div>
                        <p className="text-[10px] text-cyber-muted">Maintain logic purity and high security protocols.</p>
                      </div>
                    </div>
                  </div>

                  <aside className="hidden md:flex w-80 flex-shrink-0 flex-col gap-3 md:gap-4 border-l border-cyber-border/30 pl-4 md:pl-8">
                    <div className="flex items-center gap-2 mb-2 sticky top-4 bg-cyber-bg/95 z-10 py-2">
                      <span className="text-[8px] md:text-[10px] font-cyber text-cyber-muted tracking-[0.2em] uppercase">Uplinks</span>
                      <div className="h-[1px] flex-1 bg-cyber-border/30"></div>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4">
                      {projects.map((proj, idx) => (
                        <ProjectNode 
                          key={idx}
                          {...proj}
                          idx={idx}
                          onClick={() => playBeep()}
                        />
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sticky top-[450px]">
                      <HUDMetrics />
                      
                      <div className="p-3 border border-cyber-accent/20 text-[8px] text-cyber-muted leading-relaxed uppercase bg-cyber-accent/5 cyber-border-sm">
                        <div className="flex items-center gap-2 text-cyber-accent mb-1">
                          <Zap size={10} className="animate-pulse" />
                          <span>STABLE_LINK</span>
                        </div>
                        Port_8080 // V.04 // {currentTheme.toUpperCase()}
                      </div>
                    </div>
                  </aside>
                </div>
              </CyberCard>
            </div>

            <footer className="mt-24 pt-12 border-t border-cyber-border/20 text-center relative bg-cyber-bg">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-cyber-accent/30 shadow-[0_0_10px_var(--cyber-accent)]"></div>
               <span className="text-[9px] font-cyber tracking-[1em] text-cyber-muted opacity-40 uppercase block">
                  Interface V.04 // Arthur Rambo
               </span>
            </footer>
          </main>
        </div>

        {/* Mobile Uplinks Modal */}
        {isUplinksOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-cyber-bg/95 backdrop-blur-xl animate-fade-in"
              onClick={() => setIsUplinksOpen(false)}
            ></div>
            
            <div className="relative w-full max-w-lg animate-zoom-in">
              <CyberCard title="[ SYSTEM_NODES // ACTIVE_UPLINKS ]">
                <button 
                  onClick={() => setIsUplinksOpen(false)}
                  className="absolute top-0 right-0 p-3 text-cyber-accent hover:text-white transition-colors z-50"
                >
                  <X size={24} />
                </button>
                
                <div className="flex flex-col gap-4 mt-6">
                  {projects.map((proj, idx) => (
                    <ProjectNode 
                      key={idx}
                      {...proj}
                      idx={idx}
                      mobile={true}
                      onClick={() => {
                        playBeep();
                        setTimeout(() => setIsUplinksOpen(false), 300);
                      }}
                    />
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-cyber-border/30 flex justify-center">
                   <button 
                     onClick={() => { playBeep(); setIsUplinksOpen(false); }}
                     className="group flex items-center gap-2 text-[11px] font-cyber text-cyber-muted uppercase hover:text-cyber-accent transition-colors tracking-[0.3em]"
                   >
                     <Terminal size={14} />
                     <span>[ CLOSE TERMINAL ]</span>
                   </button>
                </div>
              </CyberCard>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
