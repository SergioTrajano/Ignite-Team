import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PLAYER_COLLETION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetbyGroup } from "./playerGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await playerGetbyGroup(group);

        if (storedPlayers.find((player) => player.name === newPlayer.name)) {
            throw new AppError("Essa pessoa já está adicionada");
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);
        await AsyncStorage.setItem(`${PLAYER_COLLETION}-${group}`, storage);
    } catch (error) {
        throw error;
    }
}
