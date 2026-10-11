import {
    Database,
    Layers,
    Server,
} from "lucide-react"

export const capabilities = [
    {
        id: 1,
        title: "Aplicaciones web",
        description: "Desarrollo y mantenimiento de interfaces, servicios y funcionalidades.",
        icon: Layers
    },
    {
        id: 2,
        title: "APIs y bases de datos",
        description: "Integración de servicios, consultas y procesos de datos.",
        icon: Database
    },
    {
        id: 3,
        title: "Análisis y soporte",
        description: "Diagnóstico de incidencias, refactorización y mejoras de aplicaciones existentes.",
        icon: Server
    }
] as const
