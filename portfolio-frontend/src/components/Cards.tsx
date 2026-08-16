import React from "react";

export function ExperienceCard({ work }: { work: any }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-start justify-between bg-blue-200 chamfer shadow-sm p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-blue-950 ">
          {work.jobTitle}
        </h3>
        <h4 className="text-lg text-blue-800 font-medium">
          {work.companyName}
        </h4>
        {work.companyAddress && (
          <p className="text-blue-950/90 font-medium text-sm flex items-center gap-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            {work.companyAddress}
          </p>
        )}
      </div>
      <div className="mt-4 sm:mt-0">
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-900/10 border border-blue-900/20 text-blue-900 text-sm font-medium whitespace-nowrap">
          {work.startYear} - {work.endYear || "Present"}
        </div>
      </div>
    </div>
  );
}

export function CertificationCard({ certification }: { certification: any }) {
  return (
    <div className="group flex flex-col bg-blue-200 chamfer shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* QR Image, if any */}
        {certification.qrImage && (
          <div className="shrink-0 hidden sm:block">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-blue-800/50 bg-white p-1.5 shadow-inner">
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
            <h3 className="text-xl font-semibold text-blue-950 flex items-center gap-3">
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
            <h4 className="text-base text-blue-800 font-semibold font-medium">
              {certification.issuerName}
            </h4>
            {certification.description && (
              <p className="text-blue-950/90 font-medium text-sm mt-2 leading-relaxed">
                {certification.description}
              </p>
            )}
          </div>
          <div className="shrink-0 flex flex-col items-start sm:items-end gap-3">
            <div className="flex flex-col gap-2 items-start sm:items-end">
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-900/10 border border-blue-900/20 text-blue-900 text-sm font-medium whitespace-nowrap">
                Issued: {certification.issueDate}
              </div>
              {certification.expirationDate && (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-800 border border-blue-700 text-blue-300 text-sm font-medium whitespace-nowrap">
                  Expires: {certification.expirationDate}
                </div>
              )}
            </div>
            {certification.credentialURL && (
              <a 
                href={certification.credentialURL} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm font-medium text-blue-700 hover:text-blue-950 font-bold flex items-center gap-1.5 transition-colors mt-1"
              >
                View Credential
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AchievementCard({ achievement }: { achievement: any }) {
  return (
    <div className="group flex flex-col bg-blue-200 chamfer shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* QR Image, if any */}
        {achievement.qrImage && (
          <div className="shrink-0 hidden sm:block">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-blue-800/50 bg-white p-1.5 shadow-inner">
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
            <h3 className="text-xl font-semibold text-blue-950 flex items-center gap-3">
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
            <h4 className="text-base text-blue-800 font-semibold font-medium">
              {achievement.awardingOrganization}
            </h4>
            {achievement.description && (
              <p className="text-blue-950/90 font-medium text-sm mt-2 leading-relaxed">
                {achievement.description}
              </p>
            )}
          </div>
          <div className="shrink-0 flex flex-col items-start sm:items-end gap-3">
            <div className="flex flex-col gap-2 items-start sm:items-end">
              {achievement.awardDate && (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-900/10 border border-blue-900/20 text-blue-900 text-sm font-medium whitespace-nowrap">
                  Date: {achievement.awardDate}
                </div>
              )}
            </div>
            {achievement.link && (
              <a 
                href={achievement.link} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm font-medium text-blue-700 hover:text-blue-950 font-bold flex items-center gap-1.5 transition-colors mt-1"
              >
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group flex flex-col bg-blue-200 chamfer shadow-sm overflow-hidden">
      {/* Thumbnail Image */}
      {project.imageUrl && (
        <div className="w-full h-48 overflow-hidden bg-blue-300/50">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col p-6 gap-4">
        <h3 className="text-xl font-semibold text-blue-950 ">
          {project.title}
        </h3>
        <details className="group/details mt-1">
          <summary className="cursor-pointer text-sm font-medium text-blue-950/90 font-medium hover:text-blue-800 transition-colors list-none [&::-webkit-details-marker]:hidden flex items-center gap-1.5 select-none w-fit">
            <span className="group-open/details:hidden">About Project</span>
            <span className="hidden group-open/details:inline">Hide Summary</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-open/details:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <p className="text-blue-950/90 font-medium text-sm leading-relaxed mt-3 pl-3 border-l-2 border-blue-500/30">
            {project.description}
          </p>
        </details>
        
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.techStack?.map((tech: string, index: number) => (
            <span 
              key={index} 
              className="px-2.5 py-1 bg-blue-300 text-blue-950 text-xs font-medium rounded-md border border-blue-400"
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
              className="text-sm font-medium text-blue-800 hover:text-blue-950 font-bold transition-colors flex items-center gap-1.5"
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
              className="text-sm font-medium text-blue-800 hover:text-blue-950 font-bold transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function EducationCard({ edu }: { edu: any }) {
  return (
    <div className="group flex flex-col gap-2 bg-blue-200 chamfer shadow-sm p-6">
      <h3 className="text-lg font-semibold text-blue-950 ">
        {edu.universityName}
      </h3>
      <h4 className="text-sm text-blue-800 font-semibold font-medium">
        {edu.courseName}
      </h4>
      <div className="flex items-center justify-between mt-1">
        {edu.address && (
          <span className="text-blue-950/90 font-medium text-xs flex items-center gap-1.5">
            {edu.address}
          </span>
        )}
        <span className="text-blue-800 font-semibold text-xs font-medium whitespace-nowrap ml-2">
          {edu.startYear} - {edu.endYear || "Present"}
        </span>
      </div>
    </div>
  );
}

export function OrganizationCard({ org }: { org: any }) {
  return (
    <div className="group flex flex-col gap-2 bg-blue-200 chamfer shadow-sm p-6">
      <h3 className="text-lg font-semibold text-blue-950 ">
        {org.organizationName}
      </h3>
      <h4 className="text-sm text-blue-800 font-semibold font-medium">
        {org.organizationRole}
      </h4>
      <div className="flex items-center justify-between mt-1">
        <span className="text-blue-800 font-semibold text-xs font-medium">
          {org.startYear} - {org.endYear || "Present"}
        </span>
      </div>
    </div>
  );
}
