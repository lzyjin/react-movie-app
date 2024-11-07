import {useQuery} from "@tanstack/react-query";
import {getPopular, IMovieResponse} from "../api.ts";
import Loading from "../components/Loading.tsx";
import {useMatch} from "react-router-dom";
import {useEffect} from "react";
import {scrollToTop} from "../utils.ts";
import Modal from "../components/Modal.tsx";
import MovieList from "../components/MovieList.tsx";
import {AnimatePresence} from "framer-motion";

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
        <>
          {data && <MovieList data={data} />}
          <AnimatePresence>
            {
              detailMatch ? <Modal /> : null
            }
          </AnimatePresence>
        </>
      }
    </div>
  );
}