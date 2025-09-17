export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display text-xl">Wado Academy Paris</div>
          <p className="mt-2 opacity-80">Karaté Wado-Ryu & Ju-Jutsu</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Club</div>
          <ul className="space-y-1">
            <li><a href="/about">About</a></li>
            <li><a href="/coaches">Coaches</a></li>
            <li><a href="/pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Des cours d’essai sont proposés,</div>
          <p>Merci de prendre contact au préalable. </p>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 text-xs opacity-70">&copy; {new Date().getFullYear()} Wado Academy Paris</div>
      </div>
    </footer>
  );
}
