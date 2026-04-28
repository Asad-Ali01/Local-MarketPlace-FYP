import HomeHeroSection from '../components/HomeHeroSection'
import HeroSearchSection from '../components/HomeSearchSection'
import HomeCategory from '../components/HomeCategory'
import HeroStats from '../components/HeroStats'

function HomePage() {
  return (
    <div className='bg-linear-to-br p-5 text-white from-purple-900 via-indigo-900 to-pink-900  dark:from-gray-900 dark:via-slate-900 dark:to-black'>
    <HeroSearchSection/>
    <HomeHeroSection/>
    <HomeCategory/>
    <HeroStats/>
    </div>
  )
}

export default HomePage