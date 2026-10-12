'use client'

import { Alert } from '@/app/components/ui/Alert'
import { Button } from '@/app/components/ui/Button'
import type { PortfolioProject } from '@/app/lib/portfolio/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'

type Props = {
    projects: PortfolioProject[]
}

export function ProjectList({ projects }: Props) {

    const [showMore, setShowMore] = useState<boolean>(false)
    const projectsToShow = showMore ? projects : projects.slice(0, 2)

    return (
        <>
            {!projects.length ? (
                <Alert type="info" message='Aún no hay proyectos para mostrar' />
            ) : (
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                    {projectsToShow.map(project => (
                        <article
                            key={project.id}
                            className="group grid overflow-hidden rounded-2xl bg-surface-subtle
                            transition-colors hover:bg-surface-hover
                            md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
                        >

                            {/* IMAGE */}
                            <div
                                className="relative aspect-[16/10] w-full overflow-hidden bg-surface
                                md:aspect-auto md:min-h-[260px]"
                            >
                                <Image
                                    src={project.imgUrl}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 38vw"
                                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="flex flex-col gap-3 p-5 sm:p-7">

                                {/* TITLE */}
                                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                    {project.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p
                                    className="line-clamp-4 text-sm leading-relaxed text-muted"
                                >
                                    {project.description}
                                </p>

                                {/* STACK */}
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-surface px-2.5 py-1 text-xs
                                            font-medium text-muted"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* ROLE */}
                                <p
                                    className="pt-1 text-xs text-soft"
                                >
                                    Rol: {project.role}
                                </p>

                                {/* CTA */}
                                {(project.repo || project.demo) && (
                                    <div className="flex flex-wrap gap-5">
                                        {project.repo && (
                                            <Link
                                                href={project.repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold
                                                text-brand transition hover:underline"
                                            >
                                                <FaGithub size={14} />
                                                Repositorio
                                            </Link>
                                        )}

                                        {project.demo && (
                                            <Link
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold
                                                text-brand transition hover:underline"
                                            >
                                                Demo
                                                <ArrowUpRight size={14} />
                                            </Link>
                                        )}
                                    </div>
                                )}

                            </div>
                        </article>
                    ))}
                </div>
            )}

            {projects.length > 2 && (
                <div className="mt-6 flex justify-center">
                    <Button
                        onClick={() => setShowMore(prev => !prev)}
                        action={showMore ? 'Mostrar menos' : 'Mostrar todos'}
                    />
                </div>
            )}
        </>
    )
}
