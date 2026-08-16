import fs from "fs";
import path from "path";
import { client } from "@/sanity/client";
import Chatbot from "@/components/Chatbot";
import { ExperienceCard, CertificationCard, AchievementCard, ProjectCard, EducationCard, OrganizationCard } from "@/components/Cards";
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

function parseDateStr(dateStr: string): number {
  if (!dateStr) return 0;
  if (dateStr.toLowerCase() === "present") return Infinity;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 0 : date.getTime();
}

export default async function Home() {
  const [
    projects,
    education,
    works,
    certifications,
    achievements,
    organizations,
    contacts,
  ] = await Promise.all([
    client.fetch<Project[]>(`*[_type == "project"]{
      _id, title, description, techStack, liveUrl, githubLink,
      "imageUrl": mainImage.asset->url
    }`),
    client.fetch<Education[]>(`*[_type == "education"] | order(endYear desc, startYear desc) {
      _id, universityName, courseName, address, startYear, endYear
    }`),
    client.fetch<Work[]>(`*[_type == "work"] | order(endYear desc, startYear desc) {
      _id, companyName, jobTitle, companyAddress, startYear, endYear
    }`),
    client.fetch<Certification[]>(`*[_type == "certification"] | order(issueDate desc) {
      _id, "titleName": title, "issuerName": issuer, issueDate, expirationDate, description, credentialURL,
      "qrImage": qrImage.asset->url
    }`),
    client.fetch<Achievement[]>(`*[_type == "achievement"] | order(awardDate desc) {
      _id, "achievementName": achievement, awardDate, awardingOrganization, link, description,
      "qrImage": qrImage.asset->url
    }`),
    client.fetch<Organization[]>(`*[_type == "organization"] {
      _id, organizationName, organizationRole, startYear, endYear
    }`),
    client.fetch<Contact[]>(`*[_type == "contact"] {
      _id, email, linkedIn, github, phoneNumber
    }`)
  ]);

  organizations.sort((a, b) => {
    const endA = parseDateStr(a.endYear);
    const endB = parseDateStr(b.endYear);
    if (endA !== endB) {
      return endB - endA;
    }
    const startA = parseDateStr(a.startYear);
    const startB = parseDateStr(b.startYear);
    return startB - startA;
  });


  // Check if profile.png exists in the public directory (Server-side check)
  const hasProfileImage = fs.existsSync(path.join(process.cwd(), "public", "profile.png"));
  const profileSrc = hasProfileImage 
    ? "/profile.png" 
    : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600";

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 text-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-16">
          {/* Profile Picture */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0">
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
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-5 pt-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-blue-400">JE Pacres</span>
            </h1>
            
            {contacts && contacts.length > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                {contacts[0].phoneNumber && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {contacts[0].phoneNumber}
                  </span>
                )}
                {contacts[0].email && (
                  <a href={contacts[0].email.startsWith('mailto:') ? contacts[0].email : `mailto:${contacts[0].email}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-600 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Email
                  </a>
                )}
                {contacts[0].linkedIn && (
                  <a href={contacts[0].linkedIn} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 text-sm font-medium hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover/btn:text-[#0A66C2] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                )}
                {contacts[0].github && (
                  <a href={contacts[0].github} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 text-sm font-medium hover:bg-white/10 hover:border-white/30 hover:text-white transition-colors">
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
                  {works.map((work) => (<ExperienceCard key={work._id} work={work} />))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className="flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                  Certifications
                </h2>
                <div className="flex flex-col gap-6">
                  {certifications.map((certification) => (<CertificationCard key={certification._id} certification={certification} />))}
                </div>
              </section>
            )}

            {/* Achievements Section */}
            {achievements && achievements.length > 0 && (
              <section className="flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                  Achievements
                </h2>
                <div className="flex flex-col gap-6">
                  {achievements.map((achievement) => (<AchievementCard key={achievement._id} achievement={achievement} />))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            <section className="flex flex-col gap-8">
              <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (<ProjectCard key={project._id} project={project} />))}
              </div>
            </section>
          </div>

          {/* Right Column: Education & Organization */}
          <div className="lg:col-span-4 flex flex-col gap-8 relative">
            <div className="sticky top-24 flex flex-col gap-8">
              
              {/* Education Section */}
              {education && education.length > 0 && (
                <section className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    Education
                  </h2>
                  <div className="flex flex-col gap-6">
                    {education.map((edu) => (<EducationCard key={edu._id} edu={edu} />))}
                  </div>
                </section>
              )}

              {/* Divider if both exist */}
              {education?.length > 0 && organizations?.length > 0 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              )}

              {/* Organization Section */}
              {organizations && organizations.length > 0 && (
                <section className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Organizations
                  </h2>
                  <div className="flex flex-col gap-6">
                    {organizations.map((org) => (<OrganizationCard key={org._id} org={org} />))}
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