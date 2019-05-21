import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  ItemWrapper,
  TitleWrapper,
  NickName,
  CommentNum,
  LikeNum
} from './style';

const PaperItem  = (props) =>  (
  <div>
    {
      props.paperList.map((item, index)=>{
        return (
          <ItemWrapper key={item+index}>
              <Link to={`/article/${item._id}`}>
                <TitleWrapper>
                { item.articleTitle }
                </TitleWrapper>
              </Link>
            <div>
              <Link to={`/user/${item.userId}`}>
              <NickName>
                <span style={{color:"#adc6ff"}} className="iconfont">&#xe873;</span>&nbsp;{ item.nickname }
              </NickName>
              </Link>
              <CommentNum>
                <span style={{color:"#adc6ff"}} className="iconfont">&#xe646;</span>&nbsp;{ item.commentNum }
              </CommentNum>
              <LikeNum style={{marginLeft: 10, color:"#b7eb8f", fontSize: 17}}>
              {
                item.articleType==="markdown"?<Icon type="file-markdown" />:<Icon type="edit" />
              }
              </LikeNum>
            </div>
          </ItemWrapper>
        )
      })
    }
  </div>
)
export default PaperItem;
