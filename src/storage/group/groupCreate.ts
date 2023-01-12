import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLETION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroupName: string) {
    try {
        const storedGroup = await groupGetAll();

        const groupAlreadyExists = storedGroup.includes(newGroupName);

        if (groupAlreadyExists) {
            throw new AppError("Já existe um grupo cadastrado com esse nome.");
        }

        const storage = JSON.stringify([...storedGroup, newGroupName]);
        await AsyncStorage.setItem(GROUP_COLLETION, storage);
    } catch (error) {
        throw error;
    }
}
