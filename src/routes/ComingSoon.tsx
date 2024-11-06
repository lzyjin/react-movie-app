import {useQuery} from "@tanstack/react-query";
import {getComingSoon, IMovieResponse} from "../api.ts";
import Loading from "../components/Loading.tsx";
import MovieList from "../components/MovieList.tsx";

export default function ComingSoon() {
  const { data, isPending } = useQuery<IMovieResponse>({
    queryKey: ["comingSoonMovies"],
    queryFn: getComingSoon,
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