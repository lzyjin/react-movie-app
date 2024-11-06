import {Outlet} from "react-router-dom";
import Header from "./components/Header.tsx";
import styled from "styled-components";

const Container = styled.div`
    overflow: hidden;
`;

const Content = styled.div`
    padding: 8rem 10vw;

    @media screen and (max-width: 1024px) {
        padding: 8rem 7vw;
    }
`;

function App() {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  )
}

export default App
