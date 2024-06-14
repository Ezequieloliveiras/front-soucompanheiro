import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import LoginProvider from './context/LoginProvider'

export default function App() {
  return (
    <LoginProvider>
      <>
        <MainNavigator />
      </>
    </LoginProvider>
  )
}
