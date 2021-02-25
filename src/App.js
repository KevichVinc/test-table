import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import Table from './components/Table/Table';

function App() {
  const [isLoading, setLoadStatus] = useState(true);
  const [data, setData] = useState([]);
  const [sortParams, setSortParams] = useState({
    sort: 'asc',
    sortField: 'id',
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        );
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
        setLoadStatus((loading) => (loading = false));
      } catch {
        throw new Error('Ошибка загрузки данных для таблицы');
      }
    }
    getData();
  }, [sortParams.sortField]);

  const handleSortChange = (e) => {
    console.log(e.target.id);

    const sortField = e.target.id;
    const clonedData = data.concat();
    let sortType = sortParams.sort === 'asc' ? 'desc' : 'asc';
    let sortedData = clonedData.sort((a, b) => {
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

    setData((dataToSet) => (dataToSet = sortedData));
    setSortParams(
      (params) =>
        (params = {
          sort: sortType,
          sortField,
        })
    );
  };

  return (
    <div className='App'>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          data={data}
          handleSortChange={handleSortChange}
          sortParams={sortParams}
        />
      )}
    </div>
  );
}

export default App;
