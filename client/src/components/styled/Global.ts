import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

  *{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    font-family: "Nunito", sans-serif;
    outline:none;
  }

  img{
    border-radius:50px;
    height:60px;
    width:60px;
    border:1px solid #777;
  }

  a{
    text-decorations:none;
    color:black;
  }
  
  button{
    outline:none;
    border:none;
  }
`;

export default GlobalStyle;
