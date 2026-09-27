import 'server-only'

import { unstable_cache } from 'next/cache'
import { getSupabase } from '@/app/lib/supabase/server'
import type {
    PortfolioContact,
    PortfolioContent,
    PortfolioProject,
    PortfolioSkill,
} from './types'

type ProfileRow = {
    author: string | null
    tag_line: string | null
    profession: string | null
    short_bio: string | null
    year: number | null
}

type ProjectRow = {
    id: number
    user_id: number
    title: string
    description: string
    img_url: string
    stack: string[] | null
    role: string
    repo: string | null
    demo: string | null
}

type SkillRow = {
    id: number
    user_id: number
    title: string
    logo_url: string
    category: string
    is_primary: boolean
}

type ContactRow = {
    id: number
    user_id: number
    title: string
    type: string
    category: string
    value: string
    link_url: string | null
    is_primary: boolean
}

export const getPublicPortfolio = unstable_cache(
    async (): Promise<PortfolioContent | null> => {
        const supabase = getSupabase()

        const [profile, projects, skills, contacts] = await Promise.all([
            supabase
                .from('profiles')
                .select('author, tag_line, profession, short_bio, year')
                .maybeSingle<ProfileRow>(),
            supabase
                .from('projects')
                .select('id, user_id, title, description, img_url, stack, role, repo, demo')
                .order('created_at', { ascending: false })
                .returns<ProjectRow[]>(),
            supabase
                .from('skills')
                .select('id, user_id, title, logo_url, category, is_primary')
                .returns<SkillRow[]>(),
            supabase
                .from('contacts')
                .select('id, user_id, title, type, category, value, link_url, is_primary')
                .returns<ContactRow[]>(),
        ])

        if (profile.error) {
            throw new Error(profile.error.message)
        }

        if (!profile.data) return null

        if (projects.error) {
            console.error('Error al cargar proyectos:', projects.error.message)
        }

        if (skills.error) {
            console.error('Error al cargar habilidades:', skills.error.message)
        }

        if (contacts.error) {
            console.error('Error al cargar contactos:', contacts.error.message)
        }

        return {
            author: profile.data.author ?? 'César Reyes',
            tagLine: profile.data.tag_line ?? '',
            profession: profile.data.profession ?? 'Desarrollador Fullstack',
            shortBio: profile.data.short_bio ?? '',
            year: profile.data.year ?? new Date().getFullYear(),
            projects: projects.error ? [] : (projects.data ?? []).map(mapProject),
            skills: skills.error ? [] : (skills.data ?? []).map(mapSkill),
            contacts: contacts.error ? [] : (contacts.data ?? []).map(mapContact),
        }
    },
    ['portfolio-public'],
    {
        revalidate: 300,
        tags: ['portfolio'],
    },
)

function mapProject(row: ProjectRow): PortfolioProject {
    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        description: row.description,
        imgUrl: row.img_url,
        stack: row.stack ?? [],
        role: row.role,
        repo: row.repo ?? undefined,
        demo: row.demo ?? undefined,
    }
}

function mapSkill(row: SkillRow): PortfolioSkill {
    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        logoUrl: row.logo_url,
        category: row.category,
        isPrimary: row.is_primary,
    }
}

function mapContact(row: ContactRow): PortfolioContact {
    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        type: row.type,
        category: row.category,
        value: row.value,
        linkUrl: row.link_url ?? undefined,
        isPrimary: row.is_primary,
    }
}

