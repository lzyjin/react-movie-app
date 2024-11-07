import {motion} from "framer-motion";
import styled from "styled-components";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getMovie, IMovieDetail, makeBgPath} from "../api.ts";
// import Loading from "./Loading.tsx";

const Dim = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalBox = styled(motion.div)`
  background-color: ${props => props.theme.bgColor};
  width: 80vw;
  max-width: 800px;
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  margin: auto;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 1em;
  top: 1em;
  z-index: 2;
  cursor: pointer;
  color: #fff;
  
  svg {
    width: 2em;
  }
`;

const Img = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 500 / 281;
  overflow: hidden;
  transform-origin: bottom center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(transparent, ${props => props.theme.bgColor});
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Text = styled.div`
  padding: 0 1em 5vw;
  position: relative;
  z-index: 5;
`;

const Title = styled.p`
  transform: translateY(-0.5em);
  font-size: 2.5rem;
`;

const Genres = styled.ul`
  display: flex;
  align-items: center;
  gap: 1em;
  transform: translateY(-2em);
`;

const Genre = styled.li`
  text-transform: uppercase;
`;

const Overview = styled.p`
  line-height: 1.4;
  font-family: "Cormorant Garamond", serif;
`;

const Infos = styled.ul`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
`;

const Info = styled.li`
`;

export default function Modal() {
  const navigate = useNavigate();
  const params= useParams();
  const movieId = params.movieId;
  const location = useLocation();
  const state = location.state;

  const {data} = useQuery<IMovieDetail>({
    queryKey: [movieId],
    queryFn: () => getMovie(Number(movieId))
  });

  const paths = location.pathname.split("/", 3);
  let pathname;

  if(paths[2]) {
    pathname = paths[1];
  } else {
    pathname = paths[0];
  }

  const closeModal = () => {
    navigate(pathname ? "/" + pathname : "/");
  };

  return (
    <>
      <Dim
        onClick={closeModal}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} />
      <ModalBox layoutId={movieId} key={movieId}>
        {
          // isPending ?
          // <Loading /> :
          data &&
          <>
            <CloseBtn onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </CloseBtn>
            <Img>
              <img src={makeBgPath(state?.backdrop_path || (data?.backdrop_path || ""))} alt={data?.title}/>
            </Img>
            <Text>
              <Genres>
                {
                  data?.genres?.map(g => (
                    <Genre key={g.id} >{g.name}</Genre>
                  ))
                }
              </Genres>
              <Title>{state?.title || data?.title}</Title>
              <Infos>
                <Info>{state?.release_date || data?.release_date}</Info>
                <Info>{data?.runtime} minutes</Info>
                <Info>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "1em", marginRight: "0.5em", transform: "translateY(0.15em)" }}>
                    <path
                      d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                  </svg>
                  {Math.floor(state?.vote_average || (data ? data?.vote_average : 0))} / 10
                </Info>
                {
                  data?.homepage && (
                    <Info>
                      <a href={data?.homepage} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             style={{ width: "1em", transform: "translateY(0.15em)" }}>
                          <path
                            d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20Z"></path>
                        </svg>
                      </a>
                    </Info>
                  )
                }
              </Infos>
              <Overview>{state?.overview || data?.overview}</Overview>
            </Text>
          </>
        }
      </ModalBox>
    </>
  );
}