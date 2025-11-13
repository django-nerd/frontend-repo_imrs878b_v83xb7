import { motion } from 'framer-motion'
import { Heart, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">OceanSweep • Protecting our oceans with data</p>
          <div className="flex items-center gap-6 text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="https://github.com" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
