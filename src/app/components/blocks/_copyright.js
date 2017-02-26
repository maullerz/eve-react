import React from 'react'

const _copyright = ({info}) => {
  console.log(info);
  return <div className='row'>
    <div className='col-md-12'>
      <div className='grayback t-small'>

        <div className="row">
          <div className="col-md-9 col-first">
            EVE Online and the EVE logo are the registered trademarks of CCP hf.
            All rights are reserved worldwide.
            All other trademarks are the property of their respective owners.
            EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP
            hf.
            All artwork, screenshots, characters, vehicles, storylines, world facts or other recognizable features
            of the intellectual property relating to these trademarks are likewise the intellectual property of CCP
            hf.
            CCP hf. has granted permission to EVE-Prod to use EVE Online and all associated logos and designs for
            promotional and information purposes on its website but does not endorse, and is not in any way affiliated
            with,
            EVE-Prod. CCP is in no way responsible for the content on or functioning of this website,
            nor can it be liable for any damage arising from the use of this website.
          </div>
          <div className="col-md-3 col-last">
            Version: <a target="_blank" href={info.repo_url}>{info.message}</a><br />
            Online: <span className="txt-yellow">{info.eve_online}</span><br />
            Latest Update: <span className="txt-lime">{info.updated_at}</span><br />
            EVE Time: <span className="txt-lime">{info.eve_time}</span><br />
            Have idea? <a target="_blank" href="https://github.com/mazahell/eve-react">Fork me on Github</a><br />
          </div>
        </div>
        </div>
    </div>
  </div>
}

export default _copyright
