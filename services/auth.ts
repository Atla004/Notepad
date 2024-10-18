import { wrappedFetch } from "@/services/fetch";
import {
  fetchData,
  removeData,
  setDataExpiryTime,
  storeData,
  storeExpiringData,
} from "@/services/localstorage";
import { FetchError } from "./utils";

export const autologin = async () => {
  try {
    const token = await fetchData("jwtoken");
    await setDataExpiryTime(
      "jwtoken",
      Number(process.env.EXPO_PUBLIC_JWTOKEN_EXPIRATION_DAYS as string) * 24
    );
    return token;
  } catch {
    throw new Error("Please login");
  }
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  try {

    const response = await wrappedFetch({
      route: "/auth/login",
      method: "POST",
      body: userData,
    });
    if (response.status !== 200) {
      const errors = await response.json();
      console.error(errors.error);
      throw new FetchError(errors.error);
    }

    const json = await response.json();
    const { user, token } = json.data;
   
    await storeExpiringData(
      "jwtoken",
      token,
      Number(process.env.EXPO_PUBLIC_JWTOKEN_EXPIRATION_DAYS as string) * 24
    );
    await storeData("username", user.username);
    return user;
  } catch (error) {
    throw new Error(`Login failed: ${(error as Error).message}`);
  }
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await wrappedFetch({
    route: "/auth/register",
    method: "POST",
    body: userData,
  });
  if (response.status !== 200) {
    const errors = await response.json();
    throw new FetchError(errors.error);
  }

  const { username, password } = userData;
  return await login({ username, password });
};

export const getPasswordToken = async (email: string) => {
  const response = await wrappedFetch({
    route: "/auth/send-reset-token",
    method: "POST",
    body: { email },
  });
  if (response.status !== 200) {
    const errors = await response.json();
    throw new FetchError(errors.error);
  }

  return "Token sent to user email!";
};

export const changePassword = async (newPasswordData: {
  email: string;
  newPassword: string;
  token: string;
}) => {
  const response = await wrappedFetch({
    route: "/auth/reset-password",
    method: "PUT",
    body: newPasswordData,
  });
  if (response.status !== 200) {
    const errors = await response.json();
    throw new FetchError(errors.error);
  }
};

export const logout = async () => {
  try {
    await removeData("jwt");
    await removeData("username");
  } catch (error) {
    // TODO: figure what to do here
  }
};
