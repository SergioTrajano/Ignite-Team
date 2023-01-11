import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import theme from "@themes/index";
import { Routes } from "./src/routes";
import { Loading } from "@components/Loading";

export default function App() {
    const [fonstLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            {fonstLoaded ? <Routes /> : <Loading />}
        </ThemeProvider>
    );
}
