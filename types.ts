
export type Screen = 'introduction' | 'projects';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
