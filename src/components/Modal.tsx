import {motion} from "framer-motion";
import styled from "styled-components";
import {useMatch, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getMovie, IMovieDetail, makeImagePath} from "../api.ts";
import Loading from "./Loading.tsx";

const Dim = styled(motion.div)`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
`;

const ModalBox = styled(motion.div)`
    background: red;
    width: 50vw;
    height: 80vh;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    margin: auto;
`;

const Img = styled.div`
  width: 100%;
  height: auto;
  //aspect-ratio: 1 / 1;
  aspect-ratio: 3 / 2;
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

export default function Modal() {
  const navigate = useNavigate();
  const detailMatch = useMatch("/:movieId");
  const movieId = Number(detailMatch?.params.movieId);

  const {data, isPending} = useQuery<IMovieDetail>({
    queryKey: ["movieDetail", movieId],
    queryFn: () => getMovie(movieId)
  });

  console.log(data)

  const closeModal = () => {
    navigate("/");
  };

  return (
    <>
      <Dim onClick={closeModal}></Dim>
      <ModalBox>
        {
          isPending ?
          <Loading /> :
          <>
            <button onClick={closeModal}>모달 닫기</button>
            <Img>
              <img src={makeImagePath(data?.backdrop_path || "")} alt={data?.title} />
            </Img>
            <p>{data?.title}</p>
            <p>{data?.overview}</p>
            <ul>
              <li>
                genre: {data?.genres.map(g => (
                  <span style={{ marginRight: "1em" }}>{g.name}</span>
                ))}
              </li>
              <li>runtime: {data?.runtime}</li>
              <li>rating: {data?.vote_average}</li>
              {
                data?.homepage && <li><a href={data?.homepage} target="_blank">visit homepage</a></li>
              }
            </ul>
          </>
        }
      </ModalBox>
    </>
  );
}