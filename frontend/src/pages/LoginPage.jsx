import BASE_URL from "../config/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/global.css"
import "../styles/auth.css"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message)
                return
            }

            localStorage.setItem("token", data.token)
            navigate("/")
        } catch (error) {
            console.error("Error during login:", error)
            alert("An error occurred during login. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    function goToSignup() {
        navigate("/signup")
    }

    return (
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Login your Account</h1>
                
                <input className="auth-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="auth-button" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p>
                    Don't have an account?
                    <button className="auth-link" type="button" onClick={goToSignup}>
                        Sign up
                    </button>
                </p>
            </form>
        </div>
    )
}

export default LoginPage