import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAIResponse } from "@/lib/openai";

export default function QASPlatform() {
  const [section, setSection] = useState("home");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá, sou a sua formadora virtual. Em que posso ajudar?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Contextualizar pelo módulo
    const contextIntro = section === "qualidade"
      ? "Você é uma formadora especialista em gestão da qualidade ISO 9001."
      : section === "ambiente"
      ? "Você é uma formadora especialista em gestão ambiental ISO 14001."
      : section === "seguranca"
      ? "Você é uma formadora especialista em Segurança e Saúde no Trabalho (SST)."
      : "Você é uma formadora pedagógica.";

    const updatedMessages = [
      { role: "system", content: contextIntro },
      ...messages,
      userMessage
    ];

    const aiReply = await getAIResponse(updatedMessages);
    setMessages([...updatedMessages, { role: "assistant", content: aiReply }]);
  };

  const renderContent = () => {
    switch (section) {
      case "qualidade":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Qualidade</h2>
              <p>Gestão da qualidade baseada na ISO 9001.</p>
              <ul className="list-disc ml-5 mt-2">
                <li>Foco no cliente</li>
                <li>Melhoria contínua</li>
                <li>Gestão por processos</li>
              </ul>
            </CardContent>
          </Card>
        );
      case "ambiente":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Ambiente</h2>
              <p>Gestão ambiental baseada na ISO 14001.</p>
              <ul className="list-disc ml-5 mt-2">
                <li>Identificação de impactos</li>
                <li>Conformidade legal</li>
                <li>Sustentabilidade</li>
              </ul>
            </CardContent>
          </Card>
        );
      case "seguranca":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Segurança</h2>
              <p>Gestão de segurança e saúde no trabalho.</p>
              <ul className="list-disc ml-5 mt-2">
                <li>Identificação de riscos</li>
                <li>Prevenção de acidentes</li>
                <li>Formação e cultura de segurança</li>
              </ul>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Plataforma QAS</h2>
              <p>Escolha um módulo ou utilize o chatbot para aprender.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Menu de módulos */}
      <div className="flex gap-2 mb-4">
        {["home", "qualidade", "ambiente", "seguranca"].map(mod => (
          <Button
            key={mod}
            onClick={() => setSection(mod)}
            variant={section === mod ? "default" : "outline"}
          >
            {mod.charAt(0).toUpperCase() + mod.slice(1)}
          </Button>
        ))}
      </div>

      {/* Conteúdo do módulo */}
      <div className="mb-6">{renderContent()}</div>

      {/* Chatbot */}
      <Card className="p-4">
        <CardContent>
          <h2 className="text-lg font-bold mb-2">Chat Formadora Virtual</h2>
          <div className="h-64 overflow-y-auto border p-2 mb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded ${
                  msg.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreve aqui a tua pergunta..."
            />
            <Button onClick={handleSend}>Enviar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
