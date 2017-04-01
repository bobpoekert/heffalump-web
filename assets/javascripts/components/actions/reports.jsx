import api from '../api';

export const REPORT_INIT   = 'REPORT_INIT';
export const REPORT_CANCEL = 'REPORT_CANCEL';

export const REPORT_SUBMIT_REQUEST = 'REPORT_SUBMIT_REQUEST';
export const REPORT_SUBMIT_SUCCESS = 'REPORT_SUBMIT_SUCCESS';
export const REPORT_SUBMIT_FAIL    = 'REPORT_SUBMIT_FAIL';

export const REPORT_STATUS_TOGGLE = 'REPORT_STATUS_TOGGLE';

export function initReport(account, status) {
  return {
    type: REPORT_INIT,
    account,
    status
  };
};

export function cancelReport() {
  return {
    type: REPORT_CANCEL
  };
};

export function toggleStatusReport(statusId, checked) {
  return {
    type: REPORT_STATUS_TOGGLE,
    statusId,
    checked,
  };
};

export function submitReport() {
  return (dispatch, getState) => {
    dispatch(submitReportRequest());

    api(getState).post('/api/v1/reports', {
      account_id: getState().getIn(['reports', 'new', 'account_id']),
      status_ids: getState().getIn(['reports', 'new', 'status_ids']),
      comment: getState().getIn(['reports', 'new', 'comment'])
    }).then(response => dispatch(submitReportSuccess(response.data))).catch(error => dispatch(submitReportFail(error)));
  };
};

export function submitReportRequest() {
  return {
    type: REPORT_SUBMIT_REQUEST
  };
};

export function submitReportSuccess(report) {
  return {
    type: REPORT_SUBMIT_SUCCESS,
    report
  };
};

export function submitReportFail(error) {
  return {
    type: REPORT_SUBMIT_FAIL,
    error
  };
};
