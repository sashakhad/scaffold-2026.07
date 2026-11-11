import { ProjectRow } from '@/components/ProjectRow';
import type { Project } from '@/lib/projects';

type ProjectListProps = {
  projects: readonly Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ol className='mt-4 space-y-3'>
      {projects.map(function renderProject(project) {
        return <ProjectRow key={project.slug} project={project} />;
      })}
    </ol>
  );
}
