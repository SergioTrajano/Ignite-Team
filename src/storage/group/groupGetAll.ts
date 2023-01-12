import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLETION } from "@storage/storageConfig";

export async function groupGetAll() {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLETION);

        const group: string[] = storage ? JSON.parse(storage) : [];

        return group;
    } catch (error) {
        throw error;
    }
}
