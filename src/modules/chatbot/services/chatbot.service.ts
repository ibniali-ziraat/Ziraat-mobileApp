import botInstance from "@/src/api/client/chatbotInstance";

// CREATE SESSION
export const startBotSession = async (payload: {
    userName: string;
    userEmail: string;
}) => {
    const res = await botInstance.post("/api/bot/sessions", payload);
    return res.data;
};

// GET SESSION
export const getBotSession = async (sessionId: string) => {
    const res = await botInstance.get(`/api/bot/sessions/${sessionId}`);
    return res.data;
};

// SEND MESSAGE
export const sendBotMessage = async (payload: {
    sessionId: string;
    message: string;
    mode?: number;
}) => {
    const res = await botInstance.post("/api/bot/chat", {
        sessionId: payload.sessionId,
        message: payload.message,
        mode: payload.mode ?? 0,
    });

    return res.data;
};

// GET KNOWLEDGE
export const getBotKnowledge = async () => {
    const res = await botInstance.get("/api/bot/knowledge");
    return res.data;
};

// ADD / UPDATE KNOWLEDGE
export const addBotKnowledge = async (payload: {
    id?: string;
    category: string;
    question: string;
    answer: string;
    keywords: string[];
    followUpReplies: {
        label: string;
        payload: string;
    }[];
}) => {
    const res = await botInstance.post("/api/bot/knowledge", payload);
    return res.data;
};