import styled from "styled-components";
import {IMovie, makeImagePath} from "../api.ts";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

const Card = styled(motion.li)`
  
`;

const Img = styled(motion.div)`
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  transform-origin: bottom center;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Title = styled.p`
  font-size: 1.125rem;
  margin-top: 0.5em;
`;

const Overview = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  font-size: 1rem;
  padding: 1em;
    
    p {
      line-height: 1.4;
      color: #fff;
      // color: ${props => props.theme.textColor};
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
`;

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
    },
  },
};

export default function MovieCard(movie: IMovie) {
  return (
    <Card
      key={movie.id}
      variants={cardVariants}>
      <Link to={`/${movie.id+""}`}>
        <Img whileHover={{ scale: 1.1 }} transition={{ type: "tween" }}>
          <img src={makeImagePath(movie.poster_path)} alt={movie.title}/>
          <Overview whileHover={{ opacity: 1 }}>
            <p>{movie.overview}</p>
          </Overview>
        </Img>
        <Title>{movie.title}</Title>
      </Link>
    </Card>
  );
}