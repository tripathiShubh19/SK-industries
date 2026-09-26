export default function FloatingWhatsApp() {
  const defaultMessage = encodeURIComponent(
    'Hello SK Polychem Industries,\nI am interested in your industrial hoses and would like to request technical specifications and quotation.'
  );
  const factoryPhone = '918800732441';

  return (
    <a
      href={`https://wa.me/${factoryPhone}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group hover:scale-105"
    >
      {/* WhatsApp SVG Icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.529 1.769.814 2.791.814 3.18 0 5.768-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.965 5.766c0 5.485-4.464 9.949-9.965 9.949-1.745 0-3.376-.452-4.793-1.242L2 22l1.559-5.704C2.744 14.869 2.273 13.36 2.273 11.938 2.273 6.453 6.737 2 12.238 2c5.499 0 9.965 4.453 9.965 9.938zm-4.708 3.864c-.161-.269-.594-.431-1.242-.754-.648-.323-3.829-1.888-4.422-2.103-.593-.216-1.025-.323-1.457.323-.432.647-1.674 2.103-2.051 2.535-.378.431-.756.485-1.404.162-.648-.324-2.736-1.009-5.212-3.217-1.927-1.718-3.228-3.84-3.606-4.488-.378-.648-.04-1 .284-1.321.292-.291.648-.754.972-1.132.324-.378.432-.647.648-1.079.216-.432.108-.809-.054-1.132-.162-.324-1.457-3.509-2-4.805-.529-1.261-1.066-1.09-1.457-1.11-.378-.02-.81-.02-1.242-.02-.432 0-1.133.162-1.727.809-.594.648-2.267 2.213-2.267 5.397s2.321 6.26 2.645 6.692c.324.432 4.567 6.974 11.066 9.779 1.546.667 2.753 1.065 3.694 1.365 1.552.494 2.964.424 4.08.258 1.244-.186 3.829-1.564 4.369-3.074.54-1.51.54-2.805.378-3.074z"/>
      </svg>
      <span className="text-xs font-bold hidden sm:inline-block pr-1">
        WhatsApp Quote
      </span>
      <span className="w-2.5 h-2.5 rounded-full bg-white absolute top-1 right-1 animate-ping"/>
      <span className="w-2.5 h-2.5 rounded-full bg-white absolute top-1 right-1"/>
    </a>
  );
}
