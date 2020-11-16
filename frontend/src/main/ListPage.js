import PageHeader from "./PageHeader";
import React from "react";
import styled from "styled-components/macro";

export default function ListPage() {

    return(

        <div>

            <PageHeader title="EcoMap"/>


            <StyledWrapperDiv>

                {/*=========================================================
                BIOLÄDEN
                =========================================================*/}
                <StyledWrapperTable name="Bioläden">
                    <StyledHeaderRow className="red">
                            Bioläden
                    </StyledHeaderRow>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                        <StyledNameCell>
                            Bioladen 1
                        </StyledNameCell>
                        <StyledCell>
                            Unverpackt-Laden
                        </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 59
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                Bioladen 2
                            </StyledNameCell>
                            <StyledCell>
                                Bio-Supermarkt
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 60
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                </StyledWrapperTable>



                {/*=========================================================
                ECO-FASHION-STORES
                =========================================================*/}
                <StyledWrapperTable name="Eco-Fashion-Stores">
                    <StyledHeaderRow className="blue">
                        Eco-Fashion-Stores
                    </StyledHeaderRow>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                ECFS 1
                            </StyledNameCell>
                            <StyledCell>
                                ....
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 59
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                ECFS 2
                            </StyledNameCell>
                            <StyledCell>
                                ....
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 60
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                </StyledWrapperTable>


                {/*=========================================================
                RESTAURANTS
                =========================================================*/}
                <StyledWrapperTable name="Restaurants">
                    <StyledHeaderRow className="yellow">
                        Restaurants
                    </StyledHeaderRow>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                Restaurant 1
                            </StyledNameCell>
                            <StyledCell>
                                ....
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 59
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                Restaurant 2
                            </StyledNameCell>
                            <StyledCell>
                                ....
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 60
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                </StyledWrapperTable>

                {/*=========================================================
                Weltläden
                =========================================================*/}
                <StyledWrapperTable name="Weltläden">
                    <StyledHeaderRow className="green">
                        Weltläden
                    </StyledHeaderRow>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                Weltladen 1
                            </StyledNameCell>
                            <StyledCell>
                                ....
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 59
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                    <StyledElement>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                Weltladen 2
                            </StyledNameCell>
                            <StyledCell>
                                ....
                            </StyledCell>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                Bo-Mitte, Teststr. 60
                            </StyledCell>
                            <StyledCell>
                                Symbole...
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>

                </StyledWrapperTable>


                {/* at the moment necessary to keep the full list visible when scrolling */}
                <br/>
                <br/>
                <br/>
                <br/>

            </StyledWrapperDiv>

        </div>

    );

}


const StyledWrapperDiv = styled.div`
  display: block;
  width: auto;
  height: 90vh;
  overflow: scroll;
`

const StyledWrapperTable = styled.div`

  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: auto;
  border: black solid 1px;
  margin: 25px;
`

const StyledHeaderRow = styled.div`
    font-weight: bold;
    color: #ffffff;
    font-size: 1.05em;
    padding: 6px 12px;
    display: table-cell;
    
    &.blue{
      background: blue;
    }
    
    &.red{
      background: #ea6153;
    }
    
    &.yellow{
      background: darkorange;
    }
    
    &.green{
      background: forestgreen;
    }
`

const StyledCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
    font-size: 0.8em;
`

const StyledNameCell = styled.div`
  padding: 6px 12px;
  display: table-cell;
  font-size: 0.9em;
  font-weight: bold;
`

const StyledElement = styled.div`
  display: grid;
  grid-template-rows: 0.15fr 1fr 1fr 0.35fr;
  background-color: lightgray;
  :nth-of-type(2){
    background: white;
  }
`

const StyledElementBody = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`

const StyledElementHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`