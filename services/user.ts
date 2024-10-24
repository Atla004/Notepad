import { logout } from "./auth";
import { authorizedWrappedFetch, wrappedFetch } from "./fetch";
import { FetchError } from "./utils";

export const changeUserEmail = async (userData: {
  username: string;
  newEmail: string;
}) => {
  try {
    const response = await wrappedFetch({
      route: `/user/${userData.username}/change-email`,
      method: "PUT",
      body: userData,
    });
    if (response.status !== 200) {
      const errors = await response.json();
      throw new FetchError(errors.error);
    }

    return;
  } catch (error) {
    throw new Error(`Failed to change email`);
  }
};

export const deleteUser = async (userData: { username: string }) => {
  try {
    const response = await authorizedWrappedFetch({
      route: `/user/${userData.username}`,
      method: "DELETE",
      body: userData,
    });
    if (response.status !== 200) {
      const errors = await response.json();
      throw new FetchError(errors.error);
    }
    await logout();
    return;
  } catch (error) {
    throw new Error(`Failed to delete user`);
  }
};

export const getUserEmail = async (userData: {username: string}) => {
    try {
        const response = await authorizedWrappedFetch({
            route: `/user/${userData.username}`,
            method: "GET",
        });
        if (response.status !== 200) {
            const errors = await response.json();
            throw new FetchError(errors.error);
        }
        const json = await response.json();
        return json.data.email;
    } 
    catch (error) {
        throw new Error(`Failed to get user email`);
    } 
};