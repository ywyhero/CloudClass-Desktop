import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => (
  <g fill="none">
    <path
      d="M12.5 15L8 19.5M8 19.5L8 16.7368M8 19.5L10.7632 19.5"
      stroke={props.iconPrimary}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 12.5L19.5 8M19.5 8L19.5 10.7632M19.5 8L16.7368 8"
      stroke={props.iconPrimary}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
);

export const viewBox = '0 0 28 28';
