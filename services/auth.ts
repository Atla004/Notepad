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
  } catch (e) {
    
  }
};

export const login = async (
  userData: {
    username: string;
    password: string;
  },
  save: boolean = true
) => {
  try {
    const response = await wrappedFetch({
      route: "/auth/login",
      method: "POST",
      body: userData,
    });
    console.log("user");
    if (response.status !== 200) {
      const errors = await response.json();
      console.error(errors.error);
      throw new FetchError(errors.error);
    }

    const json = await response.json();
    const { user, token } = json.data;
    if (save) {
      await storeExpiringData(
        "jwtoken",
        token,
        Number(process.env.EXPO_PUBLIC_JWTOKEN_EXPIRATION_DAYS as string) * 24
      );
      await storeData("username", user.username);
    }
    return user;
  } catch (error) {
    console.error("erorr en funcion");
    throw new Error(`Login failed: ${(error as Error).message}`);
  }
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await wrappedFetch({
      route: "/auth/register",
      method: "POST",
      body: userData,
    });
    if (response.status !== 200) {
      const errors = await response.json();
      return errors.error;
    }
    const json = await response.json();
    const { username, password } = json;
    console.log(`User ${username} registered with password ${password}`);
    console.log("with ", json);

    return "registered";
  } catch (error) {
    return (error as Error).message;
  }
};

export const getPasswordToken = async (email: string) => {
  try {
    const response = await wrappedFetch({
      route: "/auth/send-reset-token",
      method: "POST",
      body: { email },
    });
    if (response.status !== 200) {
      const errors = await response.json();
      return errors.error;
    }

    return "Token sent to user email!";
  } catch (error) {
    console.error(error);
  }
};

export const checkResetToken = async (token: string) => {
  try {
    const response = await wrappedFetch({
      route: "/auth/check-reset-token",
      method: "POST",
      body: { token },
    });
    if (response.status !== 200) {
      const errors = await response.json();
      return errors.error;
    }

    return "valid";
  } catch (error) {
    return (error as Error).message;
  }
};

export const changePassword = async (newPasswordData: {
  email: string;
  newPassword: string;
  token: string;
}) => {
  try {
    const response = await wrappedFetch({
      route: "/auth/reset-password",
      method: "PUT",
      body: newPasswordData,
    });
    if (response.status !== 200) {
      const errors = await response.json();
      return errors.error;
    }
    return "valid";
  } catch (error) {
    return (error as Error).message;
  }
};

export const logout = async () => {
  try {
    await removeData("jwtoken");
    await removeData("username");
  } catch (error) {
    // TODO: figure what to do here
  }
};
