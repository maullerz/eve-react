import Api from "../api";
export const MSHEET_UNMOUNT = "MSHEET_UNMOUNT";
export const MSHEET_GET = "MSHEET_GET";
export const MSHEET_UPDATE_VARIABLE = "MSHEET_UPDATE_VARIABLE";

export function updateVar(variable, value) {
  let responsePayload = {
    _need_recalculate: true
  };
  responsePayload[variable] = value;
  return dispatch => {
    dispatch({
      type: MSHEET_UPDATE_VARIABLE,
      payload: responsePayload
    });
  };
}

export function getSheet() {
  return dispatch => {
    return Api.Moon.sheet().then(json => {
      dispatch({
        type: MSHEET_GET,
        payload: {
          reactions: json.data.reactions,
          refined: json.data.refined
        }
      });
    });
  };
}

export function unmountMoonSheet() {
  return dispatch => {
    return dispatch({
      type: MSHEET_UNMOUNT
    });
  };
}
