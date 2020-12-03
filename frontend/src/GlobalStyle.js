import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

html {
  height: 100%;
}

body {
    font-family: "Helvetica";
    margin: 0;
    height: 100%;
    
    a {
      color: var(--white);
      text-decoration: none;
      
      :hover {
          color: var(--lightgrey);
      }
      
      :active {
          color: var(--lightgrey);
      }
      
    }
}

  :root {
    --green: #158467;
    --darkgreen:  #00802b;
    --lightyellow: #fadcac;
    --white: #EEEDFF;
    --darkgrey: #222831;
    //dark mode
    --greengrey: #2F4858;
    --grey: #9EADBD;
    --lightgrey: #9BAEBC;
    --darkgrey2: #5F788A;
    --lightblue: #8BA1FF;
    
    --xs: 4px;
    --s: 8px;
    --m: 12px;
    --l: 16px;
    --xl: 20px;
    --xxl: 24px;
    --xxxl: 28px;
  
  }
`