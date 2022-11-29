import React, { useState } from 'react'

export interface UserContextTypes {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = React.createContext<UserContextTypes>(
    {} as UserContextTypes
);

interface Props {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = (props) => {
    const [username, setUsername] = useState<string>('');

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {props.children}
        </UserContext.Provider>
    )
}