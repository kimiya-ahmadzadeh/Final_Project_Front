const BASE_URL = "http://localhost:5000";

export function GetUserID() {
    const user = JSON.parse(localStorage.getItem("userAuth"));
    return user.id;
}

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

export async function EditList(listID, name, desc) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "name": `${name}`,
        "description": `${desc}`
    });
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/users/lists/${listID}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function PostList(userID, name, desc) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "name": `${name}`,
        "description": `${desc}`,
        "user_id": `${userID}`
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/users/lists`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function DeleteList(listID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/users/lists/${listID}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function GetUserInfo(userID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/users/${userID}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function EditUser(userID, firstName, lastName, bio, username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "first_name": `${firstName}`,
        "last_name": `${lastName}`,
        "bio": `${bio}`,
        "username": `${username}`,
        "password": `${password}`
    });
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/users/${userID}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}