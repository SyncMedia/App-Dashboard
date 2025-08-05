import React, { useEffect, useState } from "react";
import { EyeClosed, EyeOpen } from "../../utils/icons";
import { Helmet } from "react-helmet";
import { loadProfile, login, logout, routeHome, storeProfile } from "@/utils/auth";
import { ShowError, storeCreds } from "@/utils/general";
import { Routes } from "@/utils/routes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ICredFun = (j: object) => void;

declare global {
    interface Window {
        handleCredentialResponse: ICredFun;
    }
}

let windowHandlers: ICredFun[] = [];

window.handleCredentialResponse = (response) => {
    windowHandlers.forEach((x) => x(response));
};

export const Login = () => {
    const navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleCredentialResponse = async (creds: object) => {
        console.log("response", JSON.stringify(creds));
        const response = await fetch(Routes.GoogleLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(creds),
        });

        const decoded = await response.json();

        storeProfile(decoded);
        onLogin();
    };

    useEffect(() => {
        windowHandlers.push(handleCredentialResponse);
        return () => {
            windowHandlers = [];
        };
    }, []);

    const onLogin = async () => {
        const creds = await fetch(
            Routes.ClickhouseCreds,
            {
                credentials: "include",
            }
        ).then((res) => res.json());

        storeCreds(creds.data);

        const { roles } = loadProfile();
        if (roles.includes("admin") || roles.includes("appography")) {
            navigate("/home");
        } else {
            toast.error(
                <a href="mailto:team@syncmedia.io">
                    Please contact support at{" "}
                    <span className="underline">team@syncmedia.io</span> for
                    access"
                </a>,
                {
                    dismissible: true,
                    closeButton: true,
                    duration: 2000,
                }
            );
            logout();
        }
    };

    const submitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            await login(username.trim(), password);
            onLogin();
        } catch (e) {
            localStorage.clear();
            toast.error("Please enter valid credentials", {
                dismissible: true,
                closeButton: true,
                duration: 2000,
            });
        }
    };

    return (
        <div
            className="w-screen h-screen
            before:content-['*']
            before:w-screen before:h-screen
            before:fixed
            before:bg-[url('/assets/images/login_bg.png')]
            background-image: url('/assets/images/login_bg.png');
            before:bg-cover before:bg-center before:bg-no-repeat before:blur-lg before:scale-110 before:content"
        >
            <Helmet>
                <script
                    src="https://accounts.google.com/gsi/client"
                    async
                ></script>
            </Helmet>

            <div className="mx-auto w-1/3 bg-white relative top-1/2 -translate-y-1/2 rounded-lg">
                <form spellCheck="false" className="pt-8 pl-12 pr-12">
                    <h1 className="text-center text-4xl">Welcome</h1>
                    <img
                        src="/assets/images/sync_light.png"
                        className="invert mx-auto mt-5"
                        alt="logo"
                    />

                    <div className="mt-5">
                        <div
                            id="g_id_onload"
                            data-client_id="1090536512543-dq0o864mm14cv0kb8p30hnp3h2vpgetn.apps.googleusercontent.com"
                            data-context="signin"
                            data-ux_mode="popup"
                            data-callback="handleCredentialResponse"
                            data-nonce=""
                            data-auto_select="true"
                            data-itp_support="true"
                        ></div>

                        <div
                            className="g_id_signin"
                            data-type="standard"
                            data-shape="pill"
                            data-theme="outline"
                            data-text="signin_with"
                            data-size="large"
                            data-logo_alignment="center"
                            data-width="400"
                        ></div>

                        <div className="h-0.5 bg-zinc-300 w-full mt-5 place-self-center"></div>
                    </div>

                    {/* bg-white form_no_box form_undeline form-control */}
                    <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        className="w-full mt-10 bg-white border-b-2  shadow-none rounded-none border-b-zinc-300 outline-0 border-b-solid outline-hidden"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />

                    <div className="mt-8">
                        <input
                            className="w-full bg-white border-b-2  shadow-none rounded-none border-b-zinc-300 outline-0 border-b-solid outline-hidden"
                            autoComplete="current-password"
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <span
                            className="input-group-addon fixed right-12"
                            onClick={() => {
                                setPasswordVisible(!passwordVisible);
                            }}
                        >
                            {passwordVisible ? <EyeClosed /> : <EyeOpen />}
                        </span>
                    </div>

                    <button
                        id="login_button"
                        type="button"
                        className="w-full mt-10 font-bold rounded-full pt-2 pb-2 text-center text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500"
                        onClick={submitForm}
                    >
                        Login
                    </button>
                    <div className="mt-8 text-center mx-auto">
                        <small id="emailHelp" className="text-center">
                            Reach out to{" "}
                            <a
                                href="mailto:hello@syncmedia.io"
                                className="text-blue-400"
                            >
                                hello@syncmedia.io
                            </a>{" "}
                            for queries.
                        </small>
                    </div>

                    <div className="mt-0 text-center mx-auto pb-5">
                        <small className="">
                            <a
                                href="/forgot_password"
                                className="text-blue-400"
                            >
                                Forgot Password?
                            </a>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
};
