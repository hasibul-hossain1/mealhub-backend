import { toNodeHandler } from "better-auth/node";
import express from "express"
import {auth} from '../utils/auth.js'
const app = express()
app.use(express.json())

app.use((req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next()
})

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get('/',(req,res) => {
    res.send("The server is working")
})

export default app