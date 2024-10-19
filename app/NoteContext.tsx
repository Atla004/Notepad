import React, { createContext, useState, ReactNode } from "react";
import { CardNoteProps } from "@/types/types";

type NoteDataContext = {
  noteData: CardNoteProps;
  setNoteData: (value: CardNoteProps) => void;
};

// Proporcionar un valor inicial para el contexto
const defaultNoteData: CardNoteProps = {
  title: "",
  description: "",
  priority: 0,
  favorite: false,
  _id: "",
  categories: [],
};

export const NoteContext = createContext<NoteDataContext>({
  noteData: defaultNoteData,
  setNoteData: () => {},
});

type NoteProviderProps = {
  children: ReactNode;
};

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [noteData, setNoteData] = useState<CardNoteProps>(defaultNoteData);

  return (
    <NoteContext.Provider value={{ noteData, setNoteData }}>
      {children}
    </NoteContext.Provider>
  );
};
