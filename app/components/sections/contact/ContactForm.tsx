'use client'

import { Alert } from '@/app/components/ui/Alert'
import { Button } from '@/app/components/ui/Button'
import { Spinner } from '@/app/components/ui/spinner/Spinner'
import { useContactForm } from './useContactForm'
import type { ContactPayload } from '@/app/lib/contact/types'
import { isEmail } from '@/app/utils/isEmail'
import { X } from 'lucide-react'
import { useState, type SubmitEvent } from 'react'

export function ContactForm() {
    const { error, status, setStatus, send } = useContactForm();

    const [form, setForm] = useState<ContactPayload & { company: string }>({
        name: '',
        email: '',
        message: '',
        company: ''
    })

    const [emailError, setEmailError] = useState(false)

    const isValid = Boolean(form.name.trim() && form.email.trim() && form.message.trim())

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

        if (e.target.name === 'email' && emailError) {
            setEmailError(false)
        }
    }

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()

        if (!isEmail(form.email.trim())) {
            setEmailError(true)
            return
        }

        const success = await send(form)
        if (success) {
            setForm({ name: '', email: '', message: '', company: '' })
            setEmailError(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

            {/* HONEYPOT */}
            <input
                id="company"
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
            />

            {/* NAME */}
            <div className="flex flex-col gap-2">
                <label htmlFor='name' className="text-sm text-soft">
                    <span>Nombre y apellido</span>
                    <span className="ml-1 text-danger">*</span>
                </label>
                <input
                    id='name'
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    maxLength={120}
                    required
                    className="rounded-2xl border border-border bg-surface px-4 py-2
                    transition focus:border-brand focus:outline-none"
                />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
                <label htmlFor='email' className="text-sm text-soft">
                    <span>Email</span>
                    <span className="ml-1 text-danger">*</span>
                </label>
                <input
                    id='email'
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={254}
                    required
                    aria-invalid={emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    className={`rounded-2xl border bg-surface px-4 py-2 transition
                        focus:outline-none
                        ${emailError
                            ? 'border-danger focus:border-danger'
                            : 'border-border focus:border-brand'}`}
                />
                {emailError && (
                    <p id="email-error" role="alert" className="text-sm text-danger">
                        Introduce una dirección de correo electrónico válida.
                    </p>
                )}
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-2">
                <label htmlFor='message' className="text-sm text-soft">
                    <span>Mensaje</span>
                    <span className="ml-1 text-danger">*</span>
                </label>
                <textarea
                    id='message'
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    maxLength={5000}
                    required
                    rows={5}
                    className="rounded-2xl border border-border bg-surface px-4 py-2
                    transition focus:border-brand focus:outline-none"
                />
            </div>

            {/* BUTTON */}
            <Button
                className='disabled:cursor-not-allowed disabled:border-border
                disabled:bg-surface-subtle disabled:text-soft'
                type='submit'
                disabled={status === 'sending' || status === 'slow' || !isValid}
                aria-busy={status === 'sending' || status === 'slow'}
                action={(status === 'sending' || status === 'slow') ? <Spinner /> : 'Enviar mensaje'}
            />

            {/* FEEDBACK */}
            <div className="relative" aria-live="polite">

                {status === 'sending' && (<Alert type="info" message="Enviando mensaje..." />)}

                {status === 'slow' && (
                    <Alert
                        type="warning"
                        message="El servidor está iniciando, puede tardar unos segundos..."
                    />
                )}

                {status === 'success' && (<Alert type="success" message="Tu mensaje ha sido enviado con éxito." />)}

                {status === 'error' && (<Alert type="error" message={error ?? 'Ocurrió un error inesperado'} />)}

                {status !== 'idle' && (
                    <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        aria-label="Cerrar aviso"
                        className="cursor-pointer"
                    >
                        <span className="absolute top-3 right-3 cursor-pointer text-xs
                        text-soft hover:text-foreground">
                            <X size={18} />
                        </span>
                    </button>
                )}
            </div>

        </form>
    )
}
