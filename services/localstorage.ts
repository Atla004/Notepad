import AsyncStorage from "@react-native-async-storage/async-storage";
import { testJSON } from "./utils";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw new Error(`Error at saving data: ${(error as Error).message}`);
  }
};

export const storeExpiringData = async (
  key: string,
  value: string,
  hours: number
) => {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  const expirationTimestamp = Math.floor(now.getTime() / 1000);
  const formattedData = JSON.stringify({
    value,
    expiryTime: expirationTimestamp,
  });
  await storeData(key, formattedData);
};

export const storeJSONData = async (key: string, value: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getJSONData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) throw new Error("Key not found");
    return JSON.parse(value);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const editJSONData = async (key: string, value: object) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const fetchData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) throw new Error("Value not found");

    const parsedValue = testJSON(value);
    if (typeof parsedValue === "string") return parsedValue;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp >= parsedValue?.expiryTime) {
      await removeData(key);
      throw new Error("Value not found");
    }

    return parsedValue?.value;
  } catch (error) {
    throw new Error(`Error at fetching data: ${(error as Error).message}`);
  }
};

export const editData = async (key: string, value: string) => {
  try {
    await AsyncStorage.mergeItem(key, value);
  } catch (error) {
    throw new Error(`Error at fetching data: ${(error as Error).message}`);
  }
};

export const setDataExpiryTime = async (key: string, hours: number) => {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  const expirationTimestamp = Math.floor(now.getTime() / 1000);
  const formattedEdit = { expiryTime: expirationTimestamp };
  await editData(key, JSON.stringify(formattedEdit));
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error(`Error at fetching data: ${(error as Error).message}`);
  }
};
