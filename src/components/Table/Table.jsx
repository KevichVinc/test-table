import React from 'react';
import SortType from './SortType/SortType';

export default function Table(props) {
  const { onSortChange, data, sortParams, onRowSelect } = props;

  const handleSortChange = (sortField) => {
    onSortChange(sortField);
  };

  const handleRowSelect = (row) => {
    onRowSelect(row);
  };

  return (
    <table className='table'>
      <thead>
        <tr>
          <th onClick={() => handleSortChange('id')}>
            ID <SortType sortParams={sortParams} columnName={'id'} />
          </th>
          <th onClick={() => handleSortChange('firstName')}>
            First Name
            <SortType sortParams={sortParams} columnName={'firstName'} />
          </th>
          <th onClick={() => handleSortChange('lastName')}>
            Last Name
            <SortType sortParams={sortParams} columnName={'lastName'} />
          </th>
          <th onClick={() => handleSortChange('email')}>
            E-mail
            <SortType sortParams={sortParams} columnName={'email'} />
          </th>
          <th onClick={() => handleSortChange('phone')}>
            Phone
            <SortType sortParams={sortParams} columnName={'phone'} />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id + item.phone} onClick={() => handleRowSelect(item)}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
