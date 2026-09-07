const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

interface FavoritesResponse {
  favorites: number[];
}

export async function fetchFavorites(): Promise<number[]> {
  const response = await fetch(`${API_BASE_URL}/favorites/`);

  if (!response.ok) {
    throw new Error('Failed to load favorites');
  }

  const data = (await response.json()) as FavoritesResponse;
  return data.favorites;
}

export async function toggleFavorite(surahId: number): Promise<number[]> {
  const response = await fetch(`${API_BASE_URL}/favorites/toggle/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ surahId }),
  });

  if (!response.ok) {
    throw new Error('Failed to update favorite');
  }

  const data = (await response.json()) as FavoritesResponse;
  return data.favorites;
}
