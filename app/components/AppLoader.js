import { View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"

const Apploader = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView
                source={require('../../assets/Animation - 1718207444166.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    },
    lottie: {
        width: 200,
        height: 200,
    }
})

export default Apploader
