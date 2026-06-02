import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

import { Pie } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export default function Dashboard() {

  const navigate = useNavigate()

  const [stats, setStats] = useState({
    total_enquiries: 0,
    fraud_cases: 0,
    genuine_cases: 0,
    suspicious_cases: 0,
    total_blocks: 0
  })

  const [recentEnquiries, setRecentEnquiries] = useState([])

  useEffect(() => {

    fetchDashboardStats()
    fetchRecentEnquiries()

  }, [])

  // FETCH DASHBOARD STATS
  const fetchDashboardStats = async () => {

    try {

      const response = await API.get(
        "/dashboard-stats"
      )

      setStats(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // FETCH RECENT ENQUIRIES
  const fetchRecentEnquiries = async () => {

    try {

      const response = await API.get(
        "/recent-enquiries"
      )

      setRecentEnquiries(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // PIE CHART DATA
  const chartData = {

    labels: [
      "Fraud",
      "Genuine",
      "Suspicious"
    ],

    datasets: [
      {
        data: [
          stats.fraud_cases,
          stats.genuine_cases,
          stats.suspicious_cases
        ],
        backgroundColor: [
      "#ef4444",
      "#22c55e",
      "#eab308"
    ],

    borderWidth: 1
      }
    ]
  }

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Banking Fraud System
        </h1>

        <ul className="space-y-4">

          <li
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>

          <li
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => navigate("/enquiry")}
          >
            Loan Enquiries
          </li>

          <li
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => navigate("/blockchain")}
          >
            Blockchain Viewer
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Fraud Detection Dashboard
        </h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Total Enquiries
            </h2>

            <p className="text-3xl font-bold mt-2">
              {stats.total_enquiries}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Fraud Cases
            </h2>

            <p className="text-3xl font-bold mt-2 text-red-500">
              {stats.fraud_cases}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Genuine Cases
            </h2>

            <p className="text-3xl font-bold mt-2 text-green-500">
              {stats.genuine_cases}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Blockchain Status
            </h2>

            <p className="text-xl font-bold mt-2 text-blue-600">
              {stats.total_blocks} Blocks
            </p>

          </div>

        </div>

        {/* ANALYTICS CHART */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Fraud Analytics
          </h2>

          <div className="w-96 mx-auto">

            <Pie data={chartData} />

          </div>

        </div>

        {/* RECENT ENQUIRIES */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Recent Loan Enquiries
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  PAN
                </th>

                <th className="text-left p-3">
                  Loan Type
                </th>

                <th className="text-left p-3">
                  Risk Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentEnquiries.map((enquiry, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-3">
                    {enquiry.full_name}
                  </td>

                  <td className="p-3">
                    {enquiry.pan_number}
                  </td>

                  <td className="p-3">
                    {enquiry.loan_type}
                  </td>

                  <td
                    className={`p-3 font-bold ${
                      enquiry.status === "Fraud"
                        ? "text-red-500"
                        : enquiry.status === "Suspicious"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {enquiry.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}