import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLETION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroupName: string) {
    try {
        const storedGroup = await groupGetAll();

        const storage = JSON.stringify([...storedGroup, newGroupName]);
        await AsyncStorage.setItem(GROUP_COLLETION, storage);
    } catch (error) {
        throw error;
    }
}
