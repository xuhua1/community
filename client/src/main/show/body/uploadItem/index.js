import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  ItemWrapper,
  TitleWrapper,
  NickName,
  CommentNum,
  LikeNum
} from '../paperItem/style';

const UploadItem  = (props) =>  (
  <div>
    {
      props.paperList.map((item, index)=>{
        return (
          <ItemWrapper key={item+index}>
              <Link to={`/upload/${item._id}`}>
                <TitleWrapper>
                { item.oneWord }
                </TitleWrapper>
              </Link>
            <div>
              <Link to={`/user/${item.userId}`}>
              <NickName>
                <span style={{color:"#adc6ff"}} className="iconfont">&#xe873;</span>&nbsp;{ item.nickname }
              </NickName>
              </Link>
              <CommentNum>
              <Icon type="message" />&nbsp;{ item.commentNum }
              </CommentNum>
            </div>
          </ItemWrapper>
        )
      })
    }
  </div>
)
export default UploadItem;
