export const CHANGE_HEAD = 'CHANGE_HEAD'

export function setHead(obj) {
  return dispatch => {
    dispatch(setHeadStateObj(obj))
  }
}

function setHeadStateObj(obj) {
  return {
    type: CHANGE_HEAD,
    headTitle: obj.headTitle,
    headDescription: obj.headDescription,
    headKeywords: obj.headKeywords,
  }
}