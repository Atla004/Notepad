export interface User {
    _id: string,
    username: string;
    email: string;
    password: string;
    deleted: boolean;
}

export interface Note {
    _id: string,
    title: string,
    content: string,
    categories: string[],
    owner?: string,
    priority: number,
    favorite: boolean,
    deleted?: boolean,
}

export interface Category {
    _id?: string,
    title: string,
    owner?: string,
    emoji: string
}
