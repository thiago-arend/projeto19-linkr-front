import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const lsUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(lsUser));

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}