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
                projectsToShow.map((project => (
                    <div
                        key={project.id}
                        className="group flex flex-col md:grid md:grid-cols-3 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800
                            bg-white dark:bg-neutral-900 transition hover:-translate-y-[3px] hover:shadow-lg"
                    >

                        {/* IMAGE */}
                        <div className="relative h-40 w-full md:size-full overflow-hidden">
                            <Image
                                src={project.imgUrl}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 450px"
                                className="object-cover"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="md:col-span-2 p-5 flex flex-col gap-4">

                            {/* TITLE */}
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                {project.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-4">
                                {project.description}
                            </p>

                            {/* STACK */}
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="
                                            text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* ROLE */}
                            <p className="text-xs text-neutral-500">
                                Rol: {project.role}
                            </p>

                            {/* CTA */}
                            {(project.repo || project.demo) && (
                                <div className="mt-2 flex flex-wrap gap-4">
                                    {project.repo && (
                                        <Link
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline">
                                            <FaGithub size={14} />
                                            Repositorio
                                        </Link>
                                    )}

                                    {project.demo && (
                                        <Link
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline">
                                            Demo
                                            <ArrowUpRight size={14} />
                                        </Link>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>
                )))
            )}

            {projects.length > 2 && (
                <div className="flex justify-center mt-4">
                    <Button
                        onClick={() => setShowMore(prev => !prev)}
                        action={showMore ? 'Mostrar menos' : 'Mostrar todos'}
                    />
                </div>
            )}
        </>
    )
}
