import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link 
        href="/review" 
        className={`nav-link ${isActive('/review') ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white`}
      >
        Review
      </Link>
      <Link 
        href="/practice" 
        className={`nav-link ${isActive('/practice') ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white`}
      >
        Practice
      </Link>
      <Link 
        href="/pricing" 
        className={`nav-link ${isActive('/pricing') ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white`}
      >
        Pricing
      </Link>
      <Link 
        href="/account" 
        className={`nav-link ${isActive('/account') ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white`}
      >
        Account
      </Link>
    </div>
  );
} 