export interface Movie {
  id: string;
  name: string;
  earnings: number;
  description?: string;
}

export type MovieRequiredProps = Pick<Movie, "name" | "earnings">;
