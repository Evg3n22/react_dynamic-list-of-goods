import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';

type SelectedData = 'getAll' | 'get5First' | 'getRedGoods' | '';

export const App: React.FC = () => {
  const [goodsList, setGoodsList] = useState<Good[]>([]);
  const [selectedData, setSelectedData] = useState<SelectedData>('');

  useEffect(() => {
    if (!selectedData) {
      return;
    }

    if (selectedData === 'getAll') {
      getAll()
        .then(setGoodsList)
        .catch(error => {
          throw new Error(`${error.message}`);
        });
    }

    if (selectedData === 'get5First') {
      get5First()
        .then(setGoodsList)
        .catch(error => {
          throw new Error(`${error.message}`);
        });
    }

    if (selectedData === 'getRedGoods') {
      getRedGoods()
        .then(setGoodsList)
        .catch(error => {
          throw new Error(`${error.message}`);
        });
    }
  }, [selectedData]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => setSelectedData('getAll')}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setSelectedData('get5First')}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => setSelectedData('getRedGoods')}
      >
        Load red goods
      </button>

      {selectedData && <GoodsList goods={goodsList} />}
    </div>
  );
};
