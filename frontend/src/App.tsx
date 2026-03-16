import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Search,
  MoreVertical,
  Trash2,
  Paperclip,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { verifyHealthStatus } from "./services/verifyHealthStatus";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      const status = await verifyHealthStatus();
      setBackendHealthy(status);
    };

    checkHealth();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate backend response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text:
          "This is a simulated response from your back-end. I received: " +
          userMessage.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Assistant
                </CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 relative">
          <ScrollArea className="h-full w-full p-4" ref={scrollRef}>
            <div className="flex flex-col gap-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-max max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-2 text-sm shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2",
                    message.role === "user"
                      ? "ml-auto bg-blue-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-none",
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "ai" ? (
                      <Sparkles className="w-3 h-3 text-blue-400" />
                    ) : (
                      <User className="w-3 h-3 text-blue-200" />
                    )}
                    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
                      {message.role === "ai" ? "Assistant" : "You"}
                    </span>
                  </div>
                  <p className="leading-relaxed">{message.text}</p>
                  <span className="text-[10px] self-end opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex w-max max-w-[80%] items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 text-sm border border-slate-100 dark:border-slate-700 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-slate-500">AI is thinking...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex w-full items-center gap-2 relative">
            <div className="absolute left-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-blue-500"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Type your message here..."
              className="flex-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500 pl-11 pr-24 h-11 rounded-xl shadow-inner transition-all hover:bg-slate-50 dark:hover:bg-slate-750 placeholder:text-white focus:placeholder:text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <Button
              size="icon"
              className="h-10 w-10 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all rounded-xl"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center animate-bounce">
        <p className="text-slate-400 text-sm flex items-center justify-center gap-2 font-medium">
          Built with <span className="text-red-500">❤</span> using Shadcn &
          Tailwind
        </p>
      </div>
    </div>
  );
}

export default App;
