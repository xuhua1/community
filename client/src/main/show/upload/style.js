import styled from 'styled-components';

export const QuesBox = styled.div`
  width: 960px;
  margin-left: -480px;
  position:absolute;
  left: 50%;
  top: 5px;
  bottom: 20px;
`;

export const Intro = styled.div`
  padding-bottom: 5px;
  padding-top: 20px;
  border-left: 1px solid rgba(0, 200,0,0.1);
  border-right: 1px solid rgba(0, 200,0,0.1);
  border-top: 1px solid rgba(0, 200,0,0.1);
  p{
    text-indent: 2em;
    line-height: 20px;
    font-size: 16px;
  }
`;

export const Detail = styled.div`
  border: 1px solid rgba(0,200,0,0.1);
  padding: 10px 0;
  p{
    text-indent: 2em;
    line-height: 30px;
    font-size: 16px;
  }
`;

export const MesWrapper = styled.div`
  border: 1px solid rgba(0, 200,0,0.1);
  padding: 20px;
  padding-top: 10px;
`;

export const Label = styled.div`
  margin: 15px 0;
`;