export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t text-white py-4 bg-[#13385D] text-sm">
      <p className="text-center">
        &copy; {currentYear} DarkLegacyShop. All souls reserved.
      </p>
    </footer>
  );
}
