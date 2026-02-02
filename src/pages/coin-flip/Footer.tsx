export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-16 py-8">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© 2024 CryptoFlip. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Responsible Gaming</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
