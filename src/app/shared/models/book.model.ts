export interface Book {
  id: string;
  name: string;
  earnings: number;
  description?: string;
}

export type BookRequiredProps = Pick<Book, "name" | "earnings">;
