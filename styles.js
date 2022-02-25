import { css } from '@emotion/react';

export const gifList = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 0.5rem;
  li {
    list-style: none;
    max-width: 210px;
  }
`;

export const heartStyle = css`
  color: black;
  left: 90px;
  position: relative;
  :hover {
    transition: 0.5s ease-in;
    color: red;
  }
  :active {
    transform: translateY(-10px);
  }
`;
export const containerMain = css`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  top: 100px;
  max-width: 1500px;
`;
export const controlsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10%;
  button {
    display: inline-block;
    border: 0.1em solid #ffffff;
    padding: 0.35em 1.2em;
    margin-top: 10px;
    width: 100px;
    background-color: black;
    color: white;
    text-align: center;
    cursor: pointer;
  }
`;
export const allGifsWrapper = css`
  overflow: scroll;
  height: 500px;
  border: 5px solid black;
  padding: 15px;
  margin-right: 10px;
  width: 45%;
`;
export const favGifsWrapper = css`
  .favsWrapper {
    display: flex;
    flex-direction: column;
    width: 600px;
    align-items: center;
  }
  overflow: scroll;
  height: 500px;
  width: 45%px;
  border: 5px solid black;
  padding: 15px;
  margin-left: 10px;
  position: relative;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
