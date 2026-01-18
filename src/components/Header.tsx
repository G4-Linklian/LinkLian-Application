import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-4"
    >
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative h-11 w-11 rounded-xl bg-primary flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <span className="text-primary-foreground font-bold text-xl">L</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <span className="text-2xl font-bold text-foreground">LinkLian</span>
      </Link>
      
      <Link
        to="/institution-register"
        className="btn-hero h-11 px-6 text-base"
      >
        ลงทะเบียน
      </Link>
    </motion.header>
  );
}
