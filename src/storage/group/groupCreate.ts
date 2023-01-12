import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLETION } from "@storage/storageConfig";

export async function groupCreate(newGroupName: string) {
    try {
        await AsyncStorage.setItem(GROUP_COLLETION, newGroupName);
    } catch (error) {
        throw error;
    }
}
