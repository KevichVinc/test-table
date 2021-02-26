import React, { useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import TableSearch from './components/TableSearch/TableSearch';
import Loader from './components/Loader/Loader';
import Table from './components/Table/Table';
import DetailRowView from './components/DetailRowView/DetailRowView';
import ModeSelector from './components/ModeSelector/ModeSelector';

function App() {
  const [isLoading, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const [sortParams, setSortParams] = useState({
    sortType: 'asc',
    sortField: 'id',
  });
  const [isRow, setRowStatus] = useState(null);
  const [isModeSelected, setMode] = useState(false);
  const [currentPage, setNewPage] = useState(0);
  const [search, setSearch] = useState('');

  const handleSortChange = (sortField) => {
    let sortType = sortParams.sortType === 'asc' ? 'desc' : 'asc';
    console.log(sortType);
    let sortedData = data.sort((a, b) => {
      if (a[sortField] > b[sortField]) {
        return 1;
      }

      if (a[sortField] < b[sortField]) {
        return -1;
      }

      return 0;
    });

    if (sortType === 'desc') {
      sortedData = sortedData.reverse();
    }

    setData(sortedData);
    setSortParams({
      sortType,
      sortField,
    });
  };

  const handleRowSelect = (row) => {
    setRowStatus((newRow) => (newRow = row));
  };

  async function getData(url) {
    try {
      const response = await axios.get(url);
      setData(
        (previousData) =>
          (previousData = response.data.sort((a, b) => {
            if (a[sortParams.sortField] > b[sortParams.sortField]) {
              return 1;
            }

            if (a[sortParams.sortField] < b[sortParams.sortField]) {
              return -1;
            }

            return 0;
          }))
      );
      setLoadStatus(false);
    } catch {
      throw new Error('Ошибка загрузки данных для таблицы');
    }
  }

  const modeSelectHandler = (url) => {
    setMode(true);
    getData(url);
  };

  const pageChangeHandler = ({ selected }) => {
    setNewPage(selected);
  };

  function getFilteredData() {
    if (!search) {
      return data;
    }

    return data.filter((item) => {
      return (
        item['firstName'].toLowerCase().includes(search.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
        item['email'].toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  const filteredData = getFilteredData();
  const pageSize = 50;
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const displayData = _.chunk(filteredData, pageSize)[currentPage];

  const handleSearch = (value) => {
    setNewPage(0);
    setSearch(value);
  };

  if (!isModeSelected) {
    return (
      <div className='container'>
        <ModeSelector onSelect={modeSelectHandler} />
      </div>
    );
  }

  return (
    <div className='App'>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <TableSearch onSearch={handleSearch} />
          <Table
            data={displayData}
            onSortChange={handleSortChange}
            sortParams={sortParams}
            onRowSelect={handleRowSelect}
          />
        </React.Fragment>
      )}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        forcePage={currentPage}
      />
      {isRow ? <DetailRowView person={isRow} /> : null}
    </div>
  );
}

export default App;
