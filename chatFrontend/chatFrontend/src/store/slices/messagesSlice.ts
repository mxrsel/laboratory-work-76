import {createSlice} from "@reduxjs/toolkit";
import {IMessage} from "../../types.ts";

interface MessagesState {
    messages: IMessage[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: MessagesState = {
    messages: [],
    isLoading: false,
    isError: false,
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {}
})

export const messagesReducer = messagesSlice.reducer;