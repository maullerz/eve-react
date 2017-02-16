
export const ORE_UNMOUNT = 'ORE_UNMOUNT'

export function unmountOre(){
  return dispatch => {
    return dispatch(unmountOreState())
  }
}

function unmountOreState() {
  return {
    type: ORE_UNMOUNT
  }
}
