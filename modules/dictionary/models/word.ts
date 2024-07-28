export interface Meaning {
  meaning: string;
  explainations: string;
  example: string;
}

export interface Word {
  meaning: Meaning[];
  id: string;
  lexeme: string;
  hiragana: string;
  hanviet: string;
  approved?: boolean;
  approved_at?: string;
  createdAt: string;
  updatedAt: string;
}
