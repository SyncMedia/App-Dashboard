import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import * as Sentry from "@sentry/react";
import { BrowserRouter } from "react-router-dom";

Sentry.init({
    dsn: "https://a633a61249a62215c0666919cf64e7f7@o4509141634514944.ingest.de.sentry.io/4509792174145616",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [
        Sentry.httpClientIntegration(),
        Sentry.captureConsoleIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["https://prod-api.syncmedia.io"],
    enabled: import.meta.env.VITE_APP_STAGE === 'production',
});

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
