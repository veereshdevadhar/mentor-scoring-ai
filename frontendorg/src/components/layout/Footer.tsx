import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              🎓 Built for IIT Bombay Hackathon - Round 2
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Team: Veeresh, Shivraj, Shivakumar, Tharungowda
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for educators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}