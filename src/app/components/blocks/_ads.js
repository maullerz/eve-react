import React, {Component} from 'react'

class Ads extends Component {

  // componentDidMount() {
  //   if (!document.getElementById(window.AID)) {
  //     let e = document.createElement("div")
  //     e.id = window.AID
  //     e.style = "font-size: 1.4em;margin-bottom: 3px;padding: 10px;background: rgba(39,39,40,0.9);text-align: center;font-weight: bold;color: #fff"
  //     e.innerHTML ="Advertising helps me to maintain my website and integrate new functionality." +
  //       "<br />"+
  //       "So if you want to support the project, you just need to turn off your <span style='color: #DF4A32'>AdBlock extension</span>";
  //     let div = window.document.getElementById("aZone")
  //     div.style.display = 'block'
  //     div.innerHTML = e.outerHTML
  //   }
  // }
  render() {
    return <div id="aZone"></div>
  }
}

export default Ads
