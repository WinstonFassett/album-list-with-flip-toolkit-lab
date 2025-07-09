import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';
import { Flipped } from 'react-flip-toolkit';
import { albums } from '../data';

export default function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = albums.findIndex((album) => album.id === Number(id));
  const album = albums[currentIndex];

  if (!album) {
    return null;
  }

  const prevAlbum = albums[currentIndex - 1];
  const nextAlbum = albums[currentIndex + 1];

  const handleBack = () => {
    navigate('/');
  };

  const handleNavigate = (albumId: number) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ChevronLeft size={20} />
          Back to Albums
        </button>

        <div className="flex gap-4">
          {prevAlbum && (
            <button
              onClick={() => handleNavigate(prevAlbum.id)}
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition shadow-lg"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          {nextAlbum && (
            <button
              onClick={() => handleNavigate(nextAlbum.id)}
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition shadow-lg"
            >
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* <Flipped flipId={`card-${album.id}`}> */}
      <div className="grid md:grid-cols-2 gap-8">
        <Flipped flipId={`cover-${album.id}`}>
          <div className="w-full aspect-square">
            <img
              src={album.cover}
              alt={album.title}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        </Flipped>

        <div className="flex flex-col justify-center">
          <div>
            <Flipped flipId={`title-${album.id}`}>
              <div className="font-medium text-white mb-1 text-4xl">
                {album.title}
              </div>
            </Flipped>
            <Flipped flipId={`artist-${album.id}`}>
              <div className="text-gray-400 text-xl">{album.artist}</div>
            </Flipped>
          </div>
          <p className="text-gray-300 mt-4 mb-4">{album.description}</p>
          <p className="text-gray-400">Released: {album.year}</p>
        </div>
      </div>
      {/* </Flipped> */}
    </div>
  );
}
