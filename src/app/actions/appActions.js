export const CHANGE_HEAD = 'CHANGE_HEAD'

export function setHead() {
  return dispatch => {
    dispatch(setHeadState())
  }
}

export function setHeadState() {
  return {
    type: CHANGE_HEAD
  }
}