export interface Movie {
  id: string;
  name: string;
  rating: number;
}

export type MovieRequiredProps = Pick<Movie, "name" | "rating">;
