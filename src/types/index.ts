export type Message = {
    role: "user" | "assistant";
    content: string | {mood: string; advice: string};
    links?: string[];
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