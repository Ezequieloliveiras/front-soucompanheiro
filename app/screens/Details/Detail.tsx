import { Button, Text, View } from "react-native"
import { StackTypes } from "@/app"
import { useNavigation } from "@react-navigation/native"

export default function App() {

    const navigation = useNavigation<StackTypes>() // colocar o stacktypes da tipagem

    return (
        <View>
            <Text style={{ marginTop: 60, textAlign: 'center', color: 'red' }}>
                Pagina Detalhes
            </Text>
            <Button
                title="Home"
                onPress={() => navigation.navigate("Home")} />
        </View>
    )
}
