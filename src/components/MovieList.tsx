import styled from "styled-components";
import {IMovieResponse} from "../api.ts";
import MovieCard from "./MovieCard.tsx";
import {motion} from "framer-motion";

// interface IMovieList {
//   data: IMovieResponse;
//   category: string;
// }

const List = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4vw;
  
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 5vw;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7vw 5vw;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  },
};

// export default function MovieList({data, category}: IMovieList) {
export default function MovieList(data: IMovieResponse) {
  return (
    <>
      <List
        variants={listVariants}
        initial="hidden"
        animate="visible">
        {
          data?.results.map(movie => (
            <MovieCard key={movie.id} {...movie} />
            // <MovieCard key={movie.id} {...movie} category={category} />
          ))
        }
      </List>
    </>
  );
}