import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Container, Content, Icon } from "./style";
import { Input } from "@components/Input";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <HighLight
                    title="Nova turma"
                    subtitle="Cria a nova turma para adicionar os participantes"
                />
                <Input placeholder="Nome da turma" />
                <Button title="Criar" />
            </Content>
        </Container>
    );
}
