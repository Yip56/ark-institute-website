import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Intersection observer for scroll animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )

    const observe = (root) => {
      root.querySelectorAll('.fade-up, .fade-in').forEach(el => io.observe(el))
    }

    observe(document)

    // Watch for elements added after async auth/data resolution
    const mo = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return
          if (node.matches?.('.fade-up, .fade-in')) io.observe(node)
          observe(node)
        })
      })
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [pathname])

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
