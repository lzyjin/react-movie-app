import {useQuery} from "@tanstack/react-query";
import {getPopular, IMovieResponse} from "../api.ts";
import Loading from "../components/Loading.tsx";
import MovieList from "../components/MovieList.tsx";
import Modal from "../components/Modal.tsx";
import {useMatch} from "react-router-dom";
import {useEffect} from "react";
import {scrollToTop} from "../utils.ts";

export default function Home() {
  const detailMatch = useMatch("/:movieId");

  const { data, isPending } = useQuery<IMovieResponse>({
    queryKey: ["popularMovies"],
    queryFn: getPopular,
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      {
        isPending ?
        <Loading /> :
        // (data && <MovieList {...data} category="popular" />)
        (data && <MovieList {...data} />)
      }
      {
        detailMatch && <Modal />
      }
    </div>
  );
}