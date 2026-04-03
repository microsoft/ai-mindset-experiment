const footerLinks = [
  { label: "Contact Us", href: "mailto:alexiacambon@microsoft.com" },
  { label: "Privacy and Cookies", href: "https://privacy.microsoft.com/en-us/privacystatement" },
  { label: "Consumer Health Privacy", href: "https://go.microsoft.com/fwlink/?linkid=2259814" },
  { label: "Terms of Use", href: "https://www.microsoft.com/en-us/servicesagreement" },
  { label: "Trademarks", href: "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks" },
];

const Footer = () => (
  <footer className="px-6 py-10 border-t bg-background">
    <div className="mx-auto max-w-5xl flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer" className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="108" height="24" viewBox="0 0 108 24" aria-label="Microsoft">
            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
            <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
            <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
            <text x="28" y="17" fill="currentColor" fontSize="14" fontFamily="Inter, system-ui, sans-serif" fontWeight="500">Microsoft</text>
          </svg>
        </a>
        {footerLinks.map((link, i) => (
          <span key={link.label} className="flex items-center gap-3">
            {i > 0 && <span className="text-muted-foreground/40 select-none">|</span>}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
      <p className="font-body text-xs text-muted-foreground">© 2026 Microsoft</p>
    </div>
  </footer>
);

export default Footer;
