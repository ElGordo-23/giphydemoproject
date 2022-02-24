import { css } from '@emotion/react';

const paginationStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  select {
    position: fixed;
  }
  ul {
    list-style: none;
    margin: 0;
    margin-left: 35px;
    li {
      display: inline;
    }
  }
`;
export default function Paginate(props) {
  const pageNumber = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalNumberOfGifs / props.gifsPerPage);
    i++
  ) {
    pageNumber.push(i);
  }
  return (
    <nav css={paginationStyle}>
      <ul>
        {pageNumber.map((number) => {
          return (
            <li key="page-number">
              <a href="##" onClick={() => props.pageSelected(number)}>
                {number}
              </a>
            </li>
          );
        })}
      </ul>
      <select
        type="number"
        placeholder="10"
        onChange={(e) => props.itemsPerPage(e.currentTarget.value)}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
    </nav>
  );
}
