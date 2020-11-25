
import styled from "styled-components/macro";


export const StyledWrapperTable = styled.div`

  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: auto;
  border: black solid 1px;
  margin: 25px;
`

export const StyledHeaderRow = styled.div`
    font-weight: bold;
    color: #ffffff;
    font-size: 1.05em;
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
      background: #ff944d;
    }
    
    &.lightyellow{
      background: #ffff99;
    }
    
    &.green{
      background: forestgreen;
    }
    
    &.lightgreen{
      background: #99ff99;
    }
`

export const StyledCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
    font-size: 0.8em;
`

export const StyledNameCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
  font-size: 0.9em;
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
  grid-template-columns: 50% 50%;
`

export const StyledElementHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 0.12fr;
`

export const StyledIconDiv = styled.div`
  margin: 6px 12px 0 0;
  display: flex;
  
`