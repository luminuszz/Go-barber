import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing : border-box;
  outline: 0;
}
body{
  background: #312e38;
  color:#fff;
  -webkit-font-smoothing: antialiased;
}

:root{
  --color-primary: #28262E;
  --color-secondary: #3E3B47;
  --color-orange: #FF9000;
  --color-text: #F4EDE8;
  --color-quaternary: #999591;
  --max-x: 1120px;
}


body,input,button{
  font-family: 'Roboto Slab', serif;
  font-size:16px;


}
h1, h2,h3,h4,h5,h6, strong{
  font-weight: 500;

}
button {
  cursor: pointer;
}


`;
