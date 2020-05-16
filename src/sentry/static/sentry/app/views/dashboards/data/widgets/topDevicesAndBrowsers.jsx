import {WIDGET_DISPLAY} from 'sentry/views/dashboards/constants';

import topDevicesAndBrowsersQuery from '../queries/topDevicesAndBrowsers';

const topDevicesAndBrowsers = {
  type: WIDGET_DISPLAY.TABLE,
  queries: {discover: [topDevicesAndBrowsersQuery]},

  title: 'Devices, Browsers',
};

export default topDevicesAndBrowsers;
