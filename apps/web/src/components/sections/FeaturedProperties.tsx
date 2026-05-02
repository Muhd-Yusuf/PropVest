'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { PropertyCard } from '../ui/PropertyCard';
import { Button } from '../ui/Button';
import { properties } from '@/lib/data';

export function FeaturedProperties() {
  return (
    <SectionWrapper id="featured-properties" className="bg-bg-secondary">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            Explore Properties
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Properties available for investment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {properties.slice(0, 3).map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" href="#cta">
            View All Properties
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
