import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
const initialState = {
    Email: "",
    GoogleId: "",
    Image: "",
    Username: "",
    _id: "",
    InviteId:{
      DocId: "",
      status: false
    }
  };
  const AppContext = React.createContext();

  const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
          value={{state, dispatch}}
        >
          {children}
        </AppContext.Provider>
      );
    };
    const useGlobalContext = () => {
      return useContext(AppContext);
    };
    export { useGlobalContext, AppProvider }; 
  
