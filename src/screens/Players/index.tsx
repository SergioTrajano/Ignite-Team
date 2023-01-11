import { useState } from "react";
import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./style";

import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players() {
    const [activedTeam, setActivedteam] = useState<string>("TIME A");
    const [players, setPlayers] = useState([]);

    return (
        <Container>
            <Header showBackButton />

            <HighLight
                title="Nome da turma"
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome do participante"
                    autoCorrect={false}
                />
                <ButtonIcon icon="add" />
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

            <FlatList
                data={players}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => {}}
                    />
                )}
                ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 },
                ]}
            />

            <Button
                title="Remover turma"
                type="SECONDARY"
            />
        </Container>
    );
}
