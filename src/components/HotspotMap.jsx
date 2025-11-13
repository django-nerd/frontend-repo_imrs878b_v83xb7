import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, AlertTriangle, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HotspotMap() {
  const [hotspots, setHotspots] = useState([])
  const [loading, setLoading] = useState(true)
  const mapRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/hotspots`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length === 0) {
          // Seed if empty
          fetch(`${API_BASE}/api/seed-hotspots`, { method: 'POST' })
            .then(() => fetch(`${API_BASE}/api/hotspots`))
            .then(res => res.json())
            .then(setHotspots)
            .finally(() => setLoading(false))
        } else {
          setHotspots(data)
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="map" className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Global Trash Hotspots</h2>
            <p className="text-white/70 mt-2">Live map of high-density plastic accumulation zones</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-white/5"
          >
            <div className="aspect-[16/9] w-full bg-slate-900 relative">
              {/* Simple map projection using SVG world map path approximation */}
              <svg viewBox="0 0 2000 1000" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="ocean" cx="50%" cy="50%" r="75%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
                  </radialGradient>
                </defs>
                <rect width="2000" height="1000" fill="url(#ocean)" />
                {hotspots.map((h, i) => {
                  // Equirectangular projection
                  const x = ((h.longitude + 180) / 360) * 2000
                  const y = ((90 - h.latitude) / 180) * 1000
                  const sev = h.severity || 'medium'
                  const color = sev === 'critical' ? '#ef4444' : sev === 'high' ? '#f59e0b' : sev === 'medium' ? '#22c55e' : '#38bdf8'
                  const size = Math.min(40, 10 + Math.sqrt(h.area_km2 || 1000) / 20)
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r={size} fill={color} fillOpacity="0.35">
                        <title>{h.name}</title>
                      </circle>
                      <circle cx={x} cy={y} r={Math.max(6, size * 0.35)} fill={color} />
                    </g>
                  )
                })}
              </svg>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-3 text-white/80 bg-black/30 px-4 py-2 rounded-full border border-white/10">
                    <Loader2 className="animate-spin" size={18} /> Loading hotspots
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <h3 className="text-white font-semibold mb-4">Top Hotspots</h3>
            <div className="space-y-3">
              {hotspots.map((h, i) => (
                <div key={h.name + i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{h.name}</p>
                      <p className="text-white/60 text-xs">{h.latitude.toFixed(2)}°, {h.longitude.toFixed(2)}° • {h.severity}</p>
                    </div>
                    <div className="text-white/80 text-right">
                      <p className="text-sm">Density</p>
                      <p className="text-lg font-semibold">{h.density.toLocaleString()} kg/km²</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
