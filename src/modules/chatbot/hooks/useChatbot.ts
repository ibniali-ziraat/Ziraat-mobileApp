import { useState } from "react";
import {
    getBotSession,
    sendBotMessage,
    startBotSession,
    getBotKnowledge,
    addBotKnowledge,
} from "../services/chatbot.service";

type MessageType = {
    id: string;
    text: string;
    sender: "user" | "bot";
    time: string;
    quickReplies?: any[];
};

export const useChatbot = () => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [knowledge, setKnowledge] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getTime = () =>
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    const createSession = async (userName: string, userEmail: string) => {
        try {
            setLoading(true);
            const data = await startBotSession({ userName, userEmail });

            const sessionId = data.sessionId || data.id;
            setSession({ id: sessionId });

            return data;
        } catch (err: any) {
            setError(err?.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // FETCH SESSION
    const fetchSession = async (sessionId: string) => {
        try {
            setLoading(true);
            const data = await getBotSession(sessionId);

            const formatted =
                data?.messages?.map((msg: any) => ({
                    id: msg.id?.toString() || Date.now().toString(),
                    text: msg.text,
                    sender: msg.sender === "user" ? "user" : "bot",
                    time: new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    quickReplies: msg.quickReplies || [],
                })) || [];

            setMessages(formatted);
        } catch (err: any) {
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    };

    // FETCH KNOWLEDGE
    const fetchKnowledge = async () => {
        try {
            const data = await getBotKnowledge();
            setKnowledge(data.slice(0, 6));
        } catch (err) {
            console.log("KB ERROR 👉", err);
        }
    };

    // ADD KNOWLEDGE
    const addKnowledge = async (data: {
        category: string;
        question: string;
        answer: string;
        keywords: string[];
        followUpReplies: { label: string; payload: string }[];
    }) => {
        try {
            setLoading(true);

            const res = await addBotKnowledge({
                id: Date.now().toString(),
                ...data,
            });

            setKnowledge((prev) => [res, ...prev]);

            return res;
        } catch (err: any) {
            console.log("ADD KB ERROR 👉", err);
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    };

    // SEND MESSAGE
    const sendMessage = async (text: string) => {
        if (!session?.id) return;

        const userMsg = {
            id: Date.now().toString(),
            text,
            sender: "user" as const,
            time: getTime(),
        };

        setMessages((prev) => [...prev, userMsg]);

        try {
            setLoading(true);

            const res = await sendBotMessage({
                sessionId: session.id,
                message: text,
                mode: 0,
            });

            const botMsg = {
                id: res.messageId || Date.now().toString(),
                text: res.reply,
                sender: "bot" as const,
                time: new Date(res.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                quickReplies: res.quickReplies || [],
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: "Something went wrong. Please try again.",
                    sender: "bot",
                    time: getTime(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        messages,
        knowledge,
        session,
        error,
        createSession,
        fetchSession,
        fetchKnowledge,
        sendMessage,
        addKnowledge,
    };
};