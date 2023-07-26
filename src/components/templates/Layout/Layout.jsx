import { Outlet } from "react-router-dom"
import Header from "../../molecules/Header/Header"

export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}