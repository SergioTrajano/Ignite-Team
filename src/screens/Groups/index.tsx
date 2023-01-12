import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Container } from "./styles";
import { HighLight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { groupGetAll } from "@storage/group/groupGetAll";

export function Groups() {
    const [groups, setGroups] = useState<string[]>([]);

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleNewGroup() {
        navigate("new");
    }

    useFocusEffect(
        useCallback(() => {
            fetchGroup();
        }, [])
    );

    async function fetchGroup() {
        try {
            const data = await groupGetAll();

            setGroups(data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <Header showBackButton={false} />
            <HighLight
                title="Turmas"
                subtitle="Jogue com a sua turma"
            />
            <FlatList
                data={groups}
                keyExtractor={(item, i) => `${item} + ${i}`}
                renderItem={({ item }) => <GroupCard title={item} />}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar a primeira turma?" />
                )}
                showsVerticalScrollIndicator={false}
            />

            <Button
                title="Criar nova turma"
                onPress={handleNewGroup}
            />
        </Container>
    );
}
