export interface CardNoteProps {
  _id?: string;
  title: string;
  description?: string;
  priority: number;
  favorite: boolean;
  categories?: string[];
}
