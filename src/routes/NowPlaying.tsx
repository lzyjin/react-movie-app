import {useQuery} from "@tanstack/react-query";
import {getNowPlaying} from "../api.ts";
import Loading from "../components/Loading.tsx";
import MovieList from "../components/MovieList.tsx";
import {useEffect} from "react";
import {scrollToTop} from "../utils.ts";
import Modal from "../components/Modal.tsx";
import {useMatch} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {IMovieResponse} from "../types.ts";

export default function NowPlaying() {
  const detailMatch = useMatch("/now-playing/:movieId");

  const { data, isPending } = useQuery<IMovieResponse>({
    queryKey: ["nowPlayingMovies"],
    queryFn: getNowPlaying,
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      {
        isPending ?
          <Loading/> :
          <>
            {data && <MovieList data={data}/>}
            <AnimatePresence>
              {
                detailMatch ? <Modal movieId={detailMatch?.params.movieId} /> : null
              }
            </AnimatePresence>
          </>
      }
    </div>
  );
}