import HeroStats from '@/components/home/HeroStats';
import HomeCategory from '@/components/home/HomeCategory';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HeroSearchSection from '@/components/home/HomeSearchSection';
import AboutSection from '@/components/about/AboutSection';
import ContactSection from '@/components/contact/ContactSection';

function HomePage() {
  return (
    <div>
      <section id="/">
        <HeroSearchSection />
        <HomeHeroSection />
      </section>
      <HomeCategory />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;
