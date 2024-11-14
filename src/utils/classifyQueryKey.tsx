export default function classifyQueryKey(pathname: string) {
  if(pathname === "/") {
    return "popularMovies";
  }

  if(pathname === "/coming-soon") {
    return "comingSoonMovies";
  }

  if(pathname === "/now-playing") {
    return "nowPlayingMovies";
  }
}