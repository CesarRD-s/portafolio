export interface PortfolioContact {
    id: number
    userId: number
    title: string
    type: string
    category: string
    value: string
    linkUrl?: string
    isPrimary: boolean
}

export interface PortfolioProject {
    id: number
    userId: number
    title: string
    description: string
    imgUrl: string
    stack: string[]
    role: string
    repo?: string
    demo?: string
}

export interface PortfolioSkill {
    id: number
    userId: number
    title: string
    logoUrl: string
    category: string
    isPrimary: boolean
}

export interface PortfolioContent {
    author: string
    tagLine: string
    profession: string
    shortBio: string
    year: number
    contacts: PortfolioContact[]
    projects: PortfolioProject[]
    skills: PortfolioSkill[]
}
