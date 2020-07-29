import React from 'react';

import SentryTypes from 'sentry/sentryTypes';
import EventDataSection from 'sentry/components/events/eventDataSection';
import Annotated from 'sentry/components/events/meta/annotated';
import {t} from 'sentry/locale';

type Props = {
  event: SentryTypes.Event;
};

const Sdk = ({event: {data}}: Props) => (
  <EventDataSection type="sdk" title={t('SDK')} wrapTitle>
    <table className="table key-value">
      <tbody>
        <tr key="name">
          <td className="key">{t('Name')}</td>
          <td className="value">
            <Annotated object={data} objectKey="name">
              {value => <pre>{value}</pre>}
            </Annotated>
          </td>
        </tr>
        <tr key="version">
          <td className="key">{t('Version')}</td>
          <td className="value">
            <Annotated object={data} objectKey="version">
              {value => <pre>{value}</pre>}
            </Annotated>
          </td>
        </tr>
      </tbody>
    </table>
  </EventDataSection>
);

export default Sdk;
