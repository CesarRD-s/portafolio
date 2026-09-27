import { Section } from "@/app/components/layout/Section"
import { ContactForm } from './ContactForm'

export function ContactSection() {
    return (
        <Section id="contact">

            <div className="flex flex-col gap-14">

                {/* BLOQUE 2: FORMULARIO */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold text-center">
                        Contáctame
                    </h2>

                    <p className="text-neutral-500 max-w-xl mx-auto">
                        Completa el formulario y a la brevedad me pondré en contacto contigo.
                    </p>

                    <div className="max-w-xl mx-auto w-full">
                        <ContactForm />
                    </div>
                </div>

            </div>
        </Section>
    )
}
