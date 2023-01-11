import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Container, Content, Icon } from "./style";
import { Input } from "@components/Input";

export function NewGroup() {
    const [group, setGroup] = useState<string>("");

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleNewGroup() {
        navigate("players", { group });
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <HighLight
                    title="Nova turma"
                    subtitle="Cria a nova turma para adicionar os participantes"
                />
                <Input
                    placeholder="Nome da turma"
                    value={group}
                    onChangeText={(text) => setGroup(text)}
                />
                <Button
                    title="Criar"
                    onPress={handleNewGroup}
                />
            </Content>
        </Container>
    );
}
