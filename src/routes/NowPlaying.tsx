import {useQuery} from "@tanstack/react-query";
import {getNowPlaying, IMovieResponse} from "../api.ts";
import Loading from "../components/Loading.tsx";
import MovieList from "../components/MovieList.tsx";

export default function NowPlaying() {
  const { data, isPending } = useQuery<IMovieResponse>({
    queryKey: ["nowPlayingMovies"],
    queryFn: getNowPlaying,
  });

  return (
    <div>
      {
        isPending ?
          <Loading /> :
          (data && <MovieList {...data} />)
      }
    </div>
  );
}