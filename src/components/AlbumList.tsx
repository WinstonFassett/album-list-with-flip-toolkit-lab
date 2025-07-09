import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, LayoutGrid, List } from 'lucide-react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { albums } from '../data';
import { useView } from '../context/ViewContext';
import { springConfig } from '../App';

export default function AlbumList() {
  const navigate = useNavigate();
  const { viewMode, setViewMode } = useView();

  const handleViewAlbum = (albumId: number) => {
    navigate(`/album/${albumId}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Music2 size={32} className="text-purple-500" />
          <h1 className="text-3xl font-bold">Album Collection</h1>
        </div>
        <button
          onClick={toggleViewMode}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          {viewMode === 'grid' ? (
            <>
              <List size={20} />
              <span>List View</span>
            </>
          ) : (
            <>
              <LayoutGrid size={20} />
              <span>Grid View</span>
            </>
          )}
        </button>
      </div>

      <Flipper flipKey={viewMode}>
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {albums.map((album) => (
            // <Flipped
            //   flipId={`card-${album.id}`}>
            <div
              key={album.id}
              className={`cursor-pointer ${
                viewMode === 'grid'
                  ? 'group'
                  : 'flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition'
              }`}
              onClick={() => handleViewAlbum(album.id)}
            >
              <Flipped flipId={`cover-${album.id}`}>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'relative aspect-square mb-3'
                      : 'w-20 h-20 flex-shrink-0'
                  }
                >
                  <img
                    src={album.cover}
                    alt={album.title}
                    className={`w-full h-full object-cover rounded-lg ${
                      viewMode === 'grid'
                        ? 'shadow-lg group-hover:shadow-2xl transition duration-300'
                        : ''
                    }`}
                  />
                  {viewMode === 'grid' && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center">
                      <p className="text-white font-medium">View Details</p>
                    </div>
                  )}
                </div>
              </Flipped>
              <div>
                <Flipped flipId={`title-${album.id}`} translate>
                  <div
                    className={`font-medium text-white mb-1 ${
                      viewMode === 'grid' ? 'text-base' : 'text-lg'
                    }`}
                  >
                    {album.title}
                  </div>
                </Flipped>
                <Flipped flipId={`artist-${album.id}`} translate>
                  <div className="text-gray-400">{album.artist}</div>
                </Flipped>
              </div>
            </div>
            // </Flipped>
          ))}
        </div>
      </Flipper>
    </div>
  );
}
