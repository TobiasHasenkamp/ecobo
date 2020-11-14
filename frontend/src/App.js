import './App.css';
import React from 'react';
import styled from "styled-components/macro";

function App() {
  return (
      <TestDiv>
        <p>Test</p>
      </TestDiv>
  );
}

export default App;


const TestDiv = styled.div`
  background-color: var(--color-darkgreen);
  color: var(--color-white);
`