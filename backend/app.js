const express = require("express")

const mongoose = require("mongoose")

const app = express();
const verification = require("./routes/verification");
const input = require("./routes/create")

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*")
    next();

})

app.use("/vloanapi", verification);
app.use("/vloanapi", input)



app.use((error, req, res, next) => {

    const status = error.statusCode || 500
    const message = error.message;
    console.log(error)
    res.status(status).json({ message: message, })

})


mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@cluster-alpha.7pxq4.mongodb.net/${process.env.mongo_default_db}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then((res) => app.listen(3000))
    .catch((err) => console.log(err))