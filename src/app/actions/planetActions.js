
export const PLANET_UNMOUNT = 'PLANET_UNMOUNT'

export function unmountPlanet(){
  return dispatch => {
    return dispatch(unmountPlanetState())
  }
}

function unmountPlanetState() {
  return {
    type: PLANET_UNMOUNT
  }
}
