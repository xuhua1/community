import { createGlobalStyle } from 'styled-components'

export const GlobalIconfont = createGlobalStyle`
  @font-face {font-family: "iconfont";
    src: url('./iconfont.eot?t=1551685195882'); /* IE9 */
    src: url('./iconfont.eot?t=1551685195882#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOUAAsAAAAAB4wAAANIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqCSII4ATYCJAMQCwoABCAFhG0HRhuoBsguIScbXgQkia4Td2xUVOtZ3ZUQ/ygZ4uHftc/7kvzZLBCVQfHxVQCgLKqq1qhKspWAQrGunkubuTr5IcwK0RPTeWU6EgQQW2BsnfqrpOhSlJ4MnlvS0EY84L1AEvS340Faz9UcJfZaYErrqvxUpL+vpa+DY6ZLa7A8m80lO3CA4wENqOOzyP5B/kX5l+G1i+EwrifQY8Em5GRVQwckKvCiQDwMBUYhMaVTaopDFZqSnWVxPBWnphMpCuCJ//PxD9KigqSTAa88dbvSDyU/8afw/tY04CLwx7NA2kfGNqAQd0tt19Ewtg3VY/yNzwGgqhI/6VP1GX8LPCyL2n94FUnIRANQ2Af2QSDzkzFJ/KxiEvxWBTK8EH11R3kXgecwbsz7hJDHplZOjl3TX/eLyYuPmUzvmSnvPi+jLz/tmueUaO1yb9SxLK3Lnpmf3dPWva6q21auZZJGKDcfnHpExse7WVLT6SmeeYwBR+BUcBrt5rMaCkbS4zc1e68OvB/I30UTI6Sv7hdkr/pesHsO+I7l1+8NP6obbl/tlxtjJ615wLvXGJJqerV0JFy4j7MfTDPsCxcsR2yIbDgVSg5bhko+WxJ3qOWd0+mj15/P0ATK9s42zgx2ss5p5Miz6K9YRGwg9YQjQWTO69cjJ/XQAtC+zjFcTPzCQS76P7/j1YdrnVbwP5EP4MfNQV27v0i6H7xkfmv+32gpAqD9T6QsxPpSdKlaRWkfUOy6p0hCD3HRcq4Rf8dQjBsRQk3xJUi6zENWrSELdht09NoHjeoI9Niqen+vURIVZQKwxREEYcgzSAa8g2zIb2TB/oGOCf+gMRQZepyOWSf22hD3JpZLHNXoZ2M7WMh0HU6NemJQ3IaBLdaoTAp9ShdKFQqy1KSUbLIaHZRjrFFbA2lac8ala7MqdDO0LJd50g2jqZOCWnt5ycm87IuSTNeGiU6Q0CgN+TFjdmBCTC4Hd/trE3Pf3wYFbGEZJWu6GqxdkKSEhmdSJUlpgayWOa26ruUlylYBaTSNYzjJZWOq0DRksbgYr3xaGDJpSYI9Ip48yaQXbytLml9hP+EB6IHHlTAIJT4SB12HtsZGRydYITOCm81Ex89yRm0EAA==') format('woff2'),
    url('./iconfont.woff?t=1551685195882') format('woff'),
    url('./iconfont.ttf?t=1551685195882') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('./iconfont.svg?t=1551685195882#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-comment:before {
    content: "\e646";
  }

  .icon-licke-c:before {
    content: "\e603";
  }

  .icon-nickname:before {
    content: "\e873";
  }
`;