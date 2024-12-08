import {createAsyncThunk} from "@reduxjs/toolkit";
import {IMessage, MessageList} from "../../types.ts";
import axiosApi from "../../../axiosApi.ts";

export const fetchMessages = createAsyncThunk<IMessage[], void>(
    'messages/fetchMessages',
    async() => {
        const res: {data: MessageList | null} = await axiosApi('/messages.json');
        const messageList = res.data;

        if (messageList === null) return [];

        const messages: MessageList = messageList;

        const newMessage = Object.keys(messageList).map((message) => {
            return {
                ...messages[message],
                id: message
            };
        });
        return newMessage;
    });