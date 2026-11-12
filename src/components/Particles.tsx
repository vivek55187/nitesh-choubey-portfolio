import { useEffect, useRef } from 'react'

/**
 * Restrained constellation of gold points drifting slowly, with faint links
 * between near neighbours and gentle depth-based parallax to the pointer.
 * Pauses off-screen and when the tab is hidden; static under reduced motion.
 */
export default function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      running = true
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    type P = { x: number; y: number; z: number; vx: number; vy: number }
    let pts: P[] = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, (w * h) / 22000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      const pos = pts.map((p) => ({ x: p.x + mouse.x * 26 * p.z, y: p.y + mouse.y * 26 * p.z, z: p.z }))
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[i].x - pos[j].x
          const dy = pos[i].y - pos[j].y
          const d = Math.hypot(dx, dy)
          if (d < 130) {
            ctx.strokeStyle = `rgba(197,164,109,${(1 - d / 130) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(pos[i].x, pos[i].y)
            ctx.lineTo(pos[j].x, pos[j].y)
            ctx.stroke()
          }
        }
      }
      for (const p of pos) {
        ctx.fillStyle = `rgba(197,164,109,${0.25 + p.z * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.6 + p.z * 1.1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20
      }
      draw()
      if (running) raf = requestAnimationFrame(tick)
    }

    resize()
    if (reduced) draw()
    else raf = requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting && !document.hidden
      if (vis && !running && !reduced) {
        running = true
        raf = requestAnimationFrame(tick)
      } else if (!vis) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw()
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
