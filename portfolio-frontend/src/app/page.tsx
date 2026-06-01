// src/app/page.tsx
import fs from "fs";
import path from "path";
import { client } from "@/sanity/client";
import Chatbot from "@/components/Chatbot";

// Define the TypeScript type for your project data
type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubLink: string;
  imageUrl: string;
};

export default async function Home() {
  // Fetch data using GROQ syntax
  const projects = await client.fetch<Project[]>(`*[_type == "project"]{
    _id, title, description, techStack, liveUrl, githubLink,
    "imageUrl": mainImage.asset->url
    }`
  );

  // Check if profile.png exists in the public directory (Server-side check)
  const hasProfileImage = fs.existsSync(path.join(process.cwd(), "public", "profile.png"));
  const profileSrc = hasProfileImage 
    ? "/profile.png" 
    : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600";

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Profile Picture */}
          <div className="relative group">
            {/* Glowing Aura Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            
            {/* Outer Glass Container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/40 p-2 backdrop-blur-xl shadow-2xl">
              {/* Image Frame */}
              <div className="w-full h-full rounded-[20px] overflow-hidden border border-slate-700/50 bg-slate-900">
                <img 
                  src={profileSrc} 
                  alt="JE Pacres Profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-400">Available for work</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">JE Pacres</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              A passionate Computer Engineering student and Developer based in Cebu City, Philippines.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-100">Featured Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className="group flex flex-col bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail Image */}
                {project.imageUrl && (
                  <div className="w-full h-48 overflow-hidden bg-slate-800/50">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col p-6 gap-4">
                  <h3 className="text-xl font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {project.techStack?.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-md border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 mt-2 border-t border-slate-800/50">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Chatbot />
    </main>
  );
}