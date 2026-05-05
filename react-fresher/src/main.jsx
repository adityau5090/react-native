import {createRoot} from "react-dom/client"
import App from "./App"
import H1 from "./H1"
import Form from "./Form"
// import React from "react"

// const h1 = React.createElement("h1", null, "Welcome to mobile dev")


createRoot(document.getElementById("root")).render(
  <div>
    <h1>Hello World!</h1> 
    <App />
    <H1 title="Heading-1" desc="Hed-1"/>
    <H1 title="Heading-2" desc="Hed-2"/>
    <Form />
  </div>

)