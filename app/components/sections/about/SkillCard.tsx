'use client'

import type { PortfolioSkill } from '@/app/lib/portfolio/types'
import Image from "next/image"
import { useMemo, useState } from "react"

type Props = {
    skills: PortfolioSkill[]
}

type SkillFilter = "all" | string

export function SkillCard({ skills }: Props) {
    const [filter, setFilter] = useState<SkillFilter>("all")

    const filters = useMemo<SkillFilter[]>(() => {
        if (!skills.length) return ["all"]
        const categories = Array.from(new Set(skills.map((skill) => skill.category)))
        return ["all", ...categories]
    }, [skills])

    const skillsMap = useMemo(() => {
        if (!skills.length) return []
        if (filter === "all") return skills
        return skills.filter((skill) => skill.category === filter)
    }, [filter, skills])

    return (
        <div className="space-y-6">

            {/* FILTERS */}
            <div className="flex flex-wrap justify-center gap-2">
                {filters.map((value) => {
                    const isActive = filter === value

                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setFilter(value)}
                            aria-pressed={isActive}
                            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ease-out cursor-pointer
                                ${isActive
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                                    : 'text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-blue-500/40 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                        >
                            {value === "all"
                                ? "Todos"
                                : value.charAt(0).toUpperCase() + value.slice(1)}
                        </button>
                    )
                })}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skillsMap.map((skill) => (
                    <div
                        key={skill.id}
                        className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 
                        bg-white/60 dark:bg-neutral-900/60 transition hover:-translate-y-1 
                        hover:border-blue-500/40 hover:shadow-md"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 
                        transition duration-200 group-hover:bg-blue-500/15"
                        >
                            <Image
                                width={36}
                                height={36}
                                src={skill.logoUrl}
                                alt={skill.title}
                                className="object-contain"
                            />
                        </div>

                        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 text-center">
                            {skill.title}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}
