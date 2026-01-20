import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Logo path - replace with your actual logo
const LOGO_PATH = "/logo.png";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-4"
    >
      <Link to="/" className="flex items-center group">
        {/* Logo */}
        <img 
          src={LOGO_PATH} 
          alt="LinkLian" 
          className="h-10 object-contain transition-transform duration-300 group-hover:scale-105"
        />
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
