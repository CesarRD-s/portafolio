import { capabilities } from './content'

export function AboutCapabilities() {
    return (
        <section className="w-full">
            <h2 className="mb-14 text-3xl font-semibold tracking-tight text-foreground
                sm:text-4xl md:mb-20">
                Áreas de trabajo
            </h2>

            <div className="grid gap-x-12 gap-y-14 md:grid-cols-3 md:gap-x-14">
                {capabilities.map((item) => {
                    const Icon = item.icon

                    return (
                        <article
                            key={item.id}
                            className="min-h-56"
                        >
                            <div className="flex h-12 w-12 items-center justify-center
                                rounded-2xl bg-surface text-brand">
                                <Icon
                                    className="h-5 w-5 text-brand"
                                    aria-hidden="true"
                                />
                            </div>

                            <h3 className="mt-8 text-xl font-semibold tracking-tight
                                text-foreground sm:text-2xl">
                                {item.title}
                            </h3>
                            <p className="mt-4 max-w-sm text-base leading-7 text-muted">
                                {item.description}
                            </p>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
