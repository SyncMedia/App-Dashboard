import { useEffect, useRef } from "react"
import { FilterState } from "./components/UniversalFilterBar"

export const LColors = [
    ["#3F5BF6", "#556DF7", "#6B7FF8", "#8291F9", "#99A3FA",
        "#AFB5FB", "#263FF5", "#1C35E1", "#142BCC", "#0C21B8",
        "#3A65FF", "#5477FF", "#6E89FF", "#889BFF", "#A2ADFF",
        "#C3C9FF", "#2D4AEF", "#233FDC", "#1935C9", "#0F2AB5",],

    ["#F43F5E", "#F65572", "#F86B86", "#FA819A", "#FB97AE",
        "#FDAEC2", "#E12C4B", "#CC2442", "#B81F3A", "#A41932",
        "#FF4968", "#FF637E", "#FF7D94", "#FF97AA", "#FFB1C0",
        "#FFC9D4", "#DC3552", "#C62E48", "#B0273F", "#9A2136",],

    ["#10B981", "#29C291", "#42CBA1", "#5BD4B1", "#74DDC1",
        "#8DE6D1", "#0DA673", "#0A9366", "#087F58", "#066C4B",
        "#33C895", "#4ED1A5", "#69DAB5", "#84E3C5", "#9FEDD5",
        "#B9F6E4", "#0EAB78", "#0C976A", "#0A835C", "#086F4E",],

    ["#F59E0B", "#F6AB29", "#F7B847", "#F8C565", "#F9D283",
        "#FAE0A1", "#E08F0A", "#CC8109", "#B77308", "#A26507",
        "#FFAA1C", "#FFB738", "#FFC454", "#FFD170", "#FFDE8C",
        "#FFEBAB", "#DB8A09", "#C77C08", "#B26E07", "#9D6106",],

    ["#64748B", "#73829A", "#8290A9", "#919EB8", "#A0ACC7",
        "#AFBAD6", "#59697E", "#4F5E71", "#455364", "#3B4857",
        "#70809B", "#7F8EAA", "#8E9CB9", "#9DAAC8", "#ACB8D7",
        "#BBC6E6", "#556175", "#4B5768", "#414D5B", "#37434E"],
]

export const SColors = ['#3F5BF6', '#F43F5E', '#10B981', '#F59E0B', '#64748B']

function areFiltersEqual(a?: FilterState[], b?: FilterState[]): boolean {
    if (!a || !b) return false
    if (a.length !== b.length) return false

    return a.every((fa, i) => {
        const fb = b[i]
        return (
            fa.metro === fb.metro &&
            fa.nccs === fb.nccs &&
            fa.gender === fb.gender &&
            fa.ageGroup === fb.ageGroup &&
            fa.dateRange.start.isSame(fb.dateRange.start, "day") &&
            fa.dateRange.end.isSame(fb.dateRange.end, "day")
        )
    })
}

export function useDeepCompareEffect(callback: React.EffectCallback, dependency: FilterState[]) {
    const prevDepRef = useRef<FilterState[]>()

    // Compare old vs new filters deeply
    const isSame = areFiltersEqual(prevDepRef.current, dependency)

    if (!isSame) {
        prevDepRef.current = dependency
    }

    useEffect(callback, prevDepRef.current)
}