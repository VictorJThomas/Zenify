
export type Message = {
    role: "user" | "assistant";
    content: string | {mood: string; advice: string};
    links?: string[];
};