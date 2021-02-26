import React from 'react';
import arrowDown from '../../../assets/down-arrow.png';
import arrowUp from '../../../assets//up-arrow.png';

export default function SortType(props) {
  const { sortParams, columnName } = props;
  return sortParams.sortField === columnName ? (
    sortParams.sortType === 'asc' ? (
      <img src={arrowDown} alt='asc' />
    ) : (
      <img src={arrowUp} alt='dsc' />
    )
  ) : null;
}
