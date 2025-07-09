import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Flipper } from 'react-flip-toolkit';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import { ViewProvider } from './context/ViewContext';

// Shared spring configuration for consistent animations
export const springConfig = {
  // stiffness: 400,
  // damping: 35
};

export default function App() {
  const location = useLocation();

  return (
    <ViewProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Flipper
          flipKey={location.pathname}
          decisionData={location}
          handleEnterUpdateDelete={({
            hideEnteringElements,
            animateEnteringElements,
            animateExitingElements,
            animateFlippedElements,
          }) => {
            hideEnteringElements();
            animateExitingElements();
            animateFlippedElements();
            animateEnteringElements();
          }}
        >
          <Routes location={location}>
            <Route path="/" element={<AlbumList />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
          </Routes>
        </Flipper>
      </div>
    </ViewProvider>
  );
}
