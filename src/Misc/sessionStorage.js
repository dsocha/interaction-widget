const SESSION_KEY_TOKEN = "gc.token";

export const getToken = () => sessionStorage.getItem(SESSION_KEY_TOKEN);
export const setToken = (v) => sessionStorage.setItem(SESSION_KEY_TOKEN, v);
