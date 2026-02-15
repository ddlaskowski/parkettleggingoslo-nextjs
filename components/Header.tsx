export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hjem" className="font-semibold tracking-tight">
          Parkettlegging Oslo
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#tjenester" className="hover:text-black">Tjenester</a>
          <a href="#pris" className="hover:text-black">Pris</a>
          <a href="#referanser" className="hover:text-black">Referanser</a>
          <a href="#kontakt" className="hover:text-black">Kontakt</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            className="bg-[#C69C6D] hover:bg-[#B68655] text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Gratis befaring
          </a>
        </div>
      </div>
    </header>
  );
}
