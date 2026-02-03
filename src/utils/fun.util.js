export function removeUserDataFormLocalStorage() {
    localStorage.removeItem("secret-key");
    localStorage.removeItem("user-type");
    localStorage.removeItem("token");
}

export function setUserDataInLocalStorage({token, userType, secretKey}) {
    localStorage.setItem("token", token);
    localStorage.setItem("secret-key", secretKey);
    localStorage.setItem("user-type", userType);
}