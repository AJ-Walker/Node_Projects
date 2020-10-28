const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const page2 = await browser.newPage();

    const searchProduct = "Redmi note 9"; // Enter products you want to search.

    await page.goto('https://www.amazon.in/' , {waitUntil: 'networkidle2'});
    await page2.goto('https://www.flipkart.com/' , {waitUntil: 'networkidle2'});

    await page.type('.nav-search-field input',searchProduct);
    await page2.type('.LM6RPg',searchProduct);
    
    await page.click('.nav-input');
    await page2.click('.vh79eN');
    await page.waitFor(5000);
    await page2.waitFor(5000);
    

    await page.goto(`https://www.amazon.in/s?k=${searchProduct}&ref=nb_sb_noss_2`);
    await page2.goto(`https://www.flipkart.com/search?q=${searchProduct}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as-pos=1&as-type=HISTORY`);
    
    const result = await page.evaluate(() => {
      let titlePrd = document.querySelectorAll("span.a-size-medium.a-color-base.a-text-normal");
      //let pricePrd = document.querySelectorAll(".a-price-whole");
      const titlePrdList = [...titlePrd];
      //const pricePrdList = [...pricePrd];
      return titlePrdList.map(h => h.innerText);
    });

    const result2 = await page2.evaluate(() => {
      let titlePrd2 = document.querySelectorAll("._3wU53n");
      //let pricePrd2 = document.querySelectorAll("._1vC4OE._2rQ-NK");
      const titlePrdList2 = [...titlePrd2];
      //const pricePrdList2 = [...pricePrd2];
      return titlePrdList2.map(h2 => h2.innerText);
    });

    console.log(result);
    console.log(result2);
  
    await browser.close();
})();
console.log("Working Proper")
