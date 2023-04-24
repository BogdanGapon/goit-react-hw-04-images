import { createContext, useContext } from 'react';
const MyContext = createContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, useMyContext };
