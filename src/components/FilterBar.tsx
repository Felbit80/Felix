import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { Genre } from '../types/movie';
import styled from 'styled-components';

interface FilterBarProps {
  genres: Genre[];
  selectedGenre: number | null;
  sortBy: string;
  onGenreChange: (genreId: number | null) => void;
  onSortChange: (sortBy: string) => void;
}

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  selectedGenre,
  sortBy,
  onGenreChange,
  onSortChange,
}) => {
  return (
    <div className="container mx-auto px-4 py-6 border-b border-gray-800">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Genre Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <label className="text-white font-medium">Gênero:</label>
            <Select
            value={selectedGenre || ''}
            onChange={(e) => onGenreChange(e.target.value ? parseInt(e.target.value) : null)}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
            style={{ backgroundImage: 'none' }}
            >
            <option value="">Todos os gêneros</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                {genre.name_pt || genre.name}
                </option>
            ))}
            </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-5 h-5 text-gray-400" />
          <label className="text-white font-medium">Filtrar:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none appearance-none"
          >
            <option value="popularity">Popularidade</option>
            <option value="release_date">Data de lançamento</option>
            <option value="vote_average">Nota</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;