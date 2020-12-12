
import styled from "styled-components/macro";


export const StyledWrapperTable = styled.div`

  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: auto;
  border: black solid 1px;
  margin: 20px 25px;
  width: auto;
  overflow: hidden;
`

export const StyledHeaderRow = styled.div`
    font-weight: bold;
    color: #ffffff;
    font-size: 4.5vw;
    padding: 6px 12px;
    display: table-cell;
    
    &.blue{
      background: #0066cc;
    }
    
    &.red{
      background: #b32d00;
    }
    
    &.red2{
      background: #cc3300;
    }
    
    &.turquoise{
      background: #009999;
    }
    
    &.lightblue{
      background: #3366ff;
    }
    
    &.brownRed{
      background: #993300;
    }
    
    &.purple{
      background: #993399;
    }
    
    &.yellow{
      background: #ffcc66;
    }
    
    &.orange{
      background: #eba434;
    }
    
    &.lightyellow{
      background: #ffff99;
    }
    
    &.green{
      background: var(--darkgreen);
    }
    
    &.lightgreen{
      background: #99ff99;
    }
    
    &.lightgrey{
    background: #E0E0E0;
    color: black;
    }
   
   @media (max-width: 300px) {font-size: 4.85vw;} 
   @media (min-width: 500px) {font-size: 4.0vw;}
   @media (min-width: 600px) {font-size: 3.5vw;}
   @media (min-width: 700px) {font-size: 3.0vw;}
   @media (min-width: 850px) {font-size: 2.4vw;}  
   @media (min-width: 1200px) {font-size: 1.9vw;}  
   @media (min-width: 1600px) {font-size: 1.35vw;}
   @media (min-width: 2000px) {font-size: 1.15vw;}
`

export const StyledCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
  font-size: 3.6vw;
  
   @media (max-width: 300px) {font-size: 4.15vw;}
   @media (min-width: 500px) {font-size: 3.0vw;}
   @media (min-width: 600px) {font-size: 2.6vw;}
   @media (min-width: 700px) {font-size: 2.2vw;}
   @media (min-width: 850px) {font-size: 1.9vw;}  
   @media (min-width: 1200px) {font-size: 1.5vw;}  
   @media (min-width: 1600px) {font-size: 1.05vw;}
   @media (min-width: 2000px) {font-size: 0.85vw;}
  
`

export const StyledNameCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
  font-size: 3.8vw;
  font-weight: bold;
  
   @media (max-width: 300px) {font-size: 4.35vw;}
   @media (min-width: 500px) {font-size: 3.2vw;}
   @media (min-width: 600px) {font-size: 2.8vw;}
   @media (min-width: 700px) {font-size: 2.4vw;}
   @media (min-width: 850px) {font-size: 2.1vw;}  
   @media (min-width: 1200px) {font-size: 1.65vw;}  
   @media (min-width: 1600px) {font-size: 1.15vw;}
   @media (min-width: 2000px) {font-size: 0.95vw;}
`

export const StyledElement = styled.div`
  display: grid;
  grid-template-rows: 0.15fr 1fr 1fr 0.35fr;
  background-color: lightgray;
  :nth-of-type(even){
    background: white;
  }
`

export const StyledElementBody = styled.div`
  display: grid;
  grid-template-columns: 47% 53%;
  justify-content: left;
`

export const StyledElementBodyOneCell = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: left;
`

export const StyledElementHeader = styled.div`
  display: grid;
  grid-template-columns: auto minmax(3px, auto) min-content;
  font-size: 4.0vw;
  
   @media (max-width: 300px) {font-size: 4.85vw;}
   @media (min-width: 500px) {font-size: 3.4vw;}
   @media (min-width: 600px) {font-size: 3.0vw;}
   @media (min-width: 700px) {font-size: 2.55vw;}
   @media (min-width: 850px) {font-size: 2.25vw;}  
   @media (min-width: 1200px) {font-size: 1.75vw;}  
   @media (min-width: 1600px) {font-size: 1.25vw;}
   @media (min-width: 2000px) {font-size: 1.05vw;}
`

export const StyledIconDiv = styled.div`
  margin: 6px 12px 0 0;
  display: flex;
  
`