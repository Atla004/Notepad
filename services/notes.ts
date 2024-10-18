import { Note } from "@/types/apiResponses"
import { authorizedWrappedFetch } from "./fetch"
import { FetchError } from "./utils"

export const createNote = async (username: string, note: Note) => {
    try {
        const response = await authorizedWrappedFetch({
          route: `/${username}/note`,
          method: "POST",
          body: {
            ...note 
          }     
        });
        if (response.status !== 200) {
          const errors = await response.json();
          console.error(errors.error);
          throw new FetchError(errors.error);
        }
    
        const json = await response.json();
        return json.success;
        
    } catch (error) {
        throw new Error(`Error deleting note: ${(error as Error).message}`);
    }
}

export const editNote = async (username: string, note: Note) => {
    try {
        const response = await authorizedWrappedFetch({
          route: `/${username}/note`,
          method: "PUT",
          body: {
            ...note 
          }
        });
        if (response.status !== 200) {
          const errors = await response.json();
          console.error(errors.error);
          throw new FetchError(errors.error);
        }
    
        const json = await response.json();
        return json.success;
        
    } catch (error) {
        throw new Error(`Error deleting note: ${(error as Error).message}`);
    }
}

export const deleteNote = async (username: string, title: string) => {
    try {
        const response = await authorizedWrappedFetch({
          route: `/${username}/note/${title}`,
          method: "DELETE",
        });
        if (response.status !== 200) {
          const errors = await response.json();
          console.error(errors.error);
          throw new FetchError(errors.error);
        }
    
        const json = await response.json();
        return json.success;
        
    } catch (error) {
        throw new Error(`Error deleting note: ${(error as Error).message}`);
    }
}

export const getAllNotes = async (username: string) => {
    try {
        const response = await authorizedWrappedFetch({
          route: `/${username}/notes`,
          method: "GET",
        });
        if (response.status !== 200) {
          const errors = await response.json();
          console.error(errors.error);
          throw new FetchError(errors.error);
        }
    
        const json = await response.json();
        return json.data;
        
    } catch (error) {
        throw new Error(`Error getting notes: ${(error as Error).message}`);
    }
} 