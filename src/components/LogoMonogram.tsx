import React from 'react';

interface LogoMonogramProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  isLightVariant?: boolean;
  className?: string;
}

export const LogoMonogram: React.FC<LogoMonogramProps> = ({
  size = 'md',
  showText = true,
  isLightVariant = false,
  className = ''
}) => {
  const sizeConfig = {
    sm: {
      outerBox: 'w-8 h-8',
      diamond: 'w-6 h-6',
      textDC: 'text-xs',
      title: 'text-xs tracking-[0.1em]',
      subtitle: 'text-[8px] tracking-[0.3em]',
    },
    md: {
      outerBox: 'w-12 h-12',
      diamond: 'w-10 h-10',
      textDC: 'text-base',
      title: 'text-[15px] sm:text-base tracking-[0.08em]',
      subtitle: 'text-[9px] tracking-[0.35em]',
    },
    lg: {
      outerBox: 'w-14 h-14',
      diamond: 'w-12 h-12',
      textDC: 'text-xl',
      title: 'text-lg sm:text-xl tracking-[0.1em]',
      subtitle: 'text-[10px] tracking-[0.4em]',
    },
    hero: {
      outerBox: 'w-20 h-20',
      diamond: 'w-16 h-16',
      textDC: 'text-2xl',
      title: 'text-2xl tracking-[0.15em]',
      subtitle: 'text-xs tracking-[0.45em]',
    }
  }[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* 45-degree rotated diamond badge matching Professional Polish theme */}
      <div className={`flex items-center justify-center ${sizeConfig.outerBox} shrink-0`}>
        <div
          className={`${sizeConfig.diamond} border-[1.5px] border-[#D4AF37] flex items-center justify-center transform rotate-45 transition-transform duration-300 group-hover:scale-105 shadow-md`}
          style={{
            backgroundColor: isLightVariant ? '#261A15' : '#1F1410',
          }}
        >
          <div
            className={`transform -rotate-45 font-cinzel font-bold text-[#D4AF37] ${sizeConfig.textDC} leading-none tracking-tighter`}
            style={{
              fontFamily: "'Cinzel', Georgia, serif"
            }}
          >
            DC
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`serif font-bold uppercase leading-tight ${sizeConfig.title} ${
              isLightVariant ? 'text-[#1F1410]' : 'text-[#FFFFFF]'
            }`}
          >
            DRIGO <span className="text-[#D4AF37] font-normal">&</span> CARNEIRO
          </span>
          <span
            className={`text-slate-400 font-sans uppercase ${sizeConfig.subtitle} mt-0.5 ${
              isLightVariant ? 'text-[#8A6A4B]' : 'text-[#D4AF37]/80'
            }`}
          >
            Advocacia Estratégica
          </span>
        </div>
      )}
    </div>
  );
};
