/**
 * @name Walmart shopping cart
 * @desc Goes to walmart.com and adds a Nintendo game to an empty shopping cart. Validates the correct amount.
 */

const assert = require('assert')
const puppeteer = require('puppeteer')
let browser
let page

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
})

describe('Walmart shopping cart', () => {
  it('shows the correct product', async () => {
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600', { waitUntil: 'networkidle2' })
    const productTitle = await page.evaluate(() => document.querySelector('h1.prod-ProductTitle').textContent)
    assert.equal(productTitle, 'Super Mario Odyssey (Nintendo Switch)')
  }).timeout(20000)

  it('adds the product to the cart', async () => {
    await page.click('button.prod-ProductCTA--primary')
    await page.waitForSelector('.Cart-PACModal-ItemInfoContainer')
    const quantity = await page.evaluate(() => document.querySelector('a.OrderSummary-SubTotal-itemCountLink').textContent)
    assert.equal(quantity, '(1 item)')
  }).timeout(10000)

  after(async () => {
    await browser.close()
  })
})
