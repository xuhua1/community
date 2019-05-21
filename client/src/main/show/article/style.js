import styled from 'styled-components';

export const ArticleyWrapper = styled.div`
  width: 960px;
  margin-left: -480px;
  position: absolute;
  top: 60px;
  left: 50%;
  img{
    display: block;
    margin: auto;
  }
`;

export const ContentWrapper = styled.div`
  padding: 10px;
`;

//img是加载图片刚开始样式没加载进来难看, 不知道打包之后效果怎么样
export const CommentWrapper = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  textarea {
    overflow: hidden;
    resize: none;
    width: 800px;
    padding: 10px;
    font-size:16px;
    letter-spacing:1px;
    line-height: 20px;
  }
  
  img {
    width: 32px;
    height: 32px;
  }
  .ant-list-item{
    padding-bottom: 0px;
    border: 0px;
  }
  .ant-list-item-content {
    margin-bottom: 0px !important;
  }
  .ant-comment-inner {
    padding-bottom: 0px;
  }
  ..ant-comment-actions {
    margin-top:0px !important;
  }
`;

export const Comment = styled.div`
  padding: 10px;
  background: green;

  button {
    margin-left: 20px;
  }
`;
export const CommentItem = styled.div`
  padding: 10px;
  margin-top: 20px;
  height: 200px;
  background: purple;
`;

export const LinkUser = styled.div`
  display: inline-block;
`;

export const SpanNum = styled.div`
  display: inline-block;
  padding-left: 8px;
  cursor: pointer;
`;