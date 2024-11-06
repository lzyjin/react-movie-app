import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import Home from "./routes/Home.tsx";
import ComingSoon from "./routes/ComingSoon.tsx";
import NowPlaying from "./routes/NowPlaying.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: ':movieId',
        element: <Home />,
      },
      {
        path: 'coming-soon',
        element: <ComingSoon />,
      },
      {
        path: 'now-playing',
        element: <NowPlaying />,
      },
    ],
  },
]);
