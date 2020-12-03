
import styled from "styled-components/macro";


export const StyledWrapperTable = styled.div`

  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: auto;
  border: black solid 1px;
  margin: 25px;
  width: auto;
  overflow: hidden;
`

export const StyledHeaderRow = styled.div`
    font-weight: bold;
    color: #ffffff;
    font-size: 4.5vw;
    //font-size: 1.05em;
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
`

export const StyledCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
  //font-size: 0.8em;
  font-size: 3.60vw;
`

export const StyledNameCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
  //font-size: 0.9em;
  font-size: 3.8vw;
  font-weight: bold;
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
  grid-template-columns: minmax(40%, auto) auto;
  justify-content: left;
`

export const StyledElementHeader = styled.div`
  display: grid;
  grid-template-columns: auto minmax(3px, auto) min-content;
  font-size: 4.0vw;
`

export const StyledIconDiv = styled.div`
  margin: 6px 12px 0 0;
  display: flex;
  
`