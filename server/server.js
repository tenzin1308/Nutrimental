import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// MongoDB Connection


// API 
app.get('/', (req, res) => {
    res.send('Server is ready');
});


// Connection

const port = 8000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})