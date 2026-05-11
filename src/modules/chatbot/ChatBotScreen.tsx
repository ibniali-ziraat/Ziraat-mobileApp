
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useChatbot } from "./hooks/useChatbot";

export default function ChatbotScreen() {
  const {
    createSession,
    fetchSession,
    fetchKnowledge,
    sendMessage,
    addKnowledge,
    messages,
    knowledge,
    loading,
  } = useChatbot();

  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const init = async () => {
      const res = await createSession("Sehr User", "user@email.com");

      const sessionId = res?.sessionId || res?.id;

      if (sessionId) {
        await fetchSession(sessionId);
      }

      await fetchKnowledge();
    };

    init();
  }, []);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput("");
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.sender === "user";

    return (
      <View className={`px-3 mb-3 ${isUser ? "items-end" : "items-start"}`}>
        <View className="flex-row items-end">
          {!isUser && <Text className="mr-2 text-lg">🤖</Text>}

          <View
            className={`px-4 py-3 rounded-2xl max-w-[80%] ${
              isUser
                ? "bg-purple-600 rounded-br-none"
                : "bg-gray-200 rounded-bl-none"
            }`}
          >
            <Text className={isUser ? "text-white" : "text-black"}>
              {item.text}
            </Text>
          </View>

          {isUser && <Text className="ml-2 text-lg">👤</Text>}
        </View>

        <Text className="text-[10px] text-gray-400 mt-1">{item.time}</Text>

        {!isUser && item.quickReplies?.length > 0 && (
          <View className="flex-row flex-wrap mt-2">
            {item.quickReplies.map((qr: any) => (
              <TouchableOpacity
                key={qr.payload}
                onPress={() => sendMessage(qr.payload)}
                className="border border-purple-500 px-3 py-1 rounded-full mr-2 mb-2"
              >
                <Text className="text-purple-600 text-xs">{qr.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#f6f7fb]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#6d28d9", "#4c1d95"]}
        className="px-5 pt-14 pb-5 rounded-b-3xl"
      >
        <Text className="text-white text-lg font-semibold">
          Ziraat AI Assistant
        </Text>
        <Text className="text-purple-200 text-xs mt-1">
          Smart AI • Knowledge Powered
        </Text>

        <TouchableOpacity
          onPress={() => setShowForm(!showForm)}
          className="mt-3 bg-white/20 px-3 py-1.5 rounded-full self-start"
        >
          <Text className="text-white text-xs">
            {showForm ? "Close" : "+ Add Knowledge"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* KB FORM */}
      {showForm && (
        <View className="mx-4 mt-3 bg-white p-4 rounded-2xl shadow">
          <TextInput
            placeholder="Enter Question"
            value={question}
            onChangeText={setQuestion}
            className="bg-gray-100 p-3 rounded-xl mb-2"
          />

          <TextInput
            placeholder="Enter Answer"
            value={answer}
            onChangeText={setAnswer}
            className="bg-gray-100 p-3 rounded-xl mb-3"
          />

          <TouchableOpacity
            onPress={async () => {
              await addKnowledge({
                category: "General",
                question,
                answer,
                keywords: question.split(" "),
                followUpReplies: [],
              });

              setShowForm(false);
              setQuestion("");
              setAnswer("");
            }}
            className="bg-purple-600 p-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CHAT + SUGGESTIONS */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ListEmptyComponent={() => (
          <View>
            <Text className="text-gray-400 text-xs mb-2">Try asking</Text>

            <View className="flex-row flex-wrap">
              {knowledge.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => sendMessage(item.question)}
                  className="bg-white border border-gray-200 px-3 py-2 rounded-xl mr-2 mb-2"
                >
                  <Text className="text-gray-700 text-xs">{item.question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        renderItem={({ item }) => {
          const isUser = item.sender === "user";

          return (
            <View className={`mb-4 ${isUser ? "items-end" : "items-start"}`}>
              {/* MESSAGE */}
              <View
                className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-sm ${
                  isUser
                    ? "bg-purple-600 rounded-br-sm"
                    : "bg-white border border-gray-200 rounded-bl-sm"
                }`}
              >
                <Text
                  className={`text-[14px] ${
                    isUser ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.text}
                </Text>
              </View>

              {/* TIME */}
              <Text className="text-[10px] text-gray-400 mt-1 px-1">
                {item.time}
              </Text>

              {/* QUICK REPLIES */}
              {!isUser && item.quickReplies?.length > 0 && (
                <View className="mt-2">
                  <Text className="text-[10px] text-gray-400 mb-1">
                    Suggestions
                  </Text>

                  <View className="flex-row flex-wrap">
                    {item.quickReplies.map((qr: any) => (
                      <TouchableOpacity
                        key={qr.payload}
                        onPress={() => sendMessage(qr.payload)}
                        className="bg-purple-600 px-3 py-1.5 rounded-full mr-2 mb-2"
                      >
                        <Text className="text-white text-xs">{qr.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* INPUT */}
      <View className="px-3 py-3 border-t border-gray-200 bg-white flex-row items-center">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask AI anything..."
          placeholderTextColor="#999"
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm"
        />

        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 bg-purple-600 p-3 rounded-full"
        >
          <Ionicons name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
