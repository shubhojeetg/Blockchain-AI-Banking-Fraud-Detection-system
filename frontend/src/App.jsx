import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import EnquiryForm from "./pages/EnquiryForm"
import Dashboard from "./pages/Dashboard"
import BlockchainViewer from "./pages/BlockchainViewer"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/enquiry" element={<EnquiryForm />} />

        <Route path="/blockchain" element={<BlockchainViewer />}/>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App