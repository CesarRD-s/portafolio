import { Section } from '@/app/components/layout/Section'
import { ContactForm } from './ContactForm'

export function ContactSection() {
    return (
        <Section
            id="contact"
            className="py-20 md:py-28"
        >
            <div className="grid w-full gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                <div className="max-w-md md:pt-2">
                    <h2
                        className="text-3xl font-semibold tracking-tight
                        text-foreground sm:text-4xl"
                    >
                        Hablemos
                    </h2>
                    <p className="mt-5 leading-relaxed text-muted">
                        Desarrollo de software, análisis de sistemas y soporte.
                    </p>
                </div>

                <div className="w-full max-w-2xl md:justify-self-end">
                    <ContactForm />
                </div>
            </div>
        </Section>
    )
}
