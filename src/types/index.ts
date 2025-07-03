export interface Surah {
  id: number;
  name: string;
  arabicName: string;
  number: number;
  verses: number;
  duration: string;
  audioUrl: string;
  reciter: string;
  reciterId: number;
}

export interface Reciter {
  id: number;
  name: string;
  arabicName: string;
  image: string;
  followers: string;
  description: string;
  country: string;
}

export interface PlaylistItem {
  id: string;
  surahId: number;
  addedAt: Date;
}

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentSurah: Surah | null;
}