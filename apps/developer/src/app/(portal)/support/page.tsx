'use client';

import { useState } from 'react';
import { Send, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const faqs = [
  { question: 'How do I list a property?', answer: 'Go to Properties → Add Property. Fill in your property details, financial terms, and upload documents. Once submitted, the PropVest team will review and approve your listing.' },
  { question: 'How are payouts calculated?', answer: 'For rental properties, payouts are calculated based on rent collected minus management and platform fees. The distributable amount is split proportionally among investors based on units held.' },
  { question: 'Can I change financial terms after listing?', answer: 'You can edit most property details while the property is in funding phase. Once fully funded, certain financial terms may be locked. Contact support for special requests.' },
  { question: 'How do I track my investors?', answer: 'Visit the Investors page to see all investors across your properties. You can filter by property and search by name or email.' },
  { question: 'What documents are required?', answer: 'At minimum, a Certificate of Occupancy (C of O) is required. Building plans, survey plans, and Governor\'s Consent are recommended for faster approval.' },
  { question: 'What are the platform fees?', answer: 'You set your own fee structure when listing a property. The suggested platform fee is 2-3%, but you have full control over all financial terms.' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    alert('Support message sent (mock). We\'ll get back to you soon.');
    setSubject('');
    setMessage('');
  };

  return (
    <>
      <PageHeader title="Support" description="Get help with your developer account." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border-subtle rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-bg-secondary transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-text-primary pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-text-tertiary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-tertiary shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-3 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Contact Support</h3>
          <div className="space-y-4">
            <Input
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue"
            />
            <Textarea
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows={6}
            />
            <Button onClick={handleSubmit} disabled={!subject.trim() || !message.trim()}>
              <Send className="w-4 h-4 mr-1.5" />
              Send Message
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
