import { Category, Note, NoteRequest } from "@/types/apiResponses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeLocalNote = async (value: Note) => {
  try {
    await AsyncStorage.setItem("local-note", JSON.stringify(value));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getLocalNote = async ():Promise<Note> => {
  try {
    const value = await AsyncStorage.getItem("local-note");
    if (!value) throw new Error("local note not found");
    return JSON.parse(value);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

interface NoteMerge {
  title?: string,
  content?: string,
  categories?: Category[],
  priority?: number,
  favorite?: boolean,
}

export const editLocalNote = async ( value: NoteMerge) => {
  try {
    await AsyncStorage.mergeItem("local-note", JSON.stringify(value));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

