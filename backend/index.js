const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors(
  {
    origin: ["https://food-express-delivery-api.vercel.app"],
    method: ["POST", "GET"],
    credentials: true
  }
));

const mongodb = require("./db")
mongodb()


app.use(express.json())
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello!')
})
