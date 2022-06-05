import { css } from '@emotion/react';

export const AsideS = css`
  width: 200px;
  display: block;
  padding: 0 20px;
`;

export const DisplayS = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: #999;
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;

export const TableS = css`
  display: grid;
  gap: 2px;
  background-color: gray;
  border: 2px solid gray;
  div {
    width: 20px;
    height: 20px;
  }
`;
