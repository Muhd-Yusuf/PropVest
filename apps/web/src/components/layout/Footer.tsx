import { Container } from '../ui/Container';

const footerLinks = {
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Investors: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Properties', href: '#featured-properties' },
    { label: 'Returns Calculator', href: '#returns-calculator' },
    { label: 'FAQ', href: '#faq' },
  ],
  Developers: [
    { label: 'Partner With Us', href: '#for-developers' },
    { label: 'Developer Portal', href: '#' },
    { label: 'API Docs', href: '#' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Risk Disclosure', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-midnight pt-10 sm:pt-16 pb-8">
      <Container>
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-0 mb-4">
              <span className="text-xl font-bold text-white">Prop</span>
              <span className="text-xl font-bold text-emerald">Vest</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Own Nigerian real estate from ₦100,000. Invest in verified properties by trusted developers.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-emerald transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} PropVest Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-white/40 hover:text-emerald transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
