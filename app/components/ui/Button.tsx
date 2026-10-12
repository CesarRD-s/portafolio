import { ButtonHTMLAttributes, ReactNode } from "react";

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    action?: ReactNode
}

export function Button({ action, className = '', ...props }: buttonProps) {
    return (
        <button
            className={`flex items-center justify-center rounded-full border border-border
                        bg-surface px-5 py-2 text-sm font-medium text-foreground transition
                        hover:border-brand/40 hover:bg-brand/10 hover:text-brand
                        focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-brand cursor-pointer ${className}`}
            {...props}
        >
            {action && action}
        </button>
    );
}
