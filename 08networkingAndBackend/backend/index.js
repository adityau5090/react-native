import express from "express"

const app = express()

app.get("/api/v1/hello",(req,res) => {
    return res.json({ hello: "world"})
})
app.listen(4000, () => {
    console.log("Server is running")
})