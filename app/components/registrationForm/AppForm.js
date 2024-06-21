import { useRef } from 'react'
import { useLogin } from '../../context/LoginProvider'
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native'

import FormHeader from './FormHeader'
import FormSelectorBtn from './FormSelectorBtn'
import SignupForm from './SignupForm'
import LoginForm from '../login/LoginForm'
import AppLoader from '../../partials/AppLoader'

const { width } = Dimensions.get('window')

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current
  const scrollView = useRef()

  const { loginPending } = useLogin()

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [1, width],
    outputRange: [1, 0],
  })

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [50, width],
    outputRange: [0, 56],
  })
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  })
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#0094FF', 'rgba(27,27,51,0.4)'],

  })
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,0.4)', '#0094FF'],
  })

  return (
    <>

      <View style={{ flex: 1, paddingTop: 120 }}>
        <View style={{ height: 80 }}>
          <FormHeader
            leftHeading='Bem-vindo'
            rightHeading='de volta!'
            subHeading='O melhor app de diaristas'
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX={leftHeaderTranslateX}
            rightHeaderTranslateY={rightHeaderTranslateY}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <FormSelectorBtn
            style={styles.borderLeft}
            backgroundColor={loginColorInterpolate}
            title='Entrar'
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorBtn
            style={styles.borderRight}
            backgroundColor={signupColorInterpolate}
            title='Inscreva-se'
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false }
          )}
        >
          <LoginForm navigation={navigation} />
          <ScrollView>
            <SignupForm navigation={navigation} />
          </ScrollView>
        </ScrollView>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
})
