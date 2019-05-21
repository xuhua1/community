import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: 660px;
  min-height: 40px;
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
`;

export const TitleWrapper = styled.div`
  display: block;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  max-height: 53px;
  cursor: pointer;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; 
`;

export const NickName = styled.div`
  display: inline-block;
  max-width: 330px;
  cursor: pointer;
  color: #000000;
  margin-right: 20px;
`;

export const CommentNum = styled.div`
  display: inline-block;
  max-width: 100px;
  cursor: pointer;
  margin-right: 20px;
  color: #000000;
`;

export const LikeNum = styled.div`
  display: inline-block;
  max-width: 100px;
  cursor: default;
`;
