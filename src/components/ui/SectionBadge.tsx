'use client';

import { motion } from 'framer-motion';
import { type TablerIcon } from '@tabler/icons-react';

interface SectionBadgeProps {
  icon?: TablerIcon;
  text: string;
  className?: string;
}

export default function SectionBadge({ icon: Icon, text, className = '' }: SectionBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-foreground text-sm font-semibold ${className}`}
    >
      {Icon && <Icon size={18} stroke={2} />}
      {text}
    </motion.span>
  );
}
