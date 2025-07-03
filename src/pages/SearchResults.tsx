import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Movie } from '../types/movie';
import { tmdbApi } from '../services/tmdbApi';
import MovieGrid from '../components/MovieGrid';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) return;

      try {
        setLoading(true);
        setError(null);
        const response = await tmdbApi.searchMovies(query);
        setMovies(response.results);
      } catch (err) {
        setError('Search failed');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Home
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-red-600" />
            <h1 className="text-3xl font-bold text-white">
              Procurar resultados
            </h1>
          </div>
          
          {query && (
            <p className="text-gray-400">
              Mostrando resultados para: <span className="text-white font-medium">"{query}"</span>
            </p>
          )}
        </div>

        {/* Results */}
        {error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl mb-4">Falha na busca</p>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            loading={loading}
          />
        )}

        {!loading && !error && movies.length === 0 && query && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Nenhum filme encontrado com base em "{query}"
            </p>
            <p className="text-gray-500 mt-2">
              Tente procurar com caracteres diferentes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;