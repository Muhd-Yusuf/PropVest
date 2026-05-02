import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Button } from '../ui/Button';

export function CTASection() {
  return (
    <SectionWrapper
      id="cta"
      className="bg-gradient-to-br from-midnight to-midnight-light relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald/10 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Start your real estate journey today
          </h2>
          <p className="text-base sm:text-lg text-white/50 mt-3 sm:mt-4 leading-relaxed">
            Join 1,200+ investors earning returns from Nigerian properties. Start with as little as ₦100,000.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <Button size="lg" href="#">
              Download the App
            </Button>
            <Button variant="outline-light" size="lg" href="#">
              Create Account
            </Button>
          </div>

          <p className="text-xs text-white/30 mt-8">
            Available on iOS and Android. No minimum commitment.
          </p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
