import { Navbar } from "./navbar/Navbar";

export function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <Navbar />
        </header>
    )
}
