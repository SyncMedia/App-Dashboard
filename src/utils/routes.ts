import { ResetPassword } from "@/pages/account/ResetPassword";

const fetchHost = () => {
    if (import.meta.env.VITE_DEBUG_ENABLED) {
        return "http://localhost:9000";
    }

    return "https://prod-api.syncmedia.io";
};

const Routes = {
    Login: "/v1.0/auth/login",
    Logout: "/v1.0/auth/logout",
    GoogleLogin: "/v2/oauth/google_login",
    RequestResetPassword: "/v1.0/accounts/password_reset/request/",
    ResetPassword: "/v1.0/accounts/password_reset",
    ClickhouseCreds: "/v2/syncpulse/dashboard/clickhouse"
}

Object.keys(Routes).forEach((key) => {
    Routes[key] = fetchHost() + Routes[key];
})

export {
    fetchHost,
    Routes
}