import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function BlockchainViewer() {

  const navigate = useNavigate()

  const [blocks, setBlocks] = useState([])

  const [validation, setValidation] = useState({
    valid: false,
    message: ""
  })

  useEffect(() => {

    fetchBlockchain()
    validateBlockchain()

  }, [])

  // FETCH BLOCKCHAIN DATA
  const fetchBlockchain = async () => {

    try {

      const response = await API.get("/blockchain")

      setBlocks(response.data.blocks)

    } catch (error) {

      console.log(error)
    }
  }

  // VALIDATE BLOCKCHAIN
  const validateBlockchain = async () => {

    try {

      const response = await API.get(
        "/validate-blockchain"
      )

      setValidation(response.data)

    } catch (error) {

      console.log(error)
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
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Blockchain Records
        </h1>

        {/* VALIDATION STATUS */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <h2 className="text-2xl font-bold mb-2">
            Blockchain Validation
          </h2>

          <p
            className={`font-bold ${
              validation.valid
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {validation.message}
          </p>

        </div>

        {/* BLOCKS */}
        <div className="space-y-6">

          {blocks.map((block, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <h2 className="text-2xl font-bold mb-4">

                Block #{block.index}

              </h2>

              <p className="mb-2">

                <strong>Timestamp:</strong>
                {" "}
                {block.timestamp}

              </p>

              <p className="mb-2 break-all">

                <strong>Hash:</strong>
                {" "}
                {block.hash}

              </p>

              <p className="mb-2 break-all">

                <strong>Previous Hash:</strong>
                {" "}
                {block.previous_hash}

              </p>

              <div className="mt-4 bg-gray-100 p-4 rounded-lg">

                <h3 className="font-bold mb-2">
                  Block Data
                </h3>

                <pre className="text-sm overflow-auto">

                  {JSON.stringify(
                    block.data,
                    null,
                    2
                  )}

                </pre>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}