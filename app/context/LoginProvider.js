import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'
import client from '../api/client'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState({})
  const [loginPending, setLoginPending] = useState(false)

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token !== null) {
        setLoginPending(true)
        const res = await client.get('/profile', {
          headers: {
            Authorization: `JWT ${token}`
          }
        })

        if (res.data.success) {
          setProfile(res.data.profile)
          setIsLoggedIn(true)
        } else {
          setProfile({})
          setIsLoggedIn(false)
        }
        setLoginPending(false)
      }
    } catch (error) {
      console.log('Erro ao buscar usuário:', error.message)
      setLoginPending(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      loginPending,
      setLoginPending,
      setIsLoggedIn,
      profile,
      setProfile
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('useLogin deve ser usado dentro de um LoginProvider')
  }
  return context
}

export default LoginProvider
