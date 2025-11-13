import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Waves, Sparkles } from 'lucide-react'
import gsap from 'gsap'

export default function Hero() {
  const headlineRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(headlineRef.current?.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1 })
    tl.fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
  }, [])

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div ref={headlineRef} className="max-w-2xl">
          <motion.h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Clean the oceans with data-driven action
          </motion.h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80">
            OceanSweep maps plastic hotspots in real-time and coordinates cleanup missions with precision and impact.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#map" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-slate-900 font-semibold hover:scale-[1.02] active:scale-95 transition">
              Explore Hotspots <ArrowRight size={18} />
            </a>
            <a href="#about" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:scale-[1.02] active:scale-95 transition">
              Learn More <Sparkles size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div ref={statsRef} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'kg collected', value: '2.4M+' },
            { label: 'active hotspots', value: '128' },
            { label: 'missions', value: '5,310' },
            { label: 'partners', value: '72' },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-white/70 text-xs uppercase tracking-wider">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[160%] h-64 pointer-events-none opacity-50" aria-hidden>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-emerald-500/20">
          <path d="M0,0V46.29c47.79,22.2,103.59,29,158,17C230.32,49.76,284.44,18.16,339,6c54-12.35,104.79,1.31,158,17,56,16.61,112,33.23,168,22,59.42-12.16,113.43-48.49,172-58,30-5,59-3.33,88,1v-6Z"></path>
        </svg>
      </div>
    </section>
  )
}
