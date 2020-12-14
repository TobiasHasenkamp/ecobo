import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

html {
  height: 100%;
}


#StyledMapMarker {
  background: none;
}

body {
    font-family: Helvetica;
    margin: 0;
    height: 100%;
    background: var(--main-background-color);
    
    a {
      color: var(--white);
      text-decoration: none;
      
      :hover {
          color: var(--neutral-color-lightgrey);
      }
      
      :active {
          color: var(--neutral-color-lightgrey);
      }
      
    }
}

  :root {
  
    //Standard theme
    --main-color: #008744;
    --main-background-color: white;
    --neutral-color-black: black; 
    --neutral-color-darkgrey: #222831;
    --neutral-color-lightgrey: #9BAEBC;
    --tag-color-grey: lightgrey;
  
    /*--green: #158467;
    --darkgreen: #008744;
    --lightyellow: #fadcac;
    --white: #EEEDFF;
    --darkgrey: #222831;
    //dark mode
    --greengrey: #2F4858;
    --grey: #9EADBD;
    --lightgrey: #9BAEBC;
    --darkgrey2: #5F788A;
    --lightblue: #8BA1FF;*/
    
    --xs: 4px;
    --s: 8px;
    --m: 12px;
    --l: 16px;
    --xl: 20px;
    --xxl: 24px;
    --xxxl: 28px;
  
  }
`