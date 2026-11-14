import HomeHero from "../components/home/HomeHero";
import HospitalNetwork from "../components/home/HospitalNetwork";
import QuickAccess from "../components/home/QuickAccess";
import { ButtonStyles } from "../components/ui/Button";
import { NavigationCardStyles } from "../components/ui/NavigationCard";
import { SectionHeadingStyles } from "../components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <div className="home-page">
        <HomeHero />
        <QuickAccess />
        <HospitalNetwork />
      </div>

      <ButtonStyles />
      <SectionHeadingStyles />
      <NavigationCardStyles />

      <style>{`
        .home-page {
          width: min(1180px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.5rem, 4vw, 3.5rem);
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 5vw, 4rem);
        }

        @media (max-width: 760px) {
          .home-page {
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .home-page {
            width: calc(100% - 1.25rem);
            padding-block: 1rem 2rem;
          }
        }
      `}</style>
    </>
  );
}