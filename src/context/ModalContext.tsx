import React, { useState } from 'react'

export interface ModalContextTypes {
    open: boolean;
    type: string;
    msg: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setType: React.Dispatch<React.SetStateAction<string>>;
    setMsg: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalContext = React.createContext<ModalContextTypes>(
    {} as ModalContextTypes
);

interface Props {
    children: React.ReactNode;
}

export const ModalContextProvider: React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [msg, setMsg] = useState('');

    return (
        <ModalContext.Provider value={{ open, setOpen, type, setType, msg, setMsg }}>
            {props.children}
        </ModalContext.Provider>
    )
}