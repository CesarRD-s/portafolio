import { Check, CircleX, Info, LucideIcon, TriangleAlert } from "lucide-react"

type AlertProps = {
    type: 'info' | 'success' | 'error' | 'warning'
    message: string
}

export function Alert({ type = 'info', message }: AlertProps) {
    const styles = {
        info: 'border-2 border-brand/20 text-brand',
        success: 'border-2 border-success/20 text-success',
        error: 'border-2 border-danger/20 text-danger',
        warning: 'border-2 border-warning/20 text-warning',
    }

    const Icon: Record<AlertProps['type'], LucideIcon> = {
        info: Info,
        success: Check,
        error: CircleX,
        warning: TriangleAlert,
    }

    const IconComponent = Icon[type];

    return (
        <div
            role={type === 'error' ? 'alert' : 'status'}
            className={`py-4 rounded-2xl flex flex-col items-center justify-center gap-2 ${styles[type]}`}
        >
            <IconComponent />
            <p className="text-center text-sm px-4">{message}</p>
        </div>
    )
}
