import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Flowbite } from 'flowbite-react/';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  const theme = {
    sidebar: {
      base: 'h-full bg-inherit',
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-inherit py-4 px-3',
    },
  };

  root.render(
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Flowbite>
  );
}