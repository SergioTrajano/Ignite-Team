import { Container, Logo, BackButton, Icon } from "./style";
import logoImg from "@assets/logo.png";

type Props = {
    showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
    return (
        <Container>
            {showBackButton && (
                <BackButton>
                    <Icon />
                </BackButton>
            )}
            <Logo source={logoImg} />
        </Container>
    );
}
