import styled from 'styled-components';
import { Row } from 'antd';
export const Back = styled.div`
  cursor: pointer;
  display: block;
  width: 60;
  height: 30;
  font-size: 20px;
  letter-spacing: 4px;
  padding: 8px;
  border-radius: 4px;
  margin-top: 27px;
  background:pink;
  position: fixed;
  left: 50%;
  top: 5px;
  margin-left: -570px;
`;

export const Release = styled.div`
  display:block;
  cursor: pointer;
  width: 60;
  height: 30;
  font-size: 20px;
  letter-spacing: 4px;
  padding: 8px;
  border-radius: 4px;
  margin-top: 27px;
  margin-right:15px;
  background:pink;
  position: fixed;
  left: 50%;
  top: 5px;
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

export const MarkdownBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  bottom: 80px;
  left: 0;
  right: 0;
`;

export const TextBox = styled.div`
  height: 100%;
  position: relative;
  flex: 1;
  max-width: 680px;
`;
export const ViewBox = styled.div`
  margin-top: 30px;
  padding: 0 20px;
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  flex: 1;
  &.unshow{
    display: none;
  }
`;
export const ToolBar = styled(Row)`
  text-align: center;
  height: '30px';
  font-size: '20px';
  line-height: 30px;
`;
export const MarkdownText = styled.textarea`
  font-family: 'Consolas', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  position: absolute;
  top: 74px;
  bottom: 200px;
  padding: 8px 20px;
  font-family: inherit;
  display: block;
  height: 100%;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-size: inherit;
  color: rgba(0, 0, 0, 0.65);
  background-color: rgb(255,255,255);
  line-height: inherit;
`;

export const ModalWrap = styled.div`
  p{
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 0;
  }
`;
export const TitleWrapper = styled.div`
  width: 680px;
`;