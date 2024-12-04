import styled from "styled-components";

export const VisorContainer = styled.div`
  width: 100%;
  height: 75px;
  background-color: #AAF;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  font-size: 24px;
  font-family: 'Roboto';

  #operations, #result {
    width: 100%;
    height: 75px;
    background-color: #AAF;
    border: 0;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;

    color: #FFF;
    font-size: 24px;
    font-family: 'Roboto';
  }

  #result {
    font-size: 32px;
  }
`