import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
const allState = createContext();

function Context({ children }) {
    const [state, dispatch] = useReducer(Reducer, {
        alertMessage: null,
        adminProfile: null,
        organizationProfile: null,
        loadProfile:false,
        removeAllProfileData:()=>{
            this.adminProfile=null;
            this.userProfile=null;
        }
    })
    return (
        <allState.Provider value={{ state, dispatch }}>
            {children}
        </allState.Provider>
    )
}
export default Context;
export const AllState = () => {
    return useContext(allState)
}