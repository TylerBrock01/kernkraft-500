'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// A diferencia del layout, el template se remonta en cada navegación: la animación corre en cada página.
export default function DashboardTemplate({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-full"
        >
            {children}
        </motion.div>
    );
}