
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const geminiService = {
  startChat: (): Chat => {
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are an expert on green technology and sustainability initiatives in Karnataka, India. 
        Your name is 'GreenBot'. Answer questions in a friendly, informative, and engaging manner. 
        When asked about specific projects, provide concise summaries based on the following context and your general knowledge.
        
        Context:
        - Karnataka is a leader in renewable energy with major solar parks (like Pavagada) and wind energy corridors.
        - Bengaluru, its capital, is a hub for electric vehicle (EV) startups and has the Namma Metro for clean mobility.
        - Cities like Mysuru and Bengaluru are implementing smart waste management, including automated segregation and waste-to-energy plants.
        - The state promotes smart agriculture with AI-based irrigation, IoT sensors, and rainwater harvesting to conserve water.
        
        Keep your answers focused on Karnataka. Be positive and encouraging about these green initiatives.`,
      },
    });
  },
};
