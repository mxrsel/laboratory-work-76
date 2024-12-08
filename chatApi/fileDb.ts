import {IMessage, MessageApi} from "./types";
import {promises as fs} from "node:fs";

const file = './messages.json';
let chatData: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            const fileData = await fs.readFile(file);
            chatData = JSON.parse(fileData.toString()) as IMessage[];
        } catch (e) {
            console.log(e)
        }
    },
    async getMessages () {
        return chatData;
    },
    async sendMessage (information: MessageApi) {
        const id = crypto.randomUUID();
        const message = {id, ...information}
        chatData.push(message);
        await this.save()
        return message;
    },
    async save() {
        return fs.writeFile(file, JSON.stringify(chatData));
    }
}

export default fileDb;