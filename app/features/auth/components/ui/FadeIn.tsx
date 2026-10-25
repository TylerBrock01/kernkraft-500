'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}