import { GraduationCap, BarChart3, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mentor Scoring AI
            </h1>
            <p className="text-xs text-muted-foreground">
              AI-Powered Teaching Evaluation
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          <Link to="/">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant={isActive('/dashboard') ? 'default' : 'ghost'}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}