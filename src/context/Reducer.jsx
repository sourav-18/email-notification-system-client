import constantData from "../utils/constant.util";
export default function Reducer(state, action) {
    switch (action.type) {
        case constantData.reducerActionType.alertMessageSet:
            return { ...state, alertMessage: action.payload };
        case constantData.reducerActionType.adminProfileSet:
            return { ...state, adminProfile: action.payload };
        case constantData.reducerActionType.organizationProfileSet:
            return { ...state, organizationProfile: action.payload };
        case constantData.reducerActionType.loadProfileData:
            return { ...state, loadProfile:!state.loadProfile };
        case constantData.reducerActionType.removeAllProfileData:
            return { ...state, organizationProfile: null, adminProfile: null };
        default:
            return state;
    }
}