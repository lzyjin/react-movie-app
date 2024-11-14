import {motion} from "framer-motion";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getMovie, makeBgPath} from "../api.ts";
import Loading from "./Loading.tsx";
import {IModalProps, IMovieDetail} from "../types.ts";
import CloseSvg from "../svgs/CloseSvg.tsx";
import StarSvg from "../svgs/StarSvg.tsx";
import HomeSvg from "../svgs/HomeSvg.tsx";

const Dim = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 20;
`;

const ModalBox = styled(motion.div)`
  background-color: ${props => props.theme.bgColor};
  width: 80vw;
  max-width: 800px;
  height: max-content;
  max-height: 80vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
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
    height: 101%;
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

const OriginalTitle = styled.p`
  transform: translateY(-1.3em);
  font-size: 0.85rem;
  opacity: 0.7;
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

export default function Modal({ movieId }: IModalProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const {data, isPending} = useQuery<IMovieDetail>({
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
          isPending ?
          <Loading /> :
          data &&
          <>
            <CloseBtn onClick={closeModal}>
              <CloseSvg />
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
              {
                data?.title !== data?.original_title &&
                <OriginalTitle>{data?.original_title}</OriginalTitle>
              }
              <Infos>
                <Info>{state?.release_date || data?.release_date}</Info>
                <Info>{data?.origin_country && data?.origin_country[0]}</Info>
                <Info>{data?.runtime} minutes</Info>
                <Info>
                  <StarSvg />
                  { (state?.vote_average || (data ? data?.vote_average : 0))?.toFixed(1) } / 10
                </Info>
                {
                  data?.homepage && (
                    <Info>
                      <a href={data?.homepage} target="_blank">
                       <HomeSvg />
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