import { Section } from "@/app/components/layout/Section"
import type { PortfolioProject } from '@/app/lib/portfolio/types'
import { ProjectList } from './ProjectList'

type Props = {
    projects: PortfolioProject[]
}

export function ProjectsSection({ projects }: Props) {
    return (
        <Section
            id="projects"
            title="Proyectos Destacados"
            description="Una selección de proyectos que reflejan mi experiencia">

            {/* GRID */}
            <div className="flex flex-col gap-10">
                <ProjectList projects={projects} />
            </div>

        </Section>
    )
}
