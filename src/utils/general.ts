import { createClient } from "@clickhouse/client-web";

import { toast } from "react-toastify";

export const triggerDownload = (filename: string, data: string) => {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export const asyncForEach = async <T>(
    items: T[],
    callback: (item: T) => void
) => {
    for (let i = 0; i < items.length; i++) {
        await callback(items[i]);
    }
};

export const ShowError = (text: string) => {
    toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const ShowSuccess = (text: string) => {
    toast.success(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

const credsKey = "clickhouse.creds";

export const loadClickhouseClient = () => {
    const creds = loadCreds();

    const client = createClient({
        url: "https://clickhousedb.services.syncmedia.io",
        username: creds!.username,
        password: creds!.password,
        database: "prod",
        clickhouse_settings: {
            output_format_json_quote_64bit_floats: 0,
            output_format_json_quote_64bit_integers: 0,
        },
    });

    return client;
};

export const loadCreds = (): {
    username: string;
    password: string;
    host: string;
} => {
    return JSON.parse(
        localStorage.getItem(credsKey) ||
        '{"username": "", "password": "", "host": ""}'
    );
};

export const storeCreds = (creds) => {
    localStorage.setItem(credsKey, JSON.stringify(creds));
};