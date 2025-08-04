
const Footer = () => {
  const footerLinks = {
    Solutions: ["Consumer Insights", "Audience Activation", "Panel Surveys", "Analytics"],
    Platform: ["Dashboard", "API Access", "Integrations", "Security"],
    Resources: ["Documentation", "Case Studies", "Blog", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"]
  };

  return (
    <footer id="footer" className="bg-[#0A0E13] border-t border-white/10 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
                Sync Pulse
              </span>
            </div>
            <p className="text-[#8B93A1] text-sm leading-relaxed mb-6">
              Real-time audience insights for modern media brands.
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-[#1A1F2E] rounded-lg flex items-center justify-center text-[#8B93A1] hover:text-[#32F594] hover:bg-[#1A1F2E]/80 transition-all duration-200"
                  aria-label={social}
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#8B93A1] hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#8B93A1] text-sm">
            © 2024 Sync Media. All rights reserved.
          </p>
          <p className="text-[#8B93A1] text-sm mt-4 sm:mt-0">
            Made with ❤️ for media brands
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
