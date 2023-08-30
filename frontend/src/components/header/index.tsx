import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
`;

const Circle = styled.div`
  background-color: #001220;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    text-shadow: 0 0 10px #fbae3c, 0 0 20px #fbae3c, 0 0 40px #fbae3c,
      0 0 80px #fbae3c, 0 0 240px #fbae3c;
    transition: 450ms;
  }

  a:hover {
    text-shadow: none;
  }
`;

const Logo = styled.h1`
  font-family: "Bricolage Grotesque", sans-serif;
  color: #fbae3c;
`;

const NavWrapper = styled.nav`
  display: flex;
  gap: 1rem;
  a {
    gap: 1rem;
    text-decoration: none;
    color: #fbae3c;
  }
  a span {
    transition: 450ms;
  }
  a:hover span {
    text-shadow: 0 0 10px #fbae3c, 0 0 20px #fbae3c, 0 0 40px #fbae3c,
      0 0 80px #fbae3c, 0 0 240px #fbae3c;
  }
  #xperience-icon::before,
  #xperience-icon::after {
    transition: 450ms; /* Apply transition to both pseudo-elements */
  }

  #xperience-icon::before {
    content: "x"; /* Default content for ::before */
  }

  #xperience-icon::after {
    content: ""; /* Default content for ::after */
  }

  .xperience:hover #xperience-icon::before {
    content: ""; /* Change content on hover */
  }

  .xperience:hover #xperience-icon::after {
    content: "</>";
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    font-size: 1.25rem;
  }
`;

function Header() {
  return (
    <>
      <HeaderWrapper>
        <Circle>
          <a href="#">
            <Logo>a</Logo>
          </a>
        </Circle>
        <NavWrapper>
          <a href="#">
            <span>projects</span>
          </a>
          <a href="#">
            <span>about</span>
          </a>
          <a className="xperience" href="#">
            <span>
              e<span id="xperience-icon"></span>perience
            </span>
          </a>
        </NavWrapper>
      </HeaderWrapper>
    </>
  );
}

export default Header;
