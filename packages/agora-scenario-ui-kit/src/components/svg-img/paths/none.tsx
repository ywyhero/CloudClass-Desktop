import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => (
  <path
    fillRule="evenodd"
    clip-rule="evenodd"
    d="M28.5 20C28.5 24.6944 24.6944 28.5 20 28.5C15.3055 28.5 11.5 24.6944 11.5 20C11.5 15.3055 15.3055 11.5 20 11.5C24.6944 11.5 28.5 15.3055 28.5 20ZM30.8333 20C30.8333 25.983 25.983 30.8333 20 30.8333C14.0169 30.8333 9.16663 25.983 9.16663 20C9.16663 14.0169 14.0169 9.16663 20 9.16663C25.983 9.16663 30.8333 14.0169 30.8333 20ZM16.6583 15.0083C16.2027 14.5527 15.464 14.5527 15.0084 15.0083C14.5528 15.4639 14.5528 16.2026 15.0084 16.6582L23.3417 24.9916C23.7973 25.4472 24.536 25.4472 24.9916 24.9916C25.4472 24.536 25.4472 23.7973 24.9916 23.3416L16.6583 15.0083Z"
    fill={props.iconPrimary}
  />
);
export const viewBox = '0 0 40 40';
