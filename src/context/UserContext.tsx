import React, { useState } from 'react'

export interface UserContextTypes {
    username: string;
    setUsername: (user: string) => void;
}

export const UserContext = React.createContext<UserContextTypes>(
    {} as UserContextTypes
);

interface Props {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = (props) => {
    const username = localStorage.getItem("username") || "";
    const setUsername = (user: string) => {
        localStorage.setItem("username", user);
    }

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {props.children}
        </UserContext.Provider>
    )
}