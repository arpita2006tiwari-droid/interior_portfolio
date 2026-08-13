import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-dark)] text-[#f4efe7] py-8 px-6 md:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs mono opacity-50">
        <div className="mb-4 md:mb-0">
          FORMÉ © 2026
        </div>
        <div className="flex space-x-8 mb-4 md:mb-0">
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Credits</a>
        </div>
        <div>
          Interior Architecture Studio
        </div>
      </div>
    </footer>
  );
}
