import { css } from '@emotion/react';

const pageNumberStyles = css`
  list-style: none;
  float: left;
  li.hover {
    text-decoration: underline;
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
    <nav>
      <ul css={pageNumberStyles}>
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
    </nav>
  );
}
