const puppeteer = require('puppeteer');

let user = ''
let pass = ''

let campeonatos = []

let data = new Date()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://extra.bet365.com/results/br');

  await page.click('.mobileLogin')
  await page.waitForSelector('#txtUsername')
  await page.type('#txtUsername', user)
  await page.type('#txtPassword', pass)
  await page.click('#login-button')

  await page.waitForNavigation()

  for(let i = 6;i<10;i++){
    await page.goto('https://extra.bet365.com/results/br?sl=1#type=Members;key=hopper;')
    await page.click('.home-page__search-button')
    await page.waitForSelector('.modal-sub-heading__search-text')
    await sleep(500)
    await page.waitForSelector('.results-modal__header-title')
    await page.type('.modal-sub-heading__search-text', 'futebol virtual')
    await page.waitForSelector('[tabindex="4"]')
    await sleep(500)
    await page.click('[tabindex="4"]')
    const infodata = {
      sem: ["Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",],
      mes: ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    }
    const diadasem = infodata.sem[data.getDay()%7]
    const mes = infodata.mes[data.getMonth()]
    const diadomes = data.getDay()
    const ano = data.getFullYear()

    await page.click(`[aria-label="${diadasem} ${mes} 0${diadomes} ${ano}"]`)
    await page.click(`[aria-label="${diadasem} ${mes} 0${diadomes} ${ano}"]`)
//    document.querySelector(`[aria-label="${infodata.sem[data.getDay()%7]}"]`)
//    document.querySelector(`[aria-label="${infodata.sem[data.getDay()%7]}"]`)

    await page.click('#date-picker__confirm-text')

    await sleep(2000)
    await page.screenshot({path:'hora.png'})
    await page.click('[tabindex="6"]')
    await page.waitForNavigation()

    await page.evaluate(() => {
      const handel = () => {
        const jogosgratis = document.querySelectorAll('.point-result__fixture-participant').length
        return jogosgratis
      }
      for(let o = 0;o<=handel;o++){
        const hendel = document.querySelectorAll('.market-search__link-name')
        const n1 = hendel[o].innerHTML
        o++
        const n2 = hendel[o].innerHTML
        console.log(`${n1} VS ${n2}`)
//        const upa = () => {
          const games = JSON.stringify(document.querySelectorAll(`.point-result__fixture-participant`))
//          return games}
//        const upala = JSON.parse(upa)

        for(let b = 0;b>games.length;b++){
          games[b].click()
          const dataria = querySelector('.market-search__link-content-wrapper').querySelector('market-search__link-variables market-search__link-variables--hidden').querySelectorAll('.market-search__link-variables-row')
          console.log(dataria[b])
        }
      }
    })
  }
//  await page.waitForSelector('.remindLater')
//  await page.evaluate(() => document.querySelector('').click(), '')

//       campeonatos[i].partidas.push({partida:`${handel[o].innerHTML} VS ${handel[o++].innerHTML}`})
//               await page.click(hendel[0])
//               await page.evaluate(() => detasPage = document.querySelectorAll('.market-search__link-name'))
//               for(c=0;c<=detasPage.length;c++){
//                let loucs = detasPage.querySelector('.market-search__link-content-wrapper').querySelector('market-search__link-variables market-search__link-variables--hidden').querySelectorAll('.market-search__link-variables-row')
//                for(f=0;f<=loucs.length;f++){
//                  campeonatos[i].partidas[o] = campeonatos[i].partidas[o] + `/${loucs[f].innerHTML}`
//                }
//                await page.evaluate(() => document.querySelector('[aria-label="Back"]').click())
//               }
        
})();
