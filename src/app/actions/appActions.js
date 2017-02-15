export const CHANGE_HEAD = 'CHANGE_HEAD'
export const CHANGE_LOADER = 'CHANGE_LOADER'

export function setHead(obj) {
  return dispatch => {
    dispatch(setHeadStateObj(obj))
  }
}

export function setHeadStateObj(obj) {
  return {
    type: CHANGE_HEAD,
    headTitle: obj.headTitle,
    headDescription: obj.headDescription,
    headKeywords: obj.headKeywords,
  }
}