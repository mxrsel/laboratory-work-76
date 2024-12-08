import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../../types.ts";
import {fetchMessages} from "../thunks/messagesThunk.ts";

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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchMessages.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                fetchMessages.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
                    state.isLoading = false;
                    state.messages = action.payload
                }
            )
            .addCase(
                fetchMessages.rejected, (state) => {
                    state.isLoading = false
                    state.isError = true
                }
            )
    }
})

export const messagesReducer = messagesSlice.reducer;