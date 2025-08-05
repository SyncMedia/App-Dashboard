type IconProps = {
    className?: string;
    toolTipContent?: string;
    onClick?: () => void;
};

export const EyeOpen = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    );
};

export const EyeClosed = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
        />
    </svg>
);

export const AccountIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
    </svg>
);

export const StarIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={props.className}
    >
        <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
        />
    </svg>
);

export const LogoutIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        data-tooltip-content={props.toolTipContent || "Logout"}
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
    </svg>
);

export const FilterIcon = (props: IconProps) => (
    <svg
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Filter"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        onClick={props.onClick}
    >
        <path
            d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const DashboardIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
    </svg>
);

export const SearchIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Search"}
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
);

export const AdvancedSearch = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 460 512"
        fill="currentColor"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Advanced Search"}
        className={props.className}
        onClick={props.onClick}
    >
        <path d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z" />
    </svg>
);

export const PenIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Edit"}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z" />
    </svg>
);

export const VideoIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
        <path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
    </svg>
);

export const CommitIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Save"}
    >
        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
        <path d="M320 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm156.8-48C462 361 397.4 416 320 416s-142-55-156.8-128L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l131.2 0C178 151 242.6 96 320 96s142 55 156.8 128L608 224c17.7 0 32 14.3 32 32s-14.3 32-32 32l-131.2 0z" />
    </svg>
);

export const EditIcon = (props: IconProps) => (
    // <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Edit"}
    >
        <path
            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const CrossBoldIcon = (props: IconProps) => (
    <svg
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Close"}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={props.className}
        viewBox="0 0 1792 1792"
        onClick={props.onClick}
    >
        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
    </svg>
);

export const CrossIcon = (props: IconProps) => (
    <svg
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Remove"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
    </svg>
);

export const TickIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Accept"}
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
);

export const AddIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={props.className}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Add"}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
);

export const DatabaseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z" />
    </svg>
);

export const DatabaseRefreshIcon = (props: IconProps) => (
    <svg
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Database"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        id="reload-database"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
    >
        {/* <a href="https://iconscout.com/icons/reload-database" class="text-underline font-size-sm" target="_blank">Reload Database</a> by <a href="https://iconscout.com/contributors/iconade" class="text-underline font-size-sm" target="_blank">Icon Ade</a> */}
        <g data-name="Layer 2">
            <path d="M371.47,512C294,512,230.94,449,230.94,371.47s63-140.53,140.53-140.53S512,294,512,371.47,449,512,371.47,512Zm0-261.06A120.53,120.53,0,1,0,492,371.47,120.67,120.67,0,0,0,371.47,250.94Z"></path>
            <path d="M373.43,438.79a67.32,67.32,0,1,1,67.32-67.32v26.28a10,10,0,0,1-20,0V371.47a47.32,47.32,0,1,0-47.32,47.32,10,10,0,0,1,0,20Z"></path>
            <path d="M431.25 407.75a10 10 0 01-7.07-2.93l-21-21a10 10 0 0114.14-14.15l13.95 14 13.95-14a10 10 0 0114.15 14.15l-21 21A10 10 0 01431.25 407.75zM215.84 216.8C159.39 216.8 106.17 206.22 66 187 23.43 166.66 0 138.75 0 108.4S23.43 50.14 66 29.8C106.17 10.58 159.39 0 215.84 0S325.5 10.58 365.7 29.8c42.54 20.34 66 48.25 66 78.6s-23.43 58.26-66 78.6C325.5 206.22 272.28 216.8 215.84 216.8zm0-196.8C162.32 20 112.16 29.89 74.6 47.84 39.9 64.43 20 86.5 20 108.4s19.9 44 54.6 60.56c37.56 17.95 87.72 27.84 141.24 27.84S319.51 186.91 357.07 169c34.7-16.59 54.6-38.66 54.6-60.56s-19.9-44-54.6-60.56C319.51 29.89 269.36 20 215.84 20zM215.84 315.2c-56.45 0-109.67-10.58-149.87-29.8C23.43 265.06 0 237.15 0 206.8a10 10 0 0120 0c0 21.9 19.9 44 54.6 60.56 37.56 17.95 87.72 27.84 141.24 27.84a417.17 417.17 0 0043.5-2.25 10 10 0 112.1 19.88A435.47 435.47 0 01215.84 315.2zM215.84 413.6C159.39 413.6 106.17 403 66 383.8 23.43 363.46 0 335.55 0 305.2a10 10 0 0120 0c0 21.9 19.9 44 54.6 60.56 37.56 17.95 87.72 27.84 141.24 27.84 9.33 0 18.82-.31 28.19-.93a10 10 0 011.31 19.95C235.54 413.27 225.61 413.6 215.84 413.6z"></path>
            <path d="M215.84 512C159.39 512 106.17 501.42 66 482.2 23.43 461.86 0 434 0 403.6V120.45a10 10 0 1120 0V403.6c0 21.9 19.9 44 54.6 60.56C112.16 482.11 162.32 492 215.84 492c34.18 0 67.89-4.17 97.48-12.05a10 10 0 115.15 19.32C287.22 507.6 251.73 512 215.84 512zM421.67 261a10 10 0 01-10-10V108.4a10 10 0 0120 0V251A10 10 0 01421.67 261z"></path>
            <path d="M50.16 220.82a9.85 9.85 0 01-1.95-.2 10.1 10.1 0 01-1.87-.57 10.24 10.24 0 01-1.73-.92 9.57 9.57 0 01-1.52-1.24 10 10 0 011.52-15.39 10.24 10.24 0 011.73-.92 10.1 10.1 0 011.87-.57 9.9 9.9 0 013.91 0 10.58 10.58 0 011.87.57 10 10 0 016 7.28 10 10 0 01-2.74 9 9.57 9.57 0 01-1.52 1.24 10.15 10.15 0 01-1.72.92 10.58 10.58 0 01-1.87.57A10 10 0 0150.16 220.82zM90.33 240.9a10 10 0 01-2-.2 10.34 10.34 0 01-1.87-.57 10.15 10.15 0 01-1.72-.92A9.57 9.57 0 0183.26 238a10 10 0 01-2.74-9 10.58 10.58 0 01.57-1.87 10 10 0 015.41-5.41 10.34 10.34 0 011.87-.57 9.9 9.9 0 013.91 0 10.1 10.1 0 011.87.57 10.24 10.24 0 011.73.92 10.75 10.75 0 011.52 1.25 9.57 9.57 0 011.24 1.52 10.15 10.15 0 01.92 1.72 10.58 10.58 0 01.57 1.87 9.95 9.95 0 01-4.25 10.27 10.24 10.24 0 01-1.73.92 10.1 10.1 0 01-1.87.57A9.85 9.85 0 0190.33 240.9zM50.16 321.22a10 10 0 01-7.07-2.93 9.57 9.57 0 01-1.24-1.52 10 10 0 01-1.49-3.59 9.66 9.66 0 010-3.91 10.1 10.1 0 01.57-1.87 10.63 10.63 0 01.92-1.73 10 10 0 011.24-1.52 9.57 9.57 0 011.52-1.24 9.87 9.87 0 011.73-.92 10.1 10.1 0 011.87-.57 9.9 9.9 0 013.91 0A10.58 10.58 0 0154 302a10.15 10.15 0 011.72.92 9.57 9.57 0 011.52 1.24 10.11 10.11 0 011.25 1.52 10.63 10.63 0 01.92 1.73 10.1 10.1 0 01.57 1.87 10.15 10.15 0 010 3.91 10 10 0 01-1.49 3.59 10.14 10.14 0 01-2.77 2.77 10.15 10.15 0 01-1.72.92 10.58 10.58 0 01-1.87.57A10 10 0 0150.16 321.22zM90.33 341.31a10 10 0 01-2-.2 10.58 10.58 0 01-1.87-.57 10.15 10.15 0 01-1.72-.92 9.57 9.57 0 01-1.52-1.24A10.11 10.11 0 0182 336.86a10.63 10.63 0 01-.92-1.73 10.1 10.1 0 01-.57-1.87 10.15 10.15 0 010-3.91 10.1 10.1 0 01.57-1.87 10.63 10.63 0 01.92-1.73 10.11 10.11 0 011.25-1.52A9.57 9.57 0 0184.78 323a10 10 0 013.59-1.49 9.9 9.9 0 013.91 0 10.1 10.1 0 011.87.57 10.24 10.24 0 011.73.92 9.57 9.57 0 011.52 1.24 10 10 0 011.24 1.52 10.63 10.63 0 01.92 1.73 10.1 10.1 0 01.57 1.87 9.66 9.66 0 010 3.91 10.1 10.1 0 01-.57 1.87 10.63 10.63 0 01-.92 1.73 9.72 9.72 0 01-2.76 2.76 10.24 10.24 0 01-1.73.92 10.1 10.1 0 01-1.87.57A9.85 9.85 0 0190.33 341.31zM50.16 421.63a9.84 9.84 0 01-1.95-.19 10.1 10.1 0 01-1.87-.57 9.87 9.87 0 01-1.73-.92 10.21 10.21 0 01-1.52-1.25 9.57 9.57 0 01-1.24-1.52 10.15 10.15 0 01-.92-1.72 10.58 10.58 0 01-.57-1.87 10 10 0 01-.2-2 9.85 9.85 0 01.2-1.95 10.1 10.1 0 01.57-1.87 9.87 9.87 0 01.92-1.73 9.72 9.72 0 012.76-2.76 9.87 9.87 0 011.73-.92 10.1 10.1 0 011.87-.57 9.9 9.9 0 013.91 0 10.58 10.58 0 011.87.57 10.15 10.15 0 011.72.92 9.57 9.57 0 011.52 1.24 10.21 10.21 0 011.25 1.52 9.87 9.87 0 01.92 1.73 10.1 10.1 0 01.57 1.87 9.84 9.84 0 01.19 1.95 10 10 0 01-.19 2 10.58 10.58 0 01-.57 1.87A10 10 0 0154 420.87a10.58 10.58 0 01-1.87.57A10 10 0 0150.16 421.63zM90.33 441.71a9.94 9.94 0 01-2-.19A10 10 0 0184.78 440a10 10 0 01-3.69-4.49 10.1 10.1 0 01-.57-1.87 9.94 9.94 0 01-.19-2 9.84 9.84 0 01.19-1.95 10.1 10.1 0 01.57-1.87 9.87 9.87 0 01.92-1.73 10.15 10.15 0 011.24-1.52 10 10 0 013.25-2.16 10.1 10.1 0 011.87-.57 9.9 9.9 0 013.91 0 10.1 10.1 0 011.87.57 9.87 9.87 0 011.73.92 9.57 9.57 0 011.52 1.24 10 10 0 011.24 1.52 9.87 9.87 0 01.92 1.73 10.1 10.1 0 01.57 1.87 9.85 9.85 0 01.2 1.95 10 10 0 01-.2 2 10 10 0 01-1.49 3.59 9.57 9.57 0 01-1.24 1.52A10 10 0 0190.33 441.71z"></path>
        </g>
    </svg>
);

export const BackArrowIcon = (props: IconProps) => (
    // <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Go back"}
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
    >
        <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
        <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
    </svg>
);

export const AndroidIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 24"
        id="android"
        fill="currentColor"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Setup"}
        className={props.className}
        onClick={props.onClick}
    >
        <path d="m7.11 5.12c.311 0 .562-.252.562-.562s-.252-.562-.562-.562c-.003 0-.006 0-.01 0-.15 0-.285.064-.379.165-.098.103-.159.243-.159.397s.06.294.159.397c.095.102.23.166.38.166h.011-.001zm6.087 0h.01c.15 0 .285-.064.379-.165.098-.103.159-.243.159-.397s-.06-.294-.159-.397c-.095-.102-.23-.166-.38-.166-.004 0-.007 0-.011 0h.001c-.311 0-.562.252-.562.562s.252.562.562.562zm-11.711 2.654c.811.004 1.468.66 1.471 1.471v6.202.028c0 .4-.163.763-.426 1.025-.257.267-.617.433-1.017.433-.01 0-.02 0-.031 0h.002c-.002 0-.005 0-.008 0-.816 0-1.478-.662-1.478-1.478 0-.003 0-.005 0-.008v-6.202c0-.006 0-.014 0-.021 0-.4.166-.761.433-1.019.26-.266.623-.431 1.025-.431h.029-.001zm15.288.274v9.606.029c0 .429-.177.818-.462 1.096-.276.285-.662.462-1.089.462-.008 0-.015 0-.023 0h.001-1.082v3.274c0 .82-.665 1.486-1.486 1.486s-1.486-.665-1.486-1.486v-3.274h-1.99v3.274.008c0 .816-.662 1.478-1.478 1.478-.003 0-.006 0-.008 0-.006 0-.014 0-.021 0-.4 0-.761-.166-1.019-.433-.267-.261-.433-.624-.433-1.026 0-.009 0-.019 0-.028v.001l-.014-3.274h-1.066c-.003 0-.007 0-.01 0-.87 0-1.576-.706-1.576-1.576 0-.004 0-.007 0-.011v.001-9.606zm-3.346-5.84c1.017.52 1.85 1.272 2.452 2.19l.015.024c.579.866.923 1.932.923 3.077v.032-.002h-13.342c0-.009 0-.02 0-.031 0-1.146.345-2.211.936-3.098l-.013.02c.619-.944 1.457-1.696 2.444-2.197l.036-.017-1.024-1.89c-.025-.032-.04-.072-.04-.116 0-.076.045-.142.11-.172h.001c.03-.019.067-.031.107-.031.08 0 .15.048.182.116l.001.001 1.04 1.904c.854-.383 1.85-.606 2.899-.606s2.045.223 2.945.624l-.046-.018 1.04-1.904c.032-.07.102-.117.182-.117.04 0 .076.012.108.031h-.001c.066.03.112.096.112.173 0 .044-.015.084-.04.116zm6.88 7.04v6.202.008c0 .816-.662 1.478-1.478 1.478-.003 0-.006 0-.008 0-.006 0-.014 0-.021 0-.4 0-.761-.166-1.019-.433-.267-.261-.433-.624-.433-1.026 0-.009 0-.019 0-.028v.001-6.202c0-.009 0-.019 0-.029 0-.399.166-.76.433-1.016.259-.263.619-.426 1.017-.426h.024-.001.028c.4 0 .763.163 1.025.426.267.257.433.617.433 1.017v.027-.001z"></path>
    </svg>
);

export const AdDataIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM229.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7L253.2 328H162.8l-5.4 10.7c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zM208 237.7L186.8 280h42.3L208 237.7zM392 256a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm24-43.9V184c0-13.3 10.7-24 24-24s24 10.7 24 24v96 48c0 13.3-10.7 24-24 24c-6.6 0-12.6-2.7-17-7c-9.4 4.5-19.9 7-31 7c-39.8 0-72-32.2-72-72s32.2-72 72-72c8.4 0 16.5 1.4 24 4.1z" />
    </svg>
);

export const ProductDownloadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20.02 25"
        x="0px"
        y="0px"
        fill="currentColor"
    >
        <g data-name="Layer 2">
            <g data-name="Layer 1">
                <g>
                    <path d="M10,7.79a1,1,0,0,0-1,1V12.7L7.66,11.55a1,1,0,1,0-1.3,1.51l3,2.59a1,1,0,0,0,.66.25,1,1,0,0,0,.65-.24l3-2.59a1,1,0,0,0-1.3-1.52L11,12.73V8.79A1,1,0,0,0,10,7.79Z" />
                    <path d="M20,4.91a.93.93,0,0,0-.21-.6l-3-3.92A1,1,0,0,0,16,0H4a1,1,0,0,0-.79.39L.21,4.3A1,1,0,0,0,0,4.91V8.57a1,1,0,0,0,2,0V5.91H18V16.54A1.46,1.46,0,0,1,16.56,18H3.47A1.46,1.46,0,0,1,2,16.54V12a1,1,0,0,0-2,0v4.55A3.46,3.46,0,0,0,3.47,20H16.56A3.46,3.46,0,0,0,20,16.54ZM4.51,2h11L17,3.91H3Z" />
                </g>
            </g>
        </g>
    </svg>
);

export const SyncChannelIcon = (props: IconProps) => (
    //ratio 4/5
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 80 100"
        fill="currentColor"
        overflow={"visible"}
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Sync"}
    >
        <g transform="translate(0,-960.36218)">
            <path
                d="m 21,968.36217 c -9.3834,0 -17,7.6166 -17,17 l 0,22.00003 c 0,9.3834 7.6166,17 17,17 l 40.4062,0 c -0.2743,-1.2855 -0.4062,-2.6326 -0.4062,-4 l -40,0 c -7.2366,0 -13,-5.7634 -13,-13 l 0,-22.00003 c 0,-7.23659 5.7634,-13 13,-13 l 46,0 c 7.2366,0 13,5.76341 13,13 l 0,16.00003 c 1.3674,0 2.7145,0.1318 4,0.4062 l 0,-16.40623 c 0,-9.3834 -7.6166,-17 -17,-17 z m 16.0625,17 0,22.21873 c 0.1174,1.3826 1.8144,2.3106 2.9375,1.5938 l 17.9688,-11.00001 c 1.2019,-0.7097 1.2019,-2.91529 0,-3.62502 l -17.9688,-11 c -1.5185,-0.45546 -2.963,0.63707 -2.9375,1.8125 z m 3.875,3.5625 12.125,7.4375 -12.125,7.43753 z m 38.875,15.43753 c -8.6527,-10e-5 -15.8125,6.6707 -15.8125,15 -0.015,1.0566 0.9432,2 2,2 1.0567,0 2.0149,-0.9434 2,-2 0,-6.0301 5.1924,-11 11.8125,-11 4.1853,0 7.5482,2.0316 9.6563,5 l -1.4688,0 c -1.1046,0 -2,0.8954 -2,2 0,1.1046 0.8954,2 2,2 l 6,0 c 1.1046,0 2,-0.8954 2,-2 l 0,-6 c 0,-1.1045 -0.8954,-2 -2,-2 -1.1046,0 -1.9732,0.8958 -2,2 l -0.031,0.6562 c -2.9037,-3.4149 -7.3128,-5.6562 -12.1565,-5.6562 z m 14.1875,15 c -1.0568,0 -2.015,0.9434 -2,2 0,6.0301 -5.1925,11 -11.8125,11 -4.1854,0 -7.548,-2.0316 -9.6563,-5 l 1.4688,0 c 1.1045,0 2,-0.8954 2,-2 0,-1.1046 -0.8955,-2 -2,-2 l -6,0 c -1.1046,0 -2,0.8954 -2,2 l 0,6 c 0,1.1045 0.8954,2 2,2 1.1046,0 1.9732,-0.8958 2,-2 l 0.031,-0.6563 c 2.9033,3.415 7.3126,5.6563 12.1563,5.6563 8.6526,10e-5 15.8125,-6.6707 15.8125,-15 0.015,-1.0566 -0.9433,-2 -2,-2 z"
                fillOpacity="1"
                stroke="none"
                visibility="visible"
                display="inline"
                overflow="visible"
            />
        </g>
    </svg>
);

export const CreativeDownloadIcon = () => (
    //32,40
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 30"
        x="0px"
        y="0px"
        fill="currentColor"
        overflow={"visible"}
    >
        <g data-name="04 video download">
            <path d="M24,16.08V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V21a3,3,0,0,0,3,3H16.08A7,7,0,1,0,24,16.08ZM4,21V5A1,1,0,0,1,5,4H21a1,1,0,0,1,1,1V16.08A7,7,0,0,0,16.08,22H5A1,1,0,0,1,4,21Zm19,7a5,5,0,1,1,5-5A5,5,0,0,1,23,28ZM17.45,13.89a1,1,0,0,0,0-1.78l-8-4A1,1,0,0,0,8,9v8a1,1,0,0,0,.47.85A1,1,0,0,0,9,18a1,1,0,0,0,.45-.11ZM10,10.62,14.76,13,10,15.38ZM25.71,22.79a1,1,0,0,1,0,1.42l-2,2a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42l.29.3V20.5a1,1,0,0,1,2,0v2.59l.29-.3A1,1,0,0,1,25.71,22.79Z" />
        </g>
    </svg>
);

export const CreativeUploadIcon = () => (
    //32,40
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 30"
        x="0px"
        y="0px"
        fill="currentColor"
        overflow={"visible"}
    >
        <g data-name="05 video upload">
            <path d="M24,16.08V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V21a3,3,0,0,0,3,3H16.08A7,7,0,1,0,24,16.08ZM4,21V5A1,1,0,0,1,5,4H21a1,1,0,0,1,1,1V16.08A7,7,0,0,0,16.08,22H5A1,1,0,0,1,4,21Zm19,7a5,5,0,1,1,5-5A5,5,0,0,1,23,28ZM17.45,13.89a1,1,0,0,0,0-1.78l-8-4A1,1,0,0,0,8,9v8a1,1,0,0,0,.47.85A1,1,0,0,0,9,18a1,1,0,0,0,.45-.11ZM10,10.62,14.76,13,10,15.38ZM25.71,21.79a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-.29-.3V25.5a1,1,0,0,1-2,0V22.91l-.29.3a1,1,0,0,1-1.42-1.42l2-2a1,1,0,0,1,1.42,0Z" />
        </g>
    </svg>
);

export const DownloadIcon = (props: IconProps) => (
    <svg
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Download"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
    </svg>
);

export const UploadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
    </svg>
);

export const Spinner = (props: IconProps) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
            (props.className || "") +
            " text-gray-500 animate-spin fill-green-500"
        }
    >
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
        />
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
        />
    </svg>
);

export const AdlyticsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z" />
    </svg>
);

export const CreativesIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
    </svg>
);

export const CalendarIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={props.className}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
    </svg>
);

export const ThumbsIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className={props.className}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
    </svg>
);

export const SnowflakeIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={props.className}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Auto approved"}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M224 0c17.7 0 32 14.3 32 32V62.1l15-15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-49 49v70.3l61.4-35.8 17.7-66.1c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4l-5.2 19.3 23.6-13.8c15.3-8.9 34.9-3.7 43.8 11.5s3.8 34.9-11.5 43.8l-25.3 14.8 21.7 5.8c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-67.7-18.1L287.5 256l60.9 35.5 67.7-18.1c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4l-21.7 5.8 25.3 14.8c15.3 8.9 20.4 28.5 11.5 43.8s-28.5 20.4-43.8 11.5l-23.6-13.8 5.2 19.3c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-17.7-66.1L256 311.7v70.3l49 49c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V449.9l-15 15c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l49-49V311.7l-61.4 35.8-17.7 66.1c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4l5.2-19.3L48.1 395.6c-15.3 8.9-34.9 3.7-43.8-11.5s-3.7-34.9 11.5-43.8l25.3-14.8-21.7-5.8c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l67.7 18.1L160.5 256 99.6 220.5 31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4l21.7-5.8L15.9 171.6C.6 162.7-4.5 143.1 4.4 127.9s28.5-20.4 43.8-11.5l23.6 13.8-5.2-19.3c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l17.7 66.1L192 200.3V129.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l15 15V32c0-17.7 14.3-32 32-32z" />
    </svg>
);

export const OverAllIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M576 0c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM352 224V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32zM96 416v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
    </svg>
);

export const TrashIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Remove"}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
    </svg>
);

export const MobileSdkIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        className={props.className}
        data-tooltip-id="my-tooltip"
        onClick={props.onClick}
        data-tooltip-content={props.toolTipContent || "Sdk"}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z" />
    </svg>
);

export const BellIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Notify"}
    >
        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
        <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
    </svg>
);

export const RotateIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Rotate"}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
    </svg>
);

export const LifeRing = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Sync"}
    >
        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
        <path d="M385.1 419.1C349.7 447.2 304.8 464 256 464s-93.7-16.8-129.1-44.9l80.4-80.4c14.3 8.4 31 13.3 48.8 13.3s34.5-4.8 48.8-13.3l80.4 80.4zm68.1 .2C489.9 374.9 512 318.1 512 256s-22.1-118.9-58.8-163.3L465 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L419.3 58.8C374.9 22.1 318.1 0 256 0S137.1 22.1 92.7 58.8L81 47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L58.8 92.7C22.1 137.1 0 193.9 0 256s22.1 118.9 58.8 163.3L47 431c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l11.8-11.8C137.1 489.9 193.9 512 256 512s118.9-22.1 163.3-58.8L431 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-11.8-11.8zm-34.1-34.1l-80.4-80.4c8.4-14.3 13.3-31 13.3-48.8s-4.8-34.5-13.3-48.8l80.4-80.4C447.2 162.3 464 207.2 464 256s-16.8 93.7-44.9 129.1zM385.1 92.9l-80.4 80.4c-14.3-8.4-31-13.3-48.8-13.3s-34.5 4.8-48.8 13.3L126.9 92.9C162.3 64.8 207.2 48 256 48s93.7 16.8 129.1 44.9zM173.3 304.8L92.9 385.1C64.8 349.7 48 304.8 48 256s16.8-93.7 44.9-129.1l80.4 80.4c-8.4 14.3-13.3 31-13.3 48.8s4.8 34.5 13.3 48.8zM208 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
    </svg>
);

export const KeyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
    </svg>
);

export const SolidCaratDown = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        className={props.className}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
    </svg>
);

export const SolidCaratNext = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Next"}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
    </svg>
);

export const GoogleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
        fill="currentColor"
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
);

export const InfoIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={props.toolTipContent || "Info"}
        className={props.className}
        onClick={props.onClick}
    >
        {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
    </svg>
);

export const YoutubeIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
        className={props.className}
        onClick={props.onClick}
    >
        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
    </svg>
);
