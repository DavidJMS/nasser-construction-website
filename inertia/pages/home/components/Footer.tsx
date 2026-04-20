import { Heart } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'Testimonials', href: '#testimonials' },
  ],
  services: [
    { label: 'Door Installation', href: '#services' },
    { label: 'Window Fitting', href: '#services' },
    { label: 'Glass & Glazing', href: '#services' },
    { label: 'Maintenance', href: '#services' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Warranty', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
}

interface FooterProps {
  settings?: Record<string, any>
}

export default function Footer({ settings }: FooterProps) {
  const brandTitle = settings?.footer_brand_title || 'NASSER'
  const brandSubtitle = settings?.footer_brand_subtitle || 'Doors & Windows'
  const description =
    settings?.footer_description ||
    'Premium custom-made doors and windows with professional installation. Serving homeowners and builders with excellence since 2005.'
  const copyright =
    settings?.footer_copyright || '© 2026 Nasser Doors & Windows. All rights reserved.'
  const crafted = settings?.footer_crafted || 'Crafted with {heart} in Orlando'

  const socialLinks = [
    { key: 'facebook', href: settings?.footer_social_facebook || '#' },
    { key: 'x', href: settings?.footer_social_x || '#' },
    { key: 'instagram', href: settings?.footer_social_instagram || '#' },
    { key: 'linkedin', href: settings?.footer_social_linkedin || '#' },
  ]

  return (
    <footer className="bg-navy-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gray-400/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand & Social Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-navy-900/20 transition-transform group-hover:scale-110 group-hover:rotate-3 text-white">
                N
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white">{brandTitle}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] -mt-1">
                  {brandSubtitle}
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
              {description}
            </p>

            <div className="flex gap-4">
              {[
                { 
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>, 
                  href: socialLinks.find((s) => s.key === 'facebook')?.href || "#"
                },
                { 
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, 
                  href: socialLinks.find((s) => s.key === 'x')?.href || "#"
                },
                { 
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, 
                  href: socialLinks.find((s) => s.key === 'instagram')?.href || "#"
                },
                { 
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, 
                  href: socialLinks.find((s) => s.key === 'linkedin')?.href || "#"
                },
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  className="w-11 h-11 bg-white/5 hover:bg-gray-800 text-white flex items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/40"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Company</h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-gray-400 hover:text-gray-200 text-sm transition-colors flex items-center gap-2 group">
                        <span className="w-0 h-px bg-gray-400 transition-all group-hover:w-3" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Services</h4>
                <ul className="space-y-4">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-gray-400 hover:text-gray-200 text-sm transition-colors flex items-center gap-2 group">
                        <span className="w-0 h-px bg-gray-400 transition-all group-hover:w-3" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Support</h4>
                <ul className="space-y-4">
                  {footerLinks.support.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-gray-400 hover:text-gray-200 text-sm transition-colors flex items-center gap-2 group">
                        <span className="w-0 h-px bg-gray-400 transition-all group-hover:w-3" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            {copyright}
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {crafted.includes('{heart}') ? (
              <>
                {crafted.split('{heart}')[0]}
                <Heart className="w-4 h-4 text-gray-400 fill-current" />
                {crafted.split('{heart}')[1]}
              </>
            ) : (
              crafted
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
