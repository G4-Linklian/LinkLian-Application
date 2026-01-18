import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Logo path - replace with your actual logo
const LOGO_PATH = "/logo.png";

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 border-t border-border bg-card py-12"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
              <img 
                src={LOGO_PATH} 
                alt="LinkLian" 
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-foreground">LinkLian</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">ฟีเจอร์</a>
            <a href="#contact" className="hover:text-primary transition-colors">ติดต่อ</a>
            <a href="#" className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 LinkLian. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
