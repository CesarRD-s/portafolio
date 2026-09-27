import { principles } from './content'

export function AboutPrinciples() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-10">

                {principles.map((item, index) => {
                    const Icon = item.icon

                    return (
                        <div key={item.id} className="flex flex-col items-center text-center group">

                            {/* ICON */}
                            <div className="
                                flex h-12 w-12 items-center justify-center
                                rounded-full
                                border border-neutral-200 dark:border-neutral-800
                                bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 transition
                                group-hover:border-blue-500 group-hover:text-blue-500
                            ">
                                <Icon size={18} />
                            </div>

                            {/* TITLE */}
                            <p className="
                                mt-4 text-sm md:text-base font-medium
                                text-neutral-700 dark:text-neutral-300 transition 
                                group-hover:text-blue-500
                            ">
                                {item.title}
                            </p>

                            {/* DESCRIPTION (OPCIONAL) */}
                            {item.description && (
                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
                                    {item.description}
                                </p>
                            )}

                            {/* LINE */}
                            {index !== principles.length - 1 && (
                                <div className="
                                    mt-6 h-12 w-px
                                    bg-neutral-200 dark:bg-neutral-800
                                    transition group-hover:bg-blue-500/50
                                " />
                            )}

                        </div>
                    )
                })}

            </div>
        </div>
    )
}
