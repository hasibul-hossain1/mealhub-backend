import express from "express"

const app = express()
app.use(express.json())


app.get('/',(req,res) => {
    res.send("The server is working")
})

export default app