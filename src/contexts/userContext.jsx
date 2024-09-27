import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const putUser = (newUser) => {
        setUser(newUser)
    }

    const updateUser = (newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    }

    return (
        <UserContext.Provider value={{ user, putUser }}>
            {children}
        </UserContext.Provider>
    )
}