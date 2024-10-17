import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (error) {
        throw new Error(`Error at saving data: ${(error as Error).message}`);
    }
}

export const fetchData = async (key: string): Promise<any> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (!value)
            throw new Error('Value not found');
    }
    catch (error) {
        throw new Error(`Error at fetching data: ${(error as Error).message}`);
    }
}