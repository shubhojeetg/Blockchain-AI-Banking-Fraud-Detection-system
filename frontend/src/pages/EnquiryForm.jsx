import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function EnquiryForm() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    full_name: "",
    age: "",

    pan_number: "",
    phone_number: "",
    email: "",

    annual_income: "",
    existing_loans: "",

    owns_house: false,
    owns_car: false,

    loan_type: "",
    requested_amount: ""
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await API.post(
        "/loan-enquiry",
        {
          ...formData,
          age: Number(formData.age),
          annual_income: Number(formData.annual_income),
          existing_loans: Number(formData.existing_loans),
          requested_amount: Number(formData.requested_amount)
        }
      )

      setResult(response.data)

    } catch (error) {

      console.log(error)

      alert("Error processing enquiry")
    }
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
      <div className="flex-1 p-10">

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

          <h1 className="text-3xl font-bold mb-8">
            Loan Enquiry Form
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="text"
              name="pan_number"
              placeholder="PAN Number"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              name="annual_income"
              placeholder="Annual Income"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              name="existing_loans"
              placeholder="Existing Loans"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <select
              name="loan_type"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >

              <option value="">
                Select Loan Type
              </option>

              <option value="Home Loan">
                Home Loan
              </option>

              <option value="Car Loan">
                Car Loan
              </option>

              <option value="Personal Loan">
                Personal Loan
              </option>

            </select>

            <input
              type="number"
              name="requested_amount"
              placeholder="Requested Loan Amount"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <div className="flex items-center gap-4">

              <label>
                <input
                  type="checkbox"
                  name="owns_house"
                  onChange={handleChange}
                />

                <span className="ml-2">
                  Owns House
                </span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="owns_car"
                  onChange={handleChange}
                />

                <span className="ml-2">
                  Owns Car
                </span>
              </label>

            </div>

            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700"
            >
              Process Loan Enquiry
            </button>

          </form>

          {/* RESULT */}
          {result && (

            <div className="mt-10 p-6 border rounded-xl bg-gray-50">

              <h2 className="text-2xl font-bold mb-4">
                Fraud Analysis Result
              </h2>

              <p>
                <strong>Status:</strong>
                {" "}
                {result.fraud_analysis.status}
              </p>

              <p>
                <strong>Risk Score:</strong>
                {" "}
                {result.fraud_analysis.risk_score}
              </p>

              <div className="mt-4">

                <strong>Reasons:</strong>

                <ul className="list-disc ml-6 mt-2">

                  {result.fraud_analysis.reasons.map(
                    (reason, index) => (
                      <li key={index}>
                        {reason}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="mt-6">

                <h3 className="text-xl font-bold mb-2">
                  Blockchain Record
                </h3>

                <p>
                  <strong>Block Index:</strong>
                  {" "}
                  {result.blockchain_record.block_index}
                </p>

                <p className="break-all">
                  <strong>Hash:</strong>
                  {" "}
                  {result.blockchain_record.hash}
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}