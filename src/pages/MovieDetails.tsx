import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Calendar, 
  Clock, 
  Globe, 
  ArrowLeft, 
  Play,
  Users,
  DollarSign 
} from 'lucide-react';
import { MovieDetails as MovieDetailsType, Cast, Video } from '../types/movie';
import { tmdbApi, getImageUrl } from '../services/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoPlayer from '../components/VideoPlayer';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [movieData, creditsData, videosData] = await Promise.all([
          tmdbApi.getMovieDetails(parseInt(id)),
          tmdbApi.getMovieCredits(parseInt(id)),
          tmdbApi.getMovieVideos(parseInt(id)),
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10)); // Top 10 cast members
        setVideos(videosData.results.filter(video => 
          video.site === 'YouTube' && video.type === 'Trailer'
        ));
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Erro ao carregar detalhes do filme</p>
          <Link to="/" className="text-red-600 hover:text-red-500 transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  const trailer = videos[0];
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para Filmes
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">"{movie.tagline}"</p>
                )}

                {/* Movie Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-400">
                      ({movie.vote_count.toLocaleString()} votes)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5" />
                    <span>{releaseYear}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span>{runtime}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Globe className="w-5 h-5" />
                    <span>{movie.original_language.toUpperCase()}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm border border-red-600/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overview */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {movie.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <button
                      onClick={() => setShowTrailer(!showTrailer)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      {showTrailer ? 'Esconder Trailer' : 'Assistir Trailer'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {showTrailer && trailer && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6">Trailer</h2>
          <VideoPlayer videoKey={trailer.key} title={movie.title} />
        </div>
      )}

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-8 h-8" />
            Elenco
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={getImageUrl(actor.profile_path, 'w185')}
                  alt={actor.name}
                  className="w-full aspect-[2/3] object-cover rounded-lg mb-3"
                />
                <h3 className="text-white font-semibold text-sm mb-1">
                  {actor.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Details */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-6">Detalhes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Status</h3>
              <p className="text-gray-300">{movie.status}</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-2">Linguagem Original</h3>
              <p className="text-gray-300">{movie.original_language.toUpperCase()}</p>
            </div>

            {movie.budget > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Orçamento
                </h3>
                <p className="text-gray-300">${movie.budget.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {movie.revenue > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2">Lucro</h3>
                <p className="text-gray-300">${movie.revenue.toLocaleString()}</p>
              </div>
            )}

            {movie.production_companies.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2">Estudios</h3>
                <div className="space-y-1">
                  {movie.production_companies.slice(0, 3).map((company) => (
                    <p key={company.id} className="text-gray-300">
                      {company.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;