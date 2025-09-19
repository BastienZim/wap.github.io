export default function Footer() {
  return (
    <footer className="bg-primary-100 dark:bg-secondary-900 border-t border-primary-200 dark:border-secondary-700 py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-[rgb(var(--color-foreground))] dark:text-primary-100">
          <div>
          <div className="font-display text-xl">Wado Academy Paris</div>
          <p className="mt-2 opacity-80">Karaté Wado-Ryu & Ju-Jutsu</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Club</div>
          
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
