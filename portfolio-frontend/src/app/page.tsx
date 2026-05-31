// src/app/page.tsx
import { client } from "@/sanity/client";

// Define the TypeScript type for your project data
type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
};

export default async function Home() {
  // Fetch data using GROQ syntax
  // This says: "Get all documents where the type is 'project'"
  const projects = await client.fetch<Project[]>(`*[_type == "project"]`);

  return (
    <main className="min-h-screen p-12 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            {/* Render the tech stack pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack?.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                View Live Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}