import React, { useEffect } from 'react';
import { getPSEStocksState, scrape } from '../scraping/pse-stock-list';

const PSEStockList = () => {
  const { stocks } = getPSEStocksState();
  useEffect(() => {
    if(!stocks.length) {
      scrape();
    }
  }, [stocks.length])

  return <div>PSEStockList</div>
}

export default PSEStockList;