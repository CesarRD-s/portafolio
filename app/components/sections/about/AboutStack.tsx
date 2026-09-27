'use client'

import type { PortfolioSkill } from '@/app/lib/portfolio/types'
import { Layers3 } from "lucide-react"
import { useState } from "react"
import { SkillCard } from "./SkillCard"
import Image from "next/image"
import { Button } from "@/app/components/ui/Button"

interface Props {
    skills: PortfolioSkill[]
}

export function AboutStack({ skills }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const primary = skills.filter((skill) => skill.isPrimary)

    return (
        <section className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col gap-8">

                <div className="flex flex-col items-center text-center gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 
                    text-xs font-medium tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400">
                        <Layers3 className="h-4 w-4" />
                        Tecnologías y Herramientas
                    </span>

                    <div className="max-w-2xl space-y-3">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                            {isOpen ? "Todas las tecnologías" : "Tecnologías principales"}
                        </h2>

                        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                            Un resumen de las tecnologías y herramientas que utilizo para construir aplicaciones
                        </p>
                    </div>
                </div>

                {!isOpen ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {primary.map((skill) => (
                            <div
                                key={skill.id}
                                className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 
                                bg-white/60 dark:bg-neutral-900/60 p-5 text-center transition 
                                hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition 
                                group-hover:bg-blue-500/15">
                                    <Image
                                        src={skill.logoUrl}
                                        alt={skill.title}
                                        width={36}
                                        height={36}
                                        className="h-8 w-8 object-contain"
                                    />
                                </div>

                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                    {skill.title}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <SkillCard skills={skills} />
                )}

                <div className="flex justify-center">
                    <Button
                        onClick={() => setIsOpen(prev => !prev)}
                        action={isOpen ? "Tecnologías principales" : "Todas las tecnologías"}
                    />
                </div>

            </div>
        </section>
    )
}
