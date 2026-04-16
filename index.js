//|=========== [Radhe Radhe] ============|
//|:::::::: JAY JAGANNATH 0!!0 ::::::::::|
//|======================================|
require("dotenv").config();
const express = require("express");
const connection = require("./db/connection")
const errorMiddleware = require("./middlewares/error.middleware");
const routes = require("./routes/post.route");

const app = express();
const PORT = process.env.PORT;



app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", routes);
app.use(errorMiddleware);




connection().then(con => {
    if (con) {
        app.listen(PORT, () => {
            console.log("[*] Database Run")
            console.log("[*] Server Running on " + PORT);
        })
    } else {
        console.log("[*] Database Connection Failed")
    }
}).catch(err => {
    console.log("[*] Something went wrong: ", err)
})