import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HotspotMap from './components/HotspotMap'
import Footer from './components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    // No-op: reserved for future gsap scroll triggers if needed
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-400/40 selection:text-white">
      <Navbar />
      <motion.main style={{ scale, opacity }}>
        <Hero />
        <HotspotMap />
        <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-2xl font-semibold mb-3">How it works</h3>
                <p className="text-white/80">
                  We aggregate satellite data, drift models, and community reports to pinpoint large-scale plastic accumulations.
                  Fleet partners receive mission packs with optimal routes, weather windows, and predicted yield.
                </p>
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-2xl font-semibold mb-3">Open, interoperable, transparent</h3>
                <p className="text-white/80">
                  Our API exposes hotspot data for scientists and partners. Every cleanup is logged with timestamped evidence,
                  enabling trust and accountability.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer />
      </motion.main>
    </div>
  )
}

export default App
