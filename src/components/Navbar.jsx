import { motion } from 'framer-motion'
import { Menu, Recycle, Globe2 } from 'lucide-react'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl/50 bg-white/10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
            <Globe2 size={20} />
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">OceanSweep</p>
            <p className="text-xs text-white/70 -mt-1">Clean Oceans. Smart Data.</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-white/80">
          <a href="#map" className="hover:text-white transition-colors">Hotspots</a>
          <a href="#stats" className="hover:text-white transition-colors">Impact</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#map" className="hidden sm:inline-flex px-4 py-2 rounded-full bg-white text-slate-900 font-semibold hover:scale-105 active:scale-95 transition" aria-label="View hotspots">
            View Hotspots
          </a>
          <button className="md:hidden p-2 rounded-lg bg-white/10 text-white border border-white/20" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
