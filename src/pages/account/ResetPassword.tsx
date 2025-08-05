import { useLocation } from "react-router-dom";
import { ShowError, ShowSuccess } from "../../utils/general";
import { openLogin } from "../../utils/auth";
import { Routes } from "@/utils/routes";

export const ResetPassword = () => {
    const location = useLocation();

    const setNewPassword = async () => {
        const token = new URLSearchParams(location.search).get("token");

        const password = (
            document.getElementById("password") as HTMLInputElement
        ).value.trim();

        if (password.length < 6) {
            ShowError("Please set atleast 6 digit password");
            return;
        }

        const payload = { token: token, password: password };

        await fetch(Routes.ResetPassword, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        ShowSuccess("Password updated");

        setTimeout(() => openLogin(), 2000);
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
            <div className="mx-auto w-1/3 h-4/5 bg-white relative top-1/2 -translate-y-1/2 rounded-lg">
                <form spellCheck="false" className="pt-8 pl-12 pr-12">
                    <h1 className="text-center text-4xl">Set New Password</h1>
                    <img
                        src="/assets/images/sync_light.png"
                        className=" invert mx-auto mt-12"
                        alt="logo"
                    />

                    {/* bg-white form_no_box form_undeline form-control */}
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        className="w-full mt-20 bg-white border-b-2  shadow-none rounded-none border-b-zinc-300 outline-0 border-b-solid outline-hidden"
                        placeholder="Enter password"
                    />

                    <button
                        id="login_button"
                        type="button"
                        className="w-full mt-20 font-bold rounded-full pt-2 pb-2 text-center text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500"
                        onClick={() => {
                            setNewPassword();
                        }}
                    >
                        Submit
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
                </form>
            </div>
        </div>
    );
};
