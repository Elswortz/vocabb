import { Language } from "./language.types.js";

export interface Translation {
  id: number;
  translation: string;
  languages: Language[] | null;
}
