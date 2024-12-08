import {ChangeEvent, useEffect, useState} from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    FormControl,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchMessages, sendMessage} from "../../store/thunks/messagesThunk.ts";
import Spinner from "../Spinner/Spinner.tsx";
import {MessageMutation} from "../../types.ts";
import * as React from "react";

interface Props {
    existingMessage?: MessageMutation
}

const initialState = {
    author: '',
    message: '',
    datetime: ''
}

const Chat: React.FC<Props> = ({existingMessage = initialState}) => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.messages.messages);
    const loading = useAppSelector((state) => state.messages.isLoading);
    const [messageInfo, setMessageInfo] = useState<MessageMutation>(existingMessage);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setMessageInfo((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSendMessage = () => {
        if (messageInfo.author.trim() && messageInfo.message.trim()) {
            dispatch(sendMessage(messageInfo));
            setMessageInfo(messageInfo);
            dispatch(fetchMessages())
        }
    };

    return (
        <Box>
            <Typography textAlign="center">
                Chat
            </Typography>

            <TextField
                label="Author"
                name='author'
                value={messageInfo.author}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Message"
                name='message'
                value={messageInfo.message}
                onChange={handleChange}
                fullWidth
                sx={{
                    marginTop: 5,
                }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                disabled={!messageInfo.author.trim() || !messageInfo.message.trim()}
            >
                Send
            </Button>

            <FormControl
                sx={{
                    padding: 2,
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>

                {loading ? <Spinner/> :
                    messages.map((message) => (
                        <Paper key={message.id}>
                            <Typography variant="subtitle2" color="textSecondary">
                                {message.author} - {message.datetime}
                            </Typography>
                            <Typography variant="body1">{message.message}</Typography>
                        </Paper>
                    ))}
            </FormControl>
        </Box>
    );
};

export default Chat;
