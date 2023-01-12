import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Container, Content, Icon } from "./style";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
    const [group, setGroup] = useState<string>("");

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    async function handleNewGroup() {
        if (group === "") {
            return Alert.alert("Novo grupo", "Informe o nome da turma para cria-la");
        }

        try {
            await groupCreate(group.trim());
            navigate("players", { group: group.trim() });
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Novo grupo", error.message);
            } else {
                Alert.alert("Novo grupo", "Não foi possível criar um novo grupo.");

                console.log(error);
            }
        }
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
