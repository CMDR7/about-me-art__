
import React from 'react';

interface CyberCardProps {
  title: string;
  children: React.ReactNode;
}

const CyberCard: React.FC<CyberCardProps> = ({ title, children }) => {
  return (
    <div className="relative bg-cyber-surface/60 border border-cyber-border p-5 md:p-6 cyber-border overflow-hidden group backdrop-blur-md transition-colors duration-500">
      {/* Subtle background pattern with updated accent color */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--cyber-accent)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-4 bg-cyber-accent shadow-[0_0_10px_var(--cyber-accent)] transition-all duration-500"></div>
          <h2 className="text-[10px] font-cyber font-bold tracking-[0.3em] text-cyber-accent opacity-90 uppercase transition-colors duration-500">
            {title}
          </h2>
        </div>
        
        <div className="text-cyber-text">
          {children}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-cyber-accent/30 group-hover:bg-cyber-accent/60 transition-all duration-500"></div>
      <div className="absolute bottom-2 right-2 text-[7px] text-cyber-muted opacity-40 font-mono tracking-widest uppercase">
        Node_Status: [ Active ]
      </div>
    </div>
  );
};

export default CyberCard;
