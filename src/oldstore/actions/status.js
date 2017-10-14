export const SETLOADING = 'SETLOADING';
export const SETSUBMITTING = 'SETSUBMITTING';
export const SETREFRESH = 'SETREFRESH';
export const SETREACHEND = 'SETREACHEND';

export const setLoading = () => ({
  type: SETLOADING,
  key: 'loading'
});

export const setSubmitting = () => ({
  type: SETSUBMITTING,
  key: 'submitting'
});

export const setRefresh = () => ({
  type: SETREFRESH,
  key: 'refresh'
});

export const setReachend = (value) => ({
  type: SETREACHEND,
  value
});
