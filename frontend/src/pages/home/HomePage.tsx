import HeroStats from '@/components/home/HeroStats';
import HomeCategory from '@/components/home/HomeCategory';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HeroSearchSection from '@/components/home/HomeSearchSection';
import AboutSection from '@/components/about/AboutSection';
import ContactSection from '@/components/contact/ContactSection';
import {ErrorBoundary}  from '@/components/shared/ErrorBoundary';
function HomePage() {
  return (
    <div>
      <section id="/">
      <ErrorBoundary fallback={<h1>Search loading failed</h1>}>

        <HeroSearchSection />
      </ErrorBoundary>
        <HomeHeroSection />
      </section>
      <HomeCategory />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;
