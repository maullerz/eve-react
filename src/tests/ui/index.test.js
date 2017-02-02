import nightmare from "./nightmare"

describe("Home test", () => {
  it("see home", () => {
    nightmare("/")
      .evaluate(() => {
        return document.querySelector("#head a").innerHTML
      })
      .end()
      .then(function (result) {
        expect(result).toEqual('EVE-Prod.')
      })
      .catch(function (error) {
        expect(error).toBeNull()
      });
  })

  it("see donate", (done) => {
    nightmare("/")
      .click("#ah_donate")
      .evaluate(() => {
        return document.querySelector("body").innerHTML
      })
      .end()
      .then(function (text) {
        expect(text).toContain('donated')
        done()
      })
      .catch(function (error) {
        expect(typeof error).toBeNull()
        done()
      });
  })
  it("see component used", (done) => {
    nightmare("/")
      .click("#ah_item")
      .evaluate(() => {
        return document.body.innerHTML
      })
      .end()
      .then(function (text) {
        expect(text).toContain('Where components used?')
        done()
      })
      .catch(function (error) {
        expect(typeof error).toBeNull()
        done()
      });
  })
  it("see market", (done) => {
    nightmare("/")
      .click("#ah_market")
      .evaluate(() => {
        return document.querySelector("body").innerHTML
      })
      .end()
      .then(function (text) {
        expect(text).toContain('EVE Client')
        done()
      })
      .catch(function (error) {
        expect(typeof error).toBeNull()
        done()
      });
  })
})