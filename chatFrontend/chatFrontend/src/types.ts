export interface IMessage {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

export interface MessageMutation {
    author: string;
    message: string;
    datetime: string;
}

export type MessageApi = Omit<MessageMutation, 'id'>;

export interface MessageList {
    [id: string]: MessageApi;
}