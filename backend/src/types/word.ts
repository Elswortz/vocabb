export interface Word {
  id: number;
  word: string;
  pronunciation: string | null;
  audio_url: string | null;
  language_id: number;
  created_at: string;
  updated_at: string;
}
