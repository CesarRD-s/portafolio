import { capabilities } from './content'

export function AboutCapabilities() {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {capabilities.map((item) => {
                    const Icon = item.icon

                    return (
                        <div
                            key={item.id}
                            className="
                                group flex flex-col items-start gap-4
                                p-5 rounded-xl
                                border border-neutral-200/70 dark:border-neutral-800/70
                                bg-white/60 dark:bg-neutral-900/60 transition
                                hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md"
                        >

                            {/* ICON */}
                            <div className="
                                flex items-center justify-center
                                w-11 h-11 rounded-xl
                                bg-blue-500/10 text-blue-500 transition
                                group-hover:bg-blue-500/20"
                            >
                                <Icon size={18} />
                            </div>

                            {/* CONTENT */}
                            <div className="flex flex-col gap-1 text-left">

                                <p className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                                    {item.title}
                                </p>

                                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                    {item.description}
                                </p>

                            </div>

                        </div>
                    )
                })}

            </div>
        </div>
    )
}
