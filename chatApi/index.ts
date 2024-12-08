import express from "express";
import cors from 'cors';
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";

const fs = require("fs");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    if(fs.existsSync("./messages.json")) {
        await fileDb.init();
    } else {
        fs.writeFileSync("./messages.json", JSON.stringify([]));
    }
    app.listen(port, () => {
        console.log(`Listening on port: http://localhost:${port}`);
    })
}

run().catch(err => console.log(err));