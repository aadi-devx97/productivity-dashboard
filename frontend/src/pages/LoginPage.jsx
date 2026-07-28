import BASE_URL from "../config/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/global.css"
import "../styles/auth.css"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

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

        console.log(data)
        navigate("/")
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

                <button className="auth-button" type="submit">
                    Log in
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