export const setToken = (token) => {
    if (token) {
        localStorage.setItem('jwtToken', token);
    } else {
        localStorage.removeItem('jwtToken');
    }
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
};

// Add this to the bottom of the file
export const removeToken = () => {
    localStorage.removeItem('jwtToken');
};