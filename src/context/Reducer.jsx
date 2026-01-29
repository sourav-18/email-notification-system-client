import constantData from "../utils/constant.util";
export default function Reducer(state,action){
    switch(action.type){
        case constantData.reducerActionType.alertMessageSet:
            return{...state,alertMessage:action.payload}
        default:
            return state;
    }
}