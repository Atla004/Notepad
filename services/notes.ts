import { NoteRequest,Note } from "@/types/apiResponses";
import { authorizedWrappedFetch } from "./fetch";
import { FetchError } from "./utils";


export const createNote = async (username: string, note: Note) => {
  try {
    const response = await authorizedWrappedFetch({
      route: `/user/${username}/note`,
      method: "POST",
      body: {
        ...note,
      },
    });

    if (response?.status !== 200) {
      const errors = await response?.json();
      console.error(errors.error);
      throw new FetchError(errors.error);
    }

    const json = await response?.json();
    console.log("JSON:", json);
    return json.success;
  } catch (error) {
    console.error("(createNote)error creating the note", error);
    throw new Error(`Error creating note: ${(error as Error).message}`);
  }
};

export const editNote = async (username: string, note: NoteRequest) => {
  try {
    note.categories = note.categories ? note.categories : [];
    const response = await authorizedWrappedFetch({
      route: `/user/${username}/note/${note._id}`,
      method: "PUT",
      body: {
        ...note,
      },
    });
    const message = await response.json();
    if (response.status !== 200) {
      console.error(message.error);
      throw new FetchError(message.error);
    }

    return message.success;
  } catch (error) {
    console.error("(editNote)error editing the note", error);
    throw new Error(`Error deleting note: ${(error as Error).message}`);
  }
};

export const deleteNote = async (username: string, title: NoteRequest) => {
  try {
    const response = await authorizedWrappedFetch({
      route: `/user/${username}/note/${title}`,
      method: "DELETE",
    });
    if (response?.status !== 200) {
      const errors = await response?.json();
      console.error(errors.error);
      throw new FetchError(errors.error);
    }

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error("(deleteNote)error deleting the note", error);
    throw new Error(`Error deleting note: ${(error as Error).message}`);
  }
};

export const getAllNotes = async (username: string):Promise<Note[]> => {
  try {
    const response = await authorizedWrappedFetch({
      route: `/user/${username}/notes`,
      method: "GET",
    });
    if (response?.status !== 200) {
      const errors = await response.json();
      console.error(errors.error);
      throw new FetchError(errors.error);
    }

    const json = await response.json();
    return json.notes;
  } catch (error) {
    console.error("(getAllNotes)error getting the notes", error);
    throw new Error(`Error getting notes: ${(error as Error).message}`);
  }
};

export const getNote = async (username: string, _id: string):Promise<Note> => {
  try {
    const response = await authorizedWrappedFetch({
      route: `/user/${username}/note/${_id}`,
      method: "GET",
    });
    if (response?.status !== 200) {
      const errors = await response.json();
      console.error(errors.error);
      throw new FetchError(errors.error);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("(getNote)error getting the note", error);
    throw new Error(`Error getting note: ${(error as Error).message}`);
  }
}
