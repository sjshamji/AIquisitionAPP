export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-xs text-gray-400">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} AIquisition. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:text-gray-600">Privacy</a>
          <span>·</span>
          <a href="/terms" className="hover:text-gray-600">Terms</a>
          <span>·</span>
          <a href="/contact" className="hover:text-gray-600">Contact</a>
        </div>
      </div>
    </footer>
  );
} 