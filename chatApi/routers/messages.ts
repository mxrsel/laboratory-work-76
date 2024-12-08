import express from "express";
import {MessageApi} from "../types";
import fileDb from "../fileDb";
import dayjs from "dayjs";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
const messages = await fileDb.getMessages();
res.send(messages);
});

messagesRouter.get('/:id', async (req, res) => {
const messages = await fileDb.getMessages();
const getMessageByIf = messages.find((message) => message.id === req.params.id);
res.send(getMessageByIf);
})

messagesRouter.post('/', async (req, res) => {
    const message: MessageApi = {
        author: req.body.author,
        message: req.body.message,
        datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    const sentMessage = await fileDb.sendMessage(message);
    res.send(sentMessage);
})

export default messagesRouter;