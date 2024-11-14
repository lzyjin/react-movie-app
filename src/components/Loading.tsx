import styled from "styled-components";
import SpinnerSvg from "../svgs/SpinnerSvg.tsx";

const Spinner = styled.div`
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @keyframes ani-spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    svg {
        width: 2rem;
        animation: ani-spin 1.5s infinite;
    }
`;

export default function Loading() {
  return (
    <Spinner>
      <SpinnerSvg />
    </Spinner>
  );
}