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
            title="Proyectos"
            className="py-20 md:py-28"
        >

            {/* GRID */}
            <div className="flex flex-col gap-10">
                <ProjectList projects={projects} />
            </div>

        </Section>
    )
}
