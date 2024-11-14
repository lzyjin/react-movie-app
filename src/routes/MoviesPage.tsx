import {useQuery} from "@tanstack/react-query";
import Loading from "../components/Loading.tsx";
import {useLocation, useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {scrollToTop} from "../utils.ts";
import Modal from "../components/Modal.tsx";
import MovieList from "../components/MovieList.tsx";
import {AnimatePresence} from "framer-motion";
import {IMovieResponse} from "../types.ts";
import classifyQueryKey from "../utils/classifyQueryKey.tsx";
import classifyQueryFn from "../utils/classifyQueryFn.tsx";

export default function MoviesPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const [currPath, setCurrPath] = useState("/");
  const [currDetailPath, setCurrDetailPath] = useState(":movieId");
  console.log(currPath, currDetailPath)

  useEffect(() => {
    // console.log("🚨pathname: ", pathname)
    setCurrPath(pathname);
  }, []);

  console.log("🚨currPath: ", currPath)

  useEffect(() => {
    setCurrDetailPath( currPath === "/" ? ":movieId" : `${currPath}/:movieId`);
  }, [currPath]);

  const detailMatch = useMatch(currDetailPath);
  console.log("detailMatch: ", detailMatch)

  // console.log(classifyQueryKey(pathname), classifyQueryFn(pathname))

  const { data, isPending } = useQuery<IMovieResponse>({
    queryKey: [classifyQueryKey(currPath)],
    queryFn: classifyQueryFn(currPath),
  });

  console.log(data)

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      {
        isPending ?
          <Loading /> :
          <>
            {
              data && <MovieList data={data} />
            }
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