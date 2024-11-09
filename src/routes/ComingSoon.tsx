import {useQuery} from "@tanstack/react-query";
import {getComingSoon} from "../api.ts";
import Loading from "../components/Loading.tsx";
import MovieList from "../components/MovieList.tsx";
import {useEffect} from "react";
import {scrollToTop} from "../utils.ts";
import Modal from "../components/Modal.tsx";
import {useMatch} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {IMovieResponse} from "../types.ts";

export default function ComingSoon() {
  const detailMatch = useMatch("/coming-soon/:movieId");

  const { data, isPending } = useQuery<IMovieResponse>({
    queryKey: ["comingSoonMovies"],
    queryFn: getComingSoon,
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
                detailMatch ? <Modal movieId={detailMatch?.params.movieId}  /> : null
              }
            </AnimatePresence>
          </>
      }
    </div>
  );
}