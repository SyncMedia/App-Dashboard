import { Routes } from "@/utils/routes";
import { openLogin } from "../../utils/auth";
import { ShowSuccess } from "../../utils/general";


export const ForgotPassword = () => {
    const requestResetEmail = async () => {
        const username = (
            document.getElementById("username") as HTMLInputElement
        ).value.trim();
        if (username.length < 6) {
            return;
        }

        await fetch(Routes.RequestResetPassword + encodeURIComponent(username));

        ShowSuccess("Please check your inbox for password reset instructions");
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
                    <h1 className="text-center text-4xl">
                        Request Reset Email
                    </h1>
                    <img
                        src="/assets/images/sync_light.png"
                        className=" invert mx-auto mt-12"
                        alt="logo"
                    />

                    {/* bg-white form_no_box form_undeline form-control */}
                    <input
                        id="username"
                        type="email"
                        autoComplete="username"
                        className="w-full mt-20 bg-white border-b-2  shadow-none rounded-none border-b-zinc-300 outline-0 border-b-solid outline-hidden"
                        placeholder="Enter email"
                    />

                    <button
                        id="login_button"
                        type="button"
                        className="w-full mt-20 font-bold rounded-full pt-2 pb-2 text-center text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500"
                        onClick={() => {
                            requestResetEmail();
                        }}
                    >
                        Request
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
