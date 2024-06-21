// essas rotas são as rotas que ficam no interior do app após o login só sim você terá acesso a elas.

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/pageInitial/Home.js'
import UserList from './components/user/UsersList.js'
import StatesAndCityApi from './components/StatesAndCityApi.js'

import { signOut } from './api/user'
import { useLogin } from './context/LoginProvider'
import { TouchableOpacity, Text, Image } from 'react-native'

const Stack = createNativeStackNavigator()

const InternalNavigator = () => {

    const { setIsLoggedIn, profile, setLoginPending } = useLogin()

    // sai do app
    const handleLogout = async () => {
        setLoginPending(true)
        const isLoggedOut = await signOut()
        if (isLoggedOut) {
            setIsLoggedIn(false)
        }
        setLoginPending(false)
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={() => ({
                    headerRight: () => (
                        <>
                            <TouchableOpacity onPress={handleLogout}>
                                <Text style={{ marginRight: 10, color: 'black' }}>Logout</Text>
                            </TouchableOpacity>
                            <Image
                                source={{
                                    uri:
                                        profile.avatar ||
                                        'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                }}
                                style={{ width: 40, height: 40, borderRadius: 30 }}
                            />
                        </>
                    )
                })}
            />
            <Stack.Screen component={UserList} name='UserList' />
            <Stack.Screen component={StatesAndCityApi} name='StatesAndCityApi' />
        </Stack.Navigator>
    )
}

export default InternalNavigator

