// hooks/useHasHydrated.ts
"use client"
import { useState, useEffect } from "react";

export default function useHasHydrated() {
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
}