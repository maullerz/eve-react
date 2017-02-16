import React from 'react'
import {connect} from 'react-redux'

class Tables extends React.Component {

  componentDidMount () {
    console.log("get resourses");
  }

  render () {
    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    }

    return <div className='row'>
        <div className='col-md-12'>
          <table className='inside'>
            <thead>
            <tr>
              <th colSpan='2'>Calculator</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan='2' className='inside-table'>
                <div className='row'>
                  <div className={col.left}>Factory</div>
                  <div className={col.right}>

                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
  }
}

function mapStateToProps (state) {
  return state.manufactureReducer
}
export default connect(mapStateToProps, {})(Tables)
