import {createAsyncThunk} from "@reduxjs/toolkit";
import {IMessage, MessageApi, MessageList} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchMessages = createAsyncThunk<IMessage[], void>(
    'messages/fetchMessages',
    async() => {
        const res: {data: MessageList | null} = await axiosApi('/messages');
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

export const sendMessage = createAsyncThunk<void, MessageApi>(
    'messages/sendMessage',
    async(message) => {
        await axiosApi.post('/messages', {...message})
    }
);

