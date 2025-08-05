import { useMemo } from "react"
import { useLocation } from "react-router-dom"

export const usePathname = () => {
    const location = useLocation()

    const pathname = useMemo(() => {
        if (location.pathname.endsWith("/")) {
            return location.pathname.slice(0, -1)
        }

        return location.pathname
    }, [location.pathname])


    return pathname
}