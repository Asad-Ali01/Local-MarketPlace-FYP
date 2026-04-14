import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function HeroSection() {
  const items = ["AC Repair,", "Solar installation,", "Home cleaning,"];
  const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500)

    return () => clearInterval(interval);
  }, [items.length])

  return (
    <div className='h-screen bg-linear-to-br from-blue-900 via-blue-900 to-orange-50'>
        {/* Top heading */}
      <div className='text-center'>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="text-3xl font-bold"
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
        <h2  className="text-3xl font-bold">Made easy</h2>
      </div>

    </div>
  )
}

export default HeroSection