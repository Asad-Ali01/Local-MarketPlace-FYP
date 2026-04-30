import HomeHeroSection from '../components/HomeHeroSection'
import HeroSearchSection from '../components/HomeSearchSection'
import HomeCategory from '../components/HomeCategory'
import HeroStats from '../components/HeroStats'

function HomePage() {
  return (
    <div className=''>
    <HeroSearchSection/>
    <HomeHeroSection/>
    <HomeCategory/>
    <HeroStats/>
    </div>
  )
}

export default HomePage