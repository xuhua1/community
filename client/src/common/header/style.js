import styled from 'styled-components';
import logoPic from '../../static/logo.png';

export const HeaderWrapper = styled.div`
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0；
  z-index: 999;
`;

export const Nav = styled.div`
  height: 60px;
  width: 960px;
  margin: 0 auto;
  position: relative;
  background: #13c2c2;
`;

export const Logo = styled.div`
  position: absolute;
  top: 7px;
  left: 0;
  display: block;
  width: 60px;
  height: 45px;
  margin-right: 10px;
  background: url(${logoPic});
  background-size: contain;
`;

export const SearchWrapper = styled.div`
  width: 300px;
  position: absolute;
  left: 80px;
  button{
    position: absolute;
    right: -80px;
    margin-top: 13px;
  }
`;

export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
  width: 220px;
  height: 40px;
  padding: 0 20px;
  margin-top: 9px;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid #CCC;
  outline: none;
  background: #eee;
  font-size: 15px;
  font-weight: bold;
  color: #666;
  z-index: 999;
  &::placeholder {
    color: #aaa;
  }
  &.focused {
    width: 300px;
  }
  &.slide-enter {
    transition: all 300ms ease-out;
  }
  &.slide-enter-active {
    width: 300px;
  }
  &.slide-exit {
    transition: all 300ms ease-in;
  }
  &.slide-exit-active {
    width: 220px;
  }
`;

export const SearchHistory = styled.div`
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 49px;
  width: 300px;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .2);
  box-sizing: content-box;
  z-index: 1000;
`;

export const HistoryItem = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 300px;
  height: 30px;
  font-size: 16px;
  color: blue;
  line-height: 20px;
  border-radius: 5px;  
  cursor:default;
  &:hover {
    background: #ffadd2;
  }
`;

export const InfoItem = styled.div`
  margin-right: 40px;
  padding: 5px 0 5px 20px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
`;

export const DeleteHistoryItem = styled.span`
  width: 30px;
  height: 30px;
  color: #222;
  font-size: 12px;
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  cursor:pointer;
`;

export const RightWrapper = styled.div`
  position: absolute;
  right: 20px;
  width: 220px;
  height: 60px;
  #components-dropdown-demo-placement .ant-btn {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

export const Login = styled.div`
  display: block;
  padding: 0 20px;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 9px;
  height: 40px;
  line-height: 35px;
  font-size: 20px;
  border: solid purple 1px;
  cursor:pointer;
`;

export const Write = styled.div`
  display: block;
  padding: 0 20px;
  border-radius: 15px;
  position: absolute;
  top: 9px;
  right: 0;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  border: solid purple 1px;
  cursor:pointer;
`;
