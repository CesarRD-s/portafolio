import { ReactNode } from "react"
import { Container } from "./Container"

type SectionProps = {
    children: ReactNode
    title?: string
    id?: string
    description?: string
    className?: string
}

export const Section = ({
    children,
    title,
    id,
    description,
    className = ''
}: SectionProps) => {
    return (
        <section
            id={id}
            className={`flex w-full items-center justify-center py-16 md:py-24 ${className}`}
        >
            <Container>

                {(title || description) && (
                    <div className="mb-10 md:mb-12 max-w-3xl">

                        {title && (
                            <h2
                                className="text-3xl font-semibold tracking-tight text-foreground
                                md:text-4xl"
                            >
                                {title}
                            </h2>
                        )}

                        {description && (
                            <p className="mt-3 text-muted">
                                {description}
                            </p>
                        )}

                    </div>
                )}

                {children}

            </Container>
        </section>
    )
}
