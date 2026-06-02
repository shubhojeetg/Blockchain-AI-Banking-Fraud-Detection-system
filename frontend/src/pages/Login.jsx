import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const response = await API.post("/login", {
        employee_id: employeeId,
        password: password
      })

      console.log(response.data)

      setMessage("Login Successful")

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      setMessage("Invalid Credentials")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Bank Login
        </h1>

        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4 text-red-500">
          {message}
        </p>

      </div>

    </div>
  )
}