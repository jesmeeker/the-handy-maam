import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { HandyMaam } from "./components/HandyMaam"
import { Footer } from "./components/nav/Footer"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <HandyMaam />

    </BrowserRouter>
)

