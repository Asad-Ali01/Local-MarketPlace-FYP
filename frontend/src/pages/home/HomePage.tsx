import HeroStats from '@/components/home/HeroStats';
import HomeCategory from '@/components/home/HomeCategory';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HeroSearchSection from '@/components/home/HomeSearchSection';

function HomePage() {
  return (
    <div className="">
      <HeroSearchSection />
      <HomeHeroSection />
      <HomeCategory />
      <HeroStats />
    </div>
  );
}

export default HomePage;
