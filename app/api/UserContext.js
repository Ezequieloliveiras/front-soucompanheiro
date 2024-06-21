import {
    createContext,
    useState
} from "react";

// Criação do contexto
export const UserContext = createContext()
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null)
    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}