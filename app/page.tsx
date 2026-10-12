import { Header } from './components/layout/Header'
import { PortfolioContent } from './components/portfolio/PortfolioContent'
import { getPublicPortfolio } from './lib/portfolio/data'

export const dynamic = 'force-dynamic'

export default function Page() {
    const portfolio = getPublicPortfolio()

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <PortfolioContent portfolio={portfolio} />
        </main>
    )
}
