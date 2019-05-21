import styled from 'styled-components';
import logoPic from '../../static/logo.png';
import { Card } from 'antd';
export const LoginWrapper = styled.div`
  width: 960px;
  margin-left: -480px;
  position:absolute;
  left: 50%;
  top: 5px;
  bottom: 20px;
  overflow: hidden;
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

export const LoginBox = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 180px;
  .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .login-form {
    max-width: 300px;
  }
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`;
export const RegisterBox = styled.div`

`;

export const RegisterItem = styled.div`
  width: 600px;
  position: absolute;
  left: 50%;
  top: 120px;
  margin-left: -420px;
  .ant-input-password input {
    padding-left: 11px!important;
  }
`;

export const UserBox = styled.div`
  width: 960px;
  margin-left: -480px;
  position:absolute;
  left: 50%;
  top: 5px;
  bottom: 20px;
  overflow: hidden;
`;

export const UserWrapper = styled.div`
  width: 960px;
  margin-left: -480px;
  position: absolute;
  top: 60px;
  left: 50%;
`;
export const TabsWrapper = styled.div`

`;
export const InfoWrapper = styled.div`
  margin 20px 0;
`;

export const NickName = styled.div`
  font-size: 15px;
  font-weight: 900;
  margin: 10px 0;
`;

export const Follow = styled.div`
  display: inline-block;
  width: 50px;
  font-size: 15px;
`;

export const Sign = styled.div`

`;

export const ColWrapper = styled.div`

`;
export const ColTitle = styled.div`
  text-align: left;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ColNum = styled.div`
  text-align: left;
  font-size: 14px;
`;

export const SettingWrapper = styled.div`
  margin-top: 60px;
`;

/**
 * avatarPick
 */
export const PickWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 999;
`;
export const Pick = styled.div`
  position: absolute;
  background: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;
export const ImageWrapper = styled.div`
  width: 440px;
  position: absolute;
  left: 50%;
  top: 80px;
  margin-left: -220px;
  img {
    width: 440px;
    opacity: 0.4;
  }
`;

export const RightButton = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: red;
  margin-right: -8px;
  margin-top: -8px;
  right: 0;
  top: 50%;
  cursor: w-resize;
  -ms-transform:rotate(45deg); /* Internet Explorer */
  -moz-transform:rotate(45deg); /* Firefox */
  -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
  -o-transform:rotate(45deg); /* Opera */
`;
export const BottomCenterButton = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: red;
  margin-bottom: -8px;
  margin-left: -8px;
  bottom: 0;
  left: 50%;
  cursor: n-resize;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg); /* Internet Explorer */
  -moz-transform:rotate(45deg); /* Firefox */
  -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
  -o-transform:rotate(45deg); /* Opera */
`;
export const BottomRightButton = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: red;
  margin-bottom: -8px;
  margin-right: -8px;
  bottom: 0;
  right: 0;
  cursor: nw-resize;
 
`;

/**
 * setting
 */
export const WrapCard = styled(Card)`
  background: rgb(255,255,255);
  border: 1px solid gray;
  text-align: center;
`;
export const AvatarWrapper = styled.div`
  margin: 20px;
`;