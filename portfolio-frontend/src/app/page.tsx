// src/app/page.tsx
import fs from "fs";
import path from "path";
import { client } from "@/sanity/client";
import Chatbot from "@/components/Chatbot";
import Typewriter from "@/components/Typewriter";

type Certification = {
  _id: string;
  titleName: string;
  issuerName: string,
  issueDate: string,
  expirationDate: string,
  description: string,
  credentialURL: string,
  qrImage: string,
};

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubLink: string;
  imageUrl: string;
};

type Education = {
  _id: string;
  universityName: string;
  courseName: string;
  address: string;
  startYear: string;
  endYear: string;
};

type Work = {
  _id: string;
  companyName: string;
  jobTitle: string;
  companyAddress: string;
  startYear: string;
  endYear: string;
};

type Organization = {
  _id: string;
  organizationName: string;
  organizationRole: string;
  startYear: string;
  endYear: string;
};

type Contact = {
  _id: string;
  email: string;
  linkedIn: string;
  github: string;
  phoneNumber: string;
};

type Achievement = {
  _id: string;
  achievementName: string;
  awardDate: string;
  awardingOrganization: string;
  link: string;
  description: string;
  qrImage: string;
}

export default async function Home() {
  // Fetch data using GROQ syntax
  const projects = await client.fetch<Project[]>(`*[_type == "project"]{
    _id, title, description, techStack, liveUrl, githubLink,
    "imageUrl": mainImage.asset->url
    }`
  );

  const education = await client.fetch<Education[]>(`*[_type == "education"] | order(endYear desc, startYear desc) {
    _id, universityName, courseName, address, startYear, endYear
  }`);

  const works = await client.fetch<Work[]>(`*[_type == "work"] | order(endYear desc, startYear desc) {
    _id, companyName, jobTitle, companyAddress, startYear, endYear
  }`);

  const certifications = await client.fetch<Certification[]>(`*[_type == "certification"] | order(issueDate desc) {
    _id, "titleName": title, "issuerName": issuer, issueDate, expirationDate, description, credentialURL,
    "qrImage": qrImage.asset->url
  }`);

  const achievements = await client.fetch<Achievement[]>(`*[_type == "achievement"] | order(awardDate desc) {
    _id, "achievementName": achievement, awardDate, awardingOrganization, link, description,
    "qrImage": qrImage.asset->url
  }`);

  const organizations = await client.fetch<Organization[]>(`*[_type == "organization"] | order(endYear desc, startYear desc) {
    _id, organizationName, organizationRole, startYear, endYear
  }`);

  const contacts = await client.fetch<Contact[]>(`*[_type == "contact"] {
    _id, email, linkedIn, github, phoneNumber
  }`);

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-400">Available for work</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">JE Pacres</span>
            </h1>
            
            {contacts && contacts.length > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                {contacts[0].phoneNumber && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {contacts[0].phoneNumber}
                  </span>
                )}
                {contacts[0].email && (
                  <a href={contacts[0].email.startsWith('mailto:') ? contacts[0].email : `mailto:${contacts[0].email}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/50 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Email
                  </a>
                )}
                {contacts[0].linkedIn && (
                  <a href={contacts[0].linkedIn} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover/btn:text-[#0A66C2] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                )}
                {contacts[0].github && (
                  <a href={contacts[0].github} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-white/10 hover:border-white/30 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover/btn:text-white transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    GitHub
                  </a>
                )}
              </div>
            )}
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed min-h-[60px] md:min-h-[84px]">
              <Typewriter 
                phrases={[
                  "A passionate Computer Engineering student and Developer based in Cebu City, Philippines.",
                  "Always eager to learn and explore new and emerging technologies.",
                  "Interested in Machine Learning, Statistics, and Applied Calculus.",
                  "Working to leverage AI and modern technologies to solve real world problems",
                ]} 
              />
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Work Experience Section */}
            {works && works.length > 0 && (
              <section className="flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  Experience
                </h2>
                <div className="flex flex-col gap-6">
                  {works.map((work) => (
                    <div 
                      key={work._id} 
                      className="group flex flex-col sm:flex-row sm:items-start justify-between bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-300 p-6"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                          {work.jobTitle}
                        </h3>
                        <h4 className="text-lg text-blue-300 font-medium">
                          {work.companyName}
                        </h4>
                        {work.companyAddress && (
                          <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                            {work.companyAddress}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium whitespace-nowrap">
                          {work.startYear} - {work.endYear || "Present"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className="flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                  Certifications
                </h2>
                <div className="flex flex-col gap-6">
                  {certifications.map((certification) => (
                    <div 
                      key={certification._id} 
                      className="group flex flex-col bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-yellow-500/30 hover:bg-slate-800/50 transition-all duration-300 p-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* QR Image, if any */}
                        {certification.qrImage && (
                          <div className="shrink-0 hidden sm:block">
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700/50 bg-white p-1.5 shadow-inner">
                              <img 
                                src={certification.qrImage} 
                                alt="QR Code" 
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold text-slate-200 group-hover:text-yellow-400 transition-colors flex items-center gap-3">
                              {certification.titleName}
                              {/* Mobile QR Image */}
                              {certification.qrImage && (
                                <img 
                                  src={certification.qrImage} 
                                  alt="QR" 
                                  className="w-8 h-8 sm:hidden rounded bg-white p-0.5"
                                />
                              )}
                            </h3>
                            <h4 className="text-base text-yellow-300/80 font-medium">
                              {certification.issuerName}
                            </h4>
                            {certification.description && (
                              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                {certification.description}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 flex flex-col items-start sm:items-end gap-3">
                            <div className="flex flex-col gap-2 items-start sm:items-end">
                              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium whitespace-nowrap">
                                Issued: {certification.issueDate}
                              </div>
                              {certification.expirationDate && (
                                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm font-medium whitespace-nowrap">
                                  Expires: {certification.expirationDate}
                                </div>
                              )}
                            </div>
                            {certification.credentialURL && (
                              <a 
                                href={certification.credentialURL} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-sm font-medium text-yellow-500/80 hover:text-yellow-400 flex items-center gap-1.5 transition-colors mt-1"
                              >
                                View Credential
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements Section */}
            {achievements && achievements.length > 0 && (
              <section className="flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                  Achievements
                </h2>
                <div className="flex flex-col gap-6">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement._id} 
                      className="group flex flex-col bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-orange-500/30 hover:bg-slate-800/50 transition-all duration-300 p-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* QR Image, if any */}
                        {achievement.qrImage && (
                          <div className="shrink-0 hidden sm:block">
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700/50 bg-white p-1.5 shadow-inner">
                              <img 
                                src={achievement.qrImage} 
                                alt="QR Code" 
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold text-slate-200 group-hover:text-orange-400 transition-colors flex items-center gap-3">
                              {achievement.achievementName}
                              {/* Mobile QR Image */}
                              {achievement.qrImage && (
                                <img 
                                  src={achievement.qrImage} 
                                  alt="QR" 
                                  className="w-8 h-8 sm:hidden rounded bg-white p-0.5"
                                />
                              )}
                            </h3>
                            <h4 className="text-base text-orange-300/80 font-medium">
                              {achievement.awardingOrganization}
                            </h4>
                            {achievement.description && (
                              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                {achievement.description}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 flex flex-col items-start sm:items-end gap-3">
                            <div className="flex flex-col gap-2 items-start sm:items-end">
                              {achievement.awardDate && (
                                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium whitespace-nowrap">
                                  Date: {achievement.awardDate}
                                </div>
                              )}
                            </div>
                            {achievement.link && (
                              <a 
                                href={achievement.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-sm font-medium text-orange-500/80 hover:text-orange-400 flex items-center gap-1.5 transition-colors mt-1"
                              >
                                View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            <section className="flex flex-col gap-8">
              <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project._id} 
                    className="group flex flex-col bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all duration-300 overflow-hidden"
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
                      <h3 className="text-xl font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <details className="group/details mt-1">
                        <summary className="cursor-pointer text-sm font-medium text-indigo-400/80 hover:text-indigo-300 transition-colors list-none [&::-webkit-details-marker]:hidden flex items-center gap-1.5 select-none w-fit">
                          <span className="group-open/details:hidden">About Project</span>
                          <span className="hidden group-open/details:inline">Hide Summary</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-open/details:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                        </summary>
                        <p className="text-slate-400 text-sm leading-relaxed mt-3 pl-3 border-l-2 border-indigo-500/30">
                          {project.description}
                        </p>
                      </details>
                      
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
                            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
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

          {/* Right Column: Education & Organization */}
          <div className="lg:col-span-4 flex flex-col gap-8 relative">
            <div className="sticky top-24 flex flex-col gap-8 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl">
              
              {/* Education Section */}
              {education && education.length > 0 && (
                <section className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    Education
                  </h2>
                  <div className="flex flex-col gap-6">
                    {education.map((edu) => (
                      <div 
                        key={edu._id} 
                        className="group flex flex-col gap-2 border-b border-slate-800/50 pb-6 last:border-0 last:pb-0"
                      >
                        <h3 className="text-lg font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                          {edu.universityName}
                        </h3>
                        <h4 className="text-sm text-blue-300/80 font-medium">
                          {edu.courseName}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          {edu.address && (
                            <span className="text-slate-400 text-xs flex items-center gap-1.5">
                              {edu.address}
                            </span>
                          )}
                          <span className="text-slate-500 text-xs font-medium whitespace-nowrap ml-2">
                            {edu.startYear} - {edu.endYear || "Present"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Divider if both exist */}
              {education?.length > 0 && organizations?.length > 0 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
              )}

              {/* Organization Section */}
              {organizations && organizations.length > 0 && (
                <section className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Organizations
                  </h2>
                  <div className="flex flex-col gap-6">
                    {organizations.map((org) => (
                      <div 
                        key={org._id} 
                        className="group flex flex-col gap-2 border-b border-slate-800/50 pb-6 last:border-0 last:pb-0"
                      >
                        <h3 className="text-lg font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                          {org.organizationName}
                        </h3>
                        <h4 className="text-sm text-emerald-300/80 font-medium">
                          {org.organizationRole}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-slate-500 text-xs font-medium">
                            {org.startYear} - {org.endYear || "Present"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </main>
  );
}