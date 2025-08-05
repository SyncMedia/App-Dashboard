import { Routes } from "./routes";

export const isLoggedIn = () => {
    const { roles } = loadProfile();
    return roles.length > 0;
};

export const loadProfile = (): {
    roles: string[];
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
} => {
    return JSON.parse(
        localStorage.getItem("account_details") || '{"roles": []}'
    );
};

export const storeProfile = (data: {
    roles: string | string[];
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
}) => {
    if (data.roles.length > 0 && !Array.isArray(data.roles)) {
        data.roles = data.roles.split(",");
    }

    localStorage.account_details = JSON.stringify(data);
};

export const logout = async () => {
    await fetch(Routes.Logout, {
        method: "GET",
        credentials: "include",
    });

    openLogin();
};

export const openLogin = () => {
    localStorage.clear();
    window.location.href = "/login";
};

export const login = async (username: string, password: string) => {
    if (
        username === "" ||
        username === null ||
        username.length === 0 ||
        password === "" ||
        password === null ||
        password.length === 0
    ) {
        console.log("invalid input");
        throw "invalid input";
    }

    const dataString = {
        user: username,
        pass: password,
        service: "cms",
    };

    const data = await fetch(Routes.Login, {
        method: "POST",
        body: JSON.stringify(dataString),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const decoded = await data.json();

    storeProfile(decoded);

    return;
};

export const routeHome = () => {
    const { roles } = loadProfile();

    let location = "";

    if (roles.includes("admin") || roles.includes("appography")) {
        location = "/home";

        console.log("logging in to ", location);
        window.location.href = location;
    } else {
        console.log("access missing")
        logout()
    }

};
