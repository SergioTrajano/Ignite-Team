import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLETION } from "@storage/storageConfig";
import { playerGetbyGroup } from "./playerGetByGroup";

export async function playerRemoveByGroup(name: string, group: string) {
    try {
        const storage = await playerGetbyGroup(group);

        const filteredStorage = storage.filter((player) => player.name !== name);

        const players = JSON.stringify(filteredStorage);

        await AsyncStorage.setItem(`${PLAYER_COLLETION}-${group}`, players);
    } catch (error) {
        throw error;
    }
}
