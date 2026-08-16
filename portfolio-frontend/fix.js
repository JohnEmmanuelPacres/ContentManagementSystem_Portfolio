const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace emerald with blue globally
code = code.replace(/emerald/g, 'blue');

// Replace rounded-2xl border border-slate-700 with chamfer in the right column
code = code.replace(/rounded-2xl border border-slate-700/g, 'chamfer');

// Fix text colors for titles to match cards (slate-200 -> blue-950 for headings)
code = code.replace(/text-slate-100/g, 'text-blue-950');
code = code.replace(/text-slate-200/g, 'text-blue-950');

// Fix the right column background to match cards
code = code.replace(/bg-slate-800 chamfer/g, 'bg-blue-200 chamfer');

// Fix the body text color inside details
code = code.replace(/text-slate-400 text-sm leading-relaxed/g, 'text-blue-900/80 text-sm leading-relaxed');

// Replace the Profile Picture block with the spinning gear
const profilePicTarget = `          <div className="relative shrink-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-sm">
              <img 
                src={profileSrc} 
                alt="JE Pacres Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>`;

const profilePicReplacement = `          <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0">
            {/* SVG Definition for Spinning Gear Mask */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="spinningGear" clipPathUnits="objectBoundingBox">
                  <polygon points="0.42,0 0.58,0 0.62,0.15 0.70,0.18 0.80,0.08 0.92,0.20 0.82,0.30 0.85,0.38 1,0.42 1,0.58 0.85,0.62 0.82,0.70 0.92,0.80 0.80,0.92 0.70,0.82 0.62,0.85 0.58,1 0.42,1 0.38,0.85 0.30,0.82 0.20,0.92 0.08,0.80 0.18,0.70 0.15,0.62 0,0.58 0,0.42 0.15,0.38 0.18,0.30 0.08,0.20 0.20,0.08 0.30,0.18 0.38,0.15">
                    <animateTransform attributeName="transform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="20s" repeatCount="indefinite" />
                  </polygon>
                </clipPath>
              </defs>
            </svg>

            {/* Border Layer (Static div, but its mask spins) */}
            <div className="absolute inset-0 bg-blue-300 shadow-sm" style={{ clipPath: 'url(#spinningGear)' }}></div>
            
            {/* Inner Image Layer (Static div and image, but mask spins) */}
            <div className="absolute inset-1 bg-slate-800" style={{ clipPath: 'url(#spinningGear)' }}>
              <img 
                src={profileSrc} 
                alt="JE Pacres Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>`;

code = code.replace(profilePicTarget, profilePicReplacement);

// Fix the main gradient line (was slate-700, now blue-400)
code = code.replace(/from-transparent via-slate-700 to-transparent/g, 'from-transparent via-blue-400 to-transparent');

// Fix tech stack pills (were bg-slate-800 text-slate-300 border-slate-700/50, now bg-blue-300 text-blue-950 border-blue-400)
code = code.replace(/bg-slate-800 text-slate-300 text-xs font-medium rounded-md border border-slate-700\/50/g, 'bg-blue-300 text-blue-950 text-xs font-medium rounded-md border border-blue-400');

// Fix Github link text color in Projects
code = code.replace(/text-slate-400 hover:text-white/g, 'text-blue-900/80 hover:text-white');

fs.writeFileSync('src/app/page.tsx', code);
