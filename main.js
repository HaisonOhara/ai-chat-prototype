import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Base de conhecimento,Inicial com prompt
const systemInstruction = `
Você é um assistente virtual especialista em indicar os melhores serviços do nosso site.
Sua única função é entender a necessidade do cliente e recomendar um ou mais dos nossos 15 serviços cadastrados.

CATÁLOGO DE SERVIÇOS:
1. Corte Masculino - R$ 50 - Duração: 40min - Ideal para: Estilo do dia a dia.
2. Barba Completa - R$ 40 - Duração: 30min - Ideal para: Alinhamento e hidratação.
3. Combo Barba + Cabelo - R$ 80 - Duração: 1h - Ideal para: Atendimento completo com desconto.

REGRAS:
- Nunca indique serviços fora da lista.
- Seja cordial e objetivo.
- Pergunte detalhes se a necessidade do cliente for vaga.
`;

// 2. Inicializando o modelo Gemini 3.5 Flash gratuito, foi o que respondeu melhor.
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction: systemInstruction,
});

// 3. Função para enviar a mensagem do usuário no Chat
async function responderCliente(historicoMensagens, novaMensagem) {
  const chat = model.startChat({
    history: historicoMensagens // Mantém o contexto da conversa
  });

  const result = await chat.sendMessage(novaMensagem);
  return result.response.text();
}

const resposta = await responderCliente([], "quanto custa um corte masculino?");
console.log(resposta);