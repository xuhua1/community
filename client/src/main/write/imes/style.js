import styled from 'styled-components';

export const ImesBox = styled.div`
  width: 960px;
  margin-top: 60px;
  margin-left: -480px;
  position:absolute;
  left: 50%;
  top: 5px;
  bottom: 20px;
  padding: 20px 0;
  overflow: hidden;
`;
export const ImesWrapper = styled.div`
  width: 960px;
  position: absolute;
  top: 8px;
  left: 0;
  right:0;
  bottom: 0;
`;
export const RightWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 180px;
  width: 620px;
  height: 100%;
  position: absolute;
  top:0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
`;
export const LeftWrapper = styled.div`
  width: 340px;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
`;
export const UserList = styled.div`
  width: 320px;
  overflow: scool;
`;
export const UserItem = styled.div`
  width: 320px;
  height: 50px;
  padding 10px 25px;
  display: flex;
  &:hover, &.active {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  
`;

export const Nickname = styled.div`
  margin-left: 10px;
  margin-right: 20px;
  font-size: 16px;
  line-height: 30px;
  max-width: 200px;
  overflow: hidden;
`;
export const BadgeWrapper = styled.div`
    float: right;
`;
export const ImesTitle = styled.div`
  position: absolute;
  z-index: 9;
  background: #fff;
  top: 0px;
  right:0;
  width:620px;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding: 10px 40px;
  overflow: hidden;
  border-bottom: 1px solid red;
`;

export const MesItem = styled.div`
  min-height: 40px;
  font-size: 16px;
  text-align: left;
  position: relative;
  padding: 20px 12px;
  .mes {
    float: right;
    font-size: 14px;
    line-height: 1.5;
    text-aligh: left;
    background-color: #eee;
    border: 1px solid #d9d9d9;
    padding:12px;
  }
  .rightTime {
    position: absolute;
    bottom: -20px;
    right: 12px;
  }
  .triangle{
    position: absolute;
    right: 1px;
    top: 20px;
    width: 12px;
    height: 20px;
    border-left: 0px;
    border-right: 12px solid transparent;
    border-top: 20px solid #d9d9d9;
  }
  .inTriangle{
    position: absolute;
    right: 3px;
    top: 21px;
    width: 10px;
    height: 17px;
    border-left: 0px;
    border-right: 10px solid transparent;
    border-top: 17px solid #eee;
  }
`;

export const LeftMesItem = styled.div`
  min-height: 40px;
  font-size: 16px;
  text-align: left;
  position: relative;
  padding: 12px;
  .mes {
    float: left;
    font-size: 14px;
    line-height: 1.5;
    text-aligh: left;
    background-color: #eee;
    border: 1px solid #d9d9d9;
    padding:12px;
  }
  .leftTime {
    position: absolute;
    bottom: -20px;
    left: 12px;
  }
  .triangle{
    position: absolute;
    left: 1px;
    top: 12px;
    width: 12px;
    height: 20px;
    border-right: 0px;
    border-left: 12px solid transparent;
    border-top: 20px solid #d9d9d9;
  }
  .inTriangle{
    position: absolute;
    left: 3px;
    top: 13px;
    width: 10px;
    height: 17px;
    border-right: 0px;
    border-left: 10px solid transparent;
    border-top: 17px solid #eee;
  }
`;

export const MesTextArea = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0px;
  background: #fff;
  z-index: 9;
  width: 600px;
  padding 0 20px 20px 20px;
`;
export const MesList = styled.div`
  width: 600px;
  &.fixedRight{
    position: fixed;
  }
`;

