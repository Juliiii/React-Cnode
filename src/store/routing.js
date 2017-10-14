import { RouterStore } from 'mobx-react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';

const routing = new RouterStore();
export const history = syncHistoryWithStore(browserHistory, routing);

export default routing;
