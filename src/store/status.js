import { observable, action, useStrict } from 'mobx';

useStrict(true);

class Status {
  @observable loading = false;
  @observable submitting = false;
  @observable refreshing = false;

  @action.bound
  setLoading (val) {
    this.loading = val;
  }

  @action.bound
  setSubmitting (val) {
    this.submitting = val;
  }

  @action.bound
  setRefreshing (val) {
    this.refreshing = val;
  }

}

export default new Status();
