'use client'

import type { PortfolioSkill } from '@/app/lib/portfolio/types'
import Image from 'next/image'
import { useState } from 'react'
import { SkillCard } from './SkillCard'

interface Props {
    skills: PortfolioSkill[]
}

export function AboutStack({ skills }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const primary = skills.filter((skill) => skill.isPrimary)
    const visibleSkills = primary.length > 0 ? primary : skills

    return (
        <section className="w-full">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end
                sm:justify-between md:mb-16">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground
                    sm:text-4xl">
                    Tecnologías principales
                </h2>

                {skills.length > visibleSkills.length && (
                    <button
                        type="button"
                        onClick={() => setIsOpen((current) => !current)}
                        aria-expanded={isOpen}
                        className="inline-flex min-h-11 w-fit cursor-pointer items-center
                            rounded-full bg-surface-subtle px-5 text-sm font-semibold
                            text-foreground transition-colors hover:bg-surface-hover
                            focus-visible:outline-2 focus-visible:outline-offset-4
                            focus-visible:outline-brand"
                    >
                        {isOpen ? 'Ver principales' : 'Ver todas las tecnologías'}
                    </button>
                )}
            </div>

            {isOpen ? (
                <SkillCard skills={skills} />
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4
                    lg:grid-cols-5">
                    {visibleSkills.map((skill) => (
                        <article
                            key={skill.id}
                            className="group flex min-h-32 flex-col justify-between
                                rounded-2xl bg-surface-subtle p-4 transition-colors
                                hover:bg-surface-hover sm:min-h-36 sm:p-5"
                        >
                            <Image
                                src={skill.logoUrl}
                                alt=""
                                width={40}
                                height={40}
                                className="h-8 w-8 shrink-0 object-contain
                                    transition-transform duration-200
                                    group-hover:scale-105 sm:h-10 sm:w-10"
                            />
                            <span className="mt-6 text-sm font-medium text-foreground">
                                {skill.title}
                            </span>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
