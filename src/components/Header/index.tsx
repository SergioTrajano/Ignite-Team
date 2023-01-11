import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Container, Logo, BackButton, Icon } from "./style";

type Props = {
    showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleGoBack() {
        navigate("groups");
    }

    return (
        <Container>
            {showBackButton && (
                <BackButton onPress={handleGoBack}>
                    <Icon />
                </BackButton>
            )}
            <Logo source={logoImg} />
        </Container>
    );
}
