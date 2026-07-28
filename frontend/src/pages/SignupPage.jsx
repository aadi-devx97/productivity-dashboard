import BASE_URL from "../config/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/global.css"
import "../styles/auth.css"

function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data.message)
            return
        }

        alert("Signup successful! Please log in.")
        console.log(data)
    }

    function goToLogin() {
        navigate("/login")
    }

    return (
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                
                <input className="auth-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    Sign Up
                </button>

                <p className="auth-text">
                    Already have an account?
                    <button className="auth-link" type="button" onClick={goToLogin}>
                        Log in
                    </button>
                </p>
            </form>
        </div>
    )
}

export default SignupPage