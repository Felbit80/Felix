import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import logoImg from "../assets/imgs/logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors">
            <img src={logoImg} alt="Felix Logo" className="object-contain" width={60} height={60} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/popular" className="text-white hover:text-gray-300 transition-colors">
              Populares
            </Link>
            <Link to="/top-rated" className="text-white hover:text-gray-300 transition-colors">
              Aclamados
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Procure filmes..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none w-64 transition-colors"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-4 mb-4">
              <Link to="/" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/popular" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Populares
              </Link>
              <Link to="/top-rated" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Aclamados
              </Link>
            </nav>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Procure filmes..."
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none w-full transition-colors"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
