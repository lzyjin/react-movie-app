import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import {motion} from "framer-motion";

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 3rem 0 2rem;
  background-color: ${props => props.theme.bgColor};
  z-index: 10;
`;

const Nav = styled.nav`

`;

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

const NavItem = styled.li<{ match: string }>`
    opacity: ${props => props.match === "matched" ? 1 : 0.7};
    transition: color .2s ease-in-out;

    &:hover {
        opacity: 1;
    }

    a {
        position: relative;
    }
`;

const Dot = styled(motion.div)`
    width: 0.5em;
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: ${props => props.theme.accentColor};
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: -1em;
`;

export default function Header() {
  const homeMatch = useMatch("/");
  const comingSoomMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");

  return (
    <HeaderBox>
      <Nav>
        <NavList>
          <NavItem match={ homeMatch ? "matched" : "" }>
            <Link to="/">POPULAR { homeMatch && <Dot layoutId="dot" /> }</Link>
          </NavItem>
          <NavItem match={ comingSoomMatch ? "matched" : "" }>
            <Link to="/coming-soon">COMING SOON { comingSoomMatch && <Dot layoutId="dot" /> }</Link>
          </NavItem>
          <NavItem match={ nowPlayingMatch ? "matched" : "" }>
            <Link to="/now-playing">NOW PLAYING { nowPlayingMatch && <Dot layoutId="dot" /> }</Link>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderBox>
  );
}