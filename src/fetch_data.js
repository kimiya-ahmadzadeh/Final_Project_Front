const BASE_URL = "http://localhost:5000";

export async function GetLists(userID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/users/${userID}/lists`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function GetListBooks(listID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/lists/${listID}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function VerifyLogin(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "username": `${username}`,
        "password": `${password}`
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/login`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}