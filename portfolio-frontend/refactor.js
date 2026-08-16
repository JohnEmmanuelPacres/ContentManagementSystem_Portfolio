const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(/import Chatbot from "@\/components\/Chatbot";/, 'import Chatbot from "@/components/Chatbot";\nimport { ExperienceCard, CertificationCard, AchievementCard, ProjectCard, EducationCard, OrganizationCard } from "@/components/Cards";');

// Experience
code = code.replace(/<div \s*key=\{work\._id\}[\s\S]*?\{work\.endYear \|\| "Present"\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>/m, '<ExperienceCard key={work._id} work={work} />');

// Certifications
code = code.replace(/<div \s*key=\{certification\._id\}[\s\S]*?<\/a>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>/m, '<CertificationCard key={certification._id} certification={certification} />');

// Achievements
code = code.replace(/<div \s*key=\{achievement\._id\}[\s\S]*?<\/a>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>/m, '<AchievementCard key={achievement._id} achievement={achievement} />');

// Projects
code = code.replace(/<div \s*key=\{project\._id\}[\s\S]*?<\/a>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>/m, '<ProjectCard key={project._id} project={project} />');

// Education
code = code.replace(/<div \s*key=\{edu\._id\}[\s\S]*?\{edu\.endYear \|\| "Present"\}\n\s*<\/span>\n\s*<\/div>\n\s*<\/div>/m, '<EducationCard key={edu._id} edu={edu} />');

// Organizations
code = code.replace(/<div \s*key=\{org\._id\}[\s\S]*?\{org\.endYear \|\| "Present"\}\n\s*<\/span>\n\s*<\/div>\n\s*<\/div>/m, '<OrganizationCard key={org._id} org={org} />');

fs.writeFileSync('src/app/page.tsx', code);
