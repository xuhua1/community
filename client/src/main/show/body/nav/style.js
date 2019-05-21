import styled from 'styled-components';

export const NavBar = styled.div`
  font-size: 14px;
  width: 660px;
  height: 40px;
  
  padding-bottom: 2px;
  background: rgba(39, 155, 97, 0.3);
`;

export const NavWrapper = styled.ul`
  max-width: 660px;
  background: transparent;
  height: 100%;

`;

export const NavItem = styled.li`
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  line-height: 40px;
  padding: 0 20px;
  &.seleted { 
    border-bottom: 2px solid #008ab8;
    color: rgba(63, 93, 125, 1);
  }
`;

export const NavLink = styled.sapn`
  position: relative;
  letter-spacing: .1rem;
  cursor: pointer;
  &:hover {
    color: rgba(63, 93, 125, 0.7);
  }
  &:focus {
    text-decoration: none;
  }
`;