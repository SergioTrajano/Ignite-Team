import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, FlatList, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Container, Form, HeaderList, NumberOfPlayers } from "./style";

import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
    group: string;
};

export function Players() {
    const [activedTeam, setActivedteam] = useState<string>("TIME A");
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState<string>("");
    const [isLoading, setIsloading] = useState<boolean>(true);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if (newPlayerName.trim() === "") {
            console.log("To aqui");
            return Alert.alert(
                "Novo participante",
                "Inclua o nome do participante para adicionar-lo."
            );
        }

        const newPlayer = {
            name: newPlayerName,
            team: activedTeam,
        };

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();
            setNewPlayerName("");
            await fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Novo participante", error.message);
            } else {
                console.log(error);
                Alert.alert("Novo participante", "Não foi possível adicionar o participante.");
            }
        }
    }

    async function handlePlayerRemove(name: string) {
        try {
            await playerRemoveByGroup(name, group);

            await fetchPlayersByTeam();
        } catch (error) {
            console.log(error);
            Alert.alert("Excluir participante", `Não foi possível excluir o participante ${name}`);
        }
    }

    async function handleGroupRemove() {
        Alert.alert("Remover grupo", `Deseja remove o grupo ${group}?`, [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => groupRemove() },
        ]);
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);

            navigate("groups");
        } catch (error) {
            console.log(error);
            Alert.alert("Remover grupo", "Não foi possível remover o grupo.");
        }
    }

    async function fetchPlayersByTeam() {
        setIsloading(true);

        try {
            const playerByTeam = await playersGetByGroupAndTeam(group, activedTeam);

            setPlayers(playerByTeam);
        } catch (error) {
            console.log(error);
            Alert.alert("Participante", "Não foi possível carregar os participantes.");
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [activedTeam]);

    return (
        <Container>
            <Header showBackButton />

            <HighLight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    style={{ paddingTop: 20, paddingBottom: 0 }}
                    value={newPlayerName}
                    onChangeText={(text) => setNewPlayerName(text)}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    icon="add"
                    onPress={() => handleAddPlayer()}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={["TIME A", "TIME B"]}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActived={item === activedTeam}
                            onPress={() => setActivedteam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={players}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 },
                    ]}
                />
            )}

            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </Container>
    );
}
