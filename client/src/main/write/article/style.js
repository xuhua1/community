import styled from 'styled-components';


export const Back = styled.span`
  cursor: pointer;
  display: block;
  font-size: 18px;
  letter-spacing: 4px;
  padding: 8px;
  border-radius: 4px;
  background:pink;
  position: fixed;
  left: 50%;
  top: 0px;
  z-index: 9900;
  margin-left: -570px;
`;

export const Release = styled.div`
  display:block;
  cursor: pointer;
  min-width: 60px;
  font-size: 18px;
  letter-spacing: 4px;
  padding: 8px;
  border-radius: 4px;
  background:pink;
  position: fixed;
  left: 50%;
  top: 0px;
  z-index: 9900;
  margin-left: 530px;
  span {
    font-size: 24px;
  }
`;

export const AllBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(222,222,222,.5);
  overflow: hidden;
`;
export const TitleWrapper = styled.div`
  position: fixed;
  top: 60px;
  height: 40px;
  width: 960px;
  left: 50%;
  margin-left: -480px;
`;