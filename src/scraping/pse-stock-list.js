const { openBrowser, closeBrowser, text, goto, evaluate, click, above } = require('taiko');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const homedir = require('os').homedir();
const fs = require('fs');

const dbDirectory = `${homedir}/fire_quant_db`;
if(!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory)
}

const adapter = new FileSync(`${dbDirectory}/pse_stocks.json`);
const db = low(adapter);

db.defaults({ stocks: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).write();

export const getPSEStocksState = () => {
  return db.getState();
}

export const scrape = () => {
  (async () => {
      try {
          await openBrowser({headless: true});
          try {
            await goto(`https://edge.pse.com.ph/companyDirectory/form.do`, {
              waitForNavigation: true,
              navigationTimeout: 1000 * 60 * 5
            });
          } catch (error) {
            console.log('Failed to load. Skipping...');
          }
          const numPages = await evaluate(() => { 
            return document.querySelectorAll('div.paging span').length;
          });
          for (let x = 1; x <= numPages; x++) {
            await click(text((x).toString()), above('Disclaimer'));
            const stocks = await evaluate(() => {
              const elements = document.querySelectorAll('div#dataList table.list tbody tr td');
              const arrElements = [...elements];
              const list = [];
              const regex = /[0-9]+/g;
              for (let y = 0; y < elements.length/5; y++) {
                const arr = arrElements.splice(0, 5);
                const ids = arr[0].firstElementChild.getAttribute('onclick').match(regex);
                const stock = {
                  companyName: arr[0].firstElementChild.innerText,
                  stockSymbol: arr[1].firstElementChild.innerText,
                  sector: arr[2].innerText,
                  subSector: arr[3].innerText,
                  listingDate: arr[4].innerText,
                  companyId: ids[0],
                  securityId: ids[1]
                }
                list.push(stock);
              }
              return list;
            });
            db.set('stocks', [...db.get('stocks').value(), ...stocks]).write();
          }
      } catch (error) {
        console.error(error);
      } finally {
        await closeBrowser();
      }
  })();
}
