const BASE_URL = "http://localhost:5000";

export function GetUserID() {
    const user = JSON.parse(localStorage.getItem("userAuth"));
    return user.id;
}

export async function get(path) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function post(path, body) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(body);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function put(path, body) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(body);
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}

export async function deleting(path) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };
    const data = fetch(`${BASE_URL}/${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return data;
}
