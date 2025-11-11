// Logo.tsx
import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  // Build className to avoid hydration issues
  const finalClassName = ['inline-block', className].filter(Boolean).join(' ');

  return (
    <motion.div
      className={finalClassName}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Image
        src="/images/logo.png"
        alt="ACT Coaching for Life logo"
        width={size * 6}
        height={size}
        className="select-none"
      />
    </motion.div>
  );
}