import browser from "./../ui/nightmare"


describe("Home Page", function () {
  it("see app", () => {
    let text = await page.evaluate(() => document.body.textContent).end()
    expect(text).toContain('Welcome to React')
  })
})