export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/70 border-t border-amber-900/50 text-amber-500 py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} DarkLegacyShop. All souls reserved.</p>
      </div>
    </footer>
  );
}
