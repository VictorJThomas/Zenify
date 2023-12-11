export type Message = {
    role: "user" | "assistant";
    content: string | {mood: string, advice: string} ;
};

export type FormattedPost = {
    id: string;
    createAt: string;
    updateAt: string;
    title: string;
    category: string;
    content: string;
    author: string;
    image: string;
    snippet: string;
};

export type Professinals = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    role: string;
}