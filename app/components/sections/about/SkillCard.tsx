'use client'

import type { PortfolioSkill } from '@/app/lib/portfolio/types'
import Image from 'next/image'
import { useMemo } from 'react'

type Props = {
    skills: PortfolioSkill[]
}

export function SkillCard({ skills }: Props) {
    const groups = useMemo(() => {
        const groupedSkills = new Map<string, PortfolioSkill[]>()

        skills.forEach((skill) => {
            const category = skill.category.trim() || 'Otros'
            const categorySkills = groupedSkills.get(category) ?? []

            categorySkills.push(skill)
            groupedSkills.set(category, categorySkills)
        })

        return Array.from(groupedSkills.entries())
    }, [skills])

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {groups.map(([category, categorySkills]) => (
                <section
                    key={category}
                    aria-label={`Tecnologías de ${category}`}
                    className="rounded-3xl bg-surface-subtle p-6 sm:p-8"
                >
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>

                    <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6">
                        {categorySkills.map((skill) => (
                            <li key={skill.id} className="flex min-w-0 items-center gap-3">
                                <Image
                                    width={36}
                                    height={36}
                                    src={skill.logoUrl}
                                    alt=""
                                    className="h-8 w-8 shrink-0 object-contain"
                                />
                                <span className="min-w-0 text-sm font-medium text-foreground">
                                    {skill.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    )
}
