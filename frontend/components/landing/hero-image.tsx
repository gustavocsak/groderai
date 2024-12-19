export default function HeroImage() {
  return (
    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <svg
            className="w-[40rem] h-[40rem] text-gray-900"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            
            <defs>
            <filter id="blur-effect" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
            <linearGradient id="window-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            </defs>
            
        
            <circle cx="100" cy="400" r="50" fill="#818CF8" opacity="0.1" filter="url(#blur-effect)" />
            <circle cx="400" cy="350" r="40" fill="#22C55E" opacity="0.1" filter="url(#blur-effect)" />
        
            <rect 
            x="50" 
            y="50" 
            width="400" 
            height="300" 
            rx="12" 
            fill="url(#window-gradient)"
            stroke="#334155"
            strokeWidth="1.5"
            className="drop-shadow-lg"
            />
            
        
            <circle cx="85" cy="80" r="6" fill="#FF5F56" />
            
            <circle cx="110" cy="80" r="6" fill="#FFBD2E" />
            
            <circle cx="135" cy="80" r="6" fill="#27C93F" />
            

            <rect x="70" y="120" width="200" height="8" rx="4" fill="#64748B" opacity="0.7"/>
            <rect x="70" y="140" width="150" height="8" rx="4" fill="#818CF8" opacity="0.8"/>
            <rect x="70" y="160" width="180" height="8" rx="4" fill="#64748B" opacity="0.7"/>
            <rect x="70" y="180" width="120" height="8" rx="4" fill="#818CF8" opacity="0.8"/>

            <circle cx="400" cy="120" r="20" fill="#22C55E" opacity="0.1" filter="url(#blur-effect)" />
            <path 
            d="M390 120L398 128L410 112" 
            stroke="#22C55E" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <circle cx="400" cy="180" r="20" fill="#EF4444" opacity="0.1" filter="url(#blur-effect)" />
            <path 
            d="M390 170L410 190M410 170L390 190" 
            stroke="#EF4444" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
    </div>
  );
}