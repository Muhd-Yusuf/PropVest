import { Container } from '../ui/Container';
import { CountUp } from '../ui/CountUp';

const stats = [
  { end: 450, prefix: '₦', suffix: 'M+', label: 'Assets Managed' },
  { end: 1200, suffix: '+', label: 'Active Investors' },
  { end: 12, label: 'Properties Listed' },
  { static: '100%', label: 'Transparent' },
];

export function SocialProof() {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-border-default">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-mono font-bold text-xl sm:text-2xl md:text-3xl text-text-primary">
                {stat.static ? (
                  stat.static
                ) : (
                  <CountUp
                    end={stat.end!}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </p>
              <p className="text-sm text-text-tertiary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
