import { Input } from 'antd';
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function HeroSearchSection() {
  const { Search } = Input;
  const items = ["AC Repair,", "Solar installation,", "Home cleaning,"];
  const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500)

    return () => clearInterval(interval);
  }, [items.length])

  return (
    <div id='search-provider' className='h-40'>
        {/* Top heading */}
      <div  className={`text-center text-2xl font-bold  text-white dark:text-black`}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
        <h2  >Made easy</h2>
      </div>

      {/* Search bar */}
      <div  className='mx-auto mt-8 w-full max-w-xl px-4 '>
        <Search
          placeholder='Search services'
          enterButton='Search'
          size='large'
          allowClear
          onSearch={(value) => console.log('Search:', value)}     
        />
      </div>
    </div>
  )
}

export default HeroSearchSection