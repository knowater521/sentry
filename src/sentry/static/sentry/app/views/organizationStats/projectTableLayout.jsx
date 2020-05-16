import styled from '@emotion/styled';

import space from 'sentry/styles/space';
import overflowEllipsis from 'sentry/styles/overflowEllipsis';

export const ProjectTableLayout = styled('div')`
  display: grid;
  grid-template-columns: auto 110px 120px 100px 100px;
  width: 100%;
`;

export const ProjectTableDataElement = styled('div')`
  text-align: right;
  padding: 0 ${space(0.5)};
  ${overflowEllipsis};
`;
