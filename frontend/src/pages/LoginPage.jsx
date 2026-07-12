import BASE_URL from "../config/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

    return (
        <div>
            <h1>Login your Account</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Log in
                </button>
            </form>
        </div>
    )
}

export default LoginPage