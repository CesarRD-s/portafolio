import {
    CheckCircle2,
    Database,
    FileText,
    GitBranch,
    Layers,
    Search,
    Server,
    type LucideIcon,
} from "lucide-react"

export interface HighlightItem {
    id: number
    title: string
    description?: string
    icon: LucideIcon
}

export interface MetaItem {
    id: number
    title: string
    description: string
    icon: LucideIcon
}

export const principles: HighlightItem[] = [
    {
        id: 1,
        title: 'Solución a problemas',
        description: 'Encuentro soluciones prácticas y eficientes para los desafíos que enfrento',
        icon: Layers
    },
    {
        id: 2,
        title: 'Trabajo en equipo',
        description: 'Colaboro eficazmente con otros, compartiendo conocimientos y aprendiendo de los demás',
        icon: GitBranch
    },
    {
        id: 3,
        title: 'Aprendizaje continuo',
        description: 'Me mantengo actualizado con las últimas tecnologías y mejores prácticas en desarrollo',
        icon: Search
    },
    {
        id: 4,
        title: 'Orientado a resultados',
        description: 'Me enfoco en entregar soluciones que cumplan con los objetivos del proyecto',
        icon: CheckCircle2
    }
]

export const capabilities = [
    {
        id: 1,
        title: "Desarrollo backend",
        description: "Diseño y construcción de APIs RESTful con Node.js y .NET Core",
        icon: Server
    },
    {
        id: 2,
        title: "Bases de datos",
        description: "Diseño y optimización de esquemas, consultas y rendimiento en SQL",
        icon: Database
    },
    {
        id: 3,
        title: "Integración de sistemas",
        description: "Integración de sistemas y servicios utilizando APIs, mensajería y microservicios",
        icon: FileText
    }
] as const
