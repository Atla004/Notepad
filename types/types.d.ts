export interface CardNoteProps {
  _id: string;
  title: string;
  content: string;
  priority: number;
  favorite: boolean;
  categories: string[];
}
