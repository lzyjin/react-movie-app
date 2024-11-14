import App from './App';
import { createBrowserRouter } from 'react-router-dom';
// import MoviesPage from "./routes/MoviesPage.tsx";
import Home from "./routes/Home.tsx";
import ComingSoon from "./routes/ComingSoon.tsx";
import NowPlaying from "./routes/NowPlaying.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '',
      //   element: <MoviesPage />,
      //   children: [
      //     {
      //       path: ':movieId',
      //       element: <MoviesPage />,
      //     },
      //   ]
      // },
      // {
      //   path: 'coming-soon',
      //   element: <MoviesPage />,
      //   children: [
      //     {
      //       path: ':movieId',
      //       element: <MoviesPage />,
      //     },
      //   ]
      // },
      // {
      //   path: 'now-playing',
      //   element: <MoviesPage />,
      //   children: [
      //     {
      //       path: ':movieId',
      //       element: <MoviesPage />,
      //     },
      //   ]
      // },
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: ':movieId',
            element: <Home />,
          },
        ]
      },
      {
        path: 'coming-soon',
        element: <ComingSoon />,
        children: [
          {
            path: ':movieId',
            element: <ComingSoon />,
          },
        ]
      },
      {
        path: 'now-playing',
        element: <NowPlaying />,
        children: [
          {
            path: ':movieId',
            element: <NowPlaying />,
          },
        ]
      },
    ],
  },
]);
