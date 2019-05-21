import { createGlobalStyle } from 'styled-components'

export const Globalstyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html, body, #root{
    width: 100%;
    height: 100%;
    background: #f0f2f5;
  }
  #root {
    position: relative;
  }
  body {
    line-height: 1;
    position: relative;
    margin: 0;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .edit-draft-editor {
    width: 960px;
    font-size: 18px;
    padding: 20px 20px 40px 20px;
    background: white;
    height: auto !important;
    position: fixed;
    top: 120px;
    left: 50%;
    bottom: 60px;
    margin-left: -480px;
    img {
      max-width: 600px;
    }
  }
  .DraftEditor-root {
    height:auto !important;
  }
  .edit-draft-toolbar {
    width: 100%;
    background: rgba(222,222,222,.5) !important;
    position: fixed;
    top: 0;
    display: flex !important;
    justify-content: center !important;
    z-index: 999;
  }
  .edit-draft-wrapper {
    width: 100%;
    height: 100%;
  }
  .DraftEditor-root{
  }
  .rdw-image-modal-upload-option-label {
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
  }
  textarea {
    resize:none !important;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .for-markdown-preview {
    line-height: 2;
  
    p,
    blockquote,
    ul,
    ol,
    dl,
    pre {
      margin-top: 0;
      margin-bottom: .6em;
    }
  
    h1,
    h2 {
      border-bottom: 1px solid #e2e2e2;
    }
  
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 0;
      margin: 0 0 .6em;
      font-weight: 600;
  
      text-indent: 0;
  
      &:target {
        padding-top: 4.5rem;
      }
    }
  
    a {
      color: #0366d6;
      text-decoration: none;
  
      &:hover {
        text-decoration: underline;
      }
    }
  
    
    ul,
    ol {
      padding: .2em .8em;
  
      > li {
        line-height: 2;
        padding-left: .2em;
        margin-left: .2em;
        list-style-type: disc;
  
        > p {
          text-indent: 0;
        }
  
        > ul {
          li {
            list-style-type: circle;
          }
  
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    
    > ul, ol {
      padding: 0 20px;
    }
  
    ol > li {
      list-style-type: decimal;
    }
  
    blockquote {
      margin: 0;
      margin-bottom: .6em;
      padding: 0 1em;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
  
      p {
        text-indent: 0;
  
        &:first-child {
          margin-top: 0;
        }
  
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  
    pre {
      padding: .6em;
      overflow: auto;
      line-height: 1.6;
      background-color: #aaa;
      border-radius: 3px;
  
      code {
        padding: 0;
        margin: 0;
        font-size: 100%;
        background: transparent;
      }
    }
  
    code {
      padding: 0.2em 0.4em;
      margin: 0;
      background-color: #f0f0f0;
      border-radius: 3px;
    }
  
    hr {
      margin-bottom: .6em;
      height: 1px;
      background: #dadada;
      border: none;
    }
  
    table {
      width: 100%;
      border: 1px solid #ddd;
      margin-bottom: .6em;
      border-collapse: collapse;
      text-align: left;
      th, td {
        padding: .1em .4em;
        border: 1px solid #ddd;
      }
    }
  
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      margin-bottom: .6em;
    }
  }
}
`