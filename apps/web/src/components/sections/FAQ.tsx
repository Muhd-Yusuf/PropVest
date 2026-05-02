import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Accordion } from '../ui/Accordion';
import { faqs } from '@/lib/data';

export function FAQ() {
  return (
    <SectionWrapper id="faq">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div>
            {faqs.map((faq, idx) => (
              <Accordion key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
