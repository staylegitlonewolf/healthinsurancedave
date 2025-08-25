import React, { useEffect, useRef, useCallback } from 'react'
import './FloatingParticles.css'

const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])

  // Particle class with enhanced features
  class Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
    pulse: number
    pulseSpeed: number
    connectionCount: number

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.3
      this.vy = (Math.random() - 0.5) * 0.3
      this.size = Math.random() * 3 + 1
      this.opacity = Math.random() * 0.6 + 0.2
      this.pulse = Math.random() * Math.PI * 2
      this.pulseSpeed = Math.random() * 0.02 + 0.01
      this.connectionCount = 0
      
      // Theme-aware colors
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const baseColor = isDark ? [100, 200, 255] : [0, 150, 255]
      this.color = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${this.opacity})`
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.vx
      this.y += this.vy
      this.pulse += this.pulseSpeed

      // Wrap around edges with smooth transition
      if (this.x < -10) this.x = canvas.width + 10
      if (this.x > canvas.width + 10) this.x = -10
      if (this.y < -10) this.y = canvas.height + 10
      if (this.y > canvas.height + 10) this.y = -10

      // Subtle size pulsing
      this.size = Math.sin(this.pulse) * 0.5 + 2
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
      
      // Add subtle glow effect
      ctx.shadowColor = this.color
      ctx.shadowBlur = 5
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  const createParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000))
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas))
    }
    
    return particles
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    const baseColor = isDark ? [100, 200, 255] : [0, 150, 255]

    // Update and draw particles
    particles.forEach(particle => {
      particle.update(canvas)
      particle.draw(ctx)
      particle.connectionCount = 0
    })

    // Draw connections with improved algorithm
    const maxConnections = 3
    const connectionDistance = 120

    particles.forEach((particle, i) => {
      if (particle.connectionCount >= maxConnections) return

      particles.slice(i + 1).forEach(otherParticle => {
        if (otherParticle.connectionCount >= maxConnections) return

        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = 0.15 * (1 - distance / connectionDistance)
          
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()

          particle.connectionCount++
          otherParticle.connectionCount++
        }
      })
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()
    particlesRef.current = createParticles(canvas)
    animate()

    const handleResize = () => {
      resizeCanvas()
      particlesRef.current = createParticles(canvas)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resizeCanvas, createParticles, animate])

  // Handle theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const baseColor = isDark ? [100, 200, 255] : [0, 150, 255]

      particlesRef.current.forEach(particle => {
        particle.color = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${particle.opacity})`
      })
    }

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="floating-particles"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}

export default FloatingParticles
