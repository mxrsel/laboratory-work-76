export interface IMessage {
    id: string
    author: string
    message: string
    datetime: string
}

export type MessageApi = Omit<IMessage, 'id'>;