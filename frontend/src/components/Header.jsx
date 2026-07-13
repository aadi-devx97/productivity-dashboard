import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <header className="header">
            <h2>📊 Productivity Dashboard</h2>
            <button onClick={handleLogout}>
                Logout
            </button>
        </header>
    )
}

export default Header