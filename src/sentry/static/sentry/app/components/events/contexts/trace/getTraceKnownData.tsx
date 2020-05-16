import {Event, Organization} from 'sentry/types';
import {defined} from 'sentry/utils';
import {KeyValueListData} from 'sentry/components/events/interfaces/keyValueList/types';
import {getMeta} from 'sentry/components/events/meta/metaProxy';

import {TraceKnownData, TraceKnownDataType} from './types';
import getUserKnownDataDetails from './getTraceKnownDataDetails';

function getTraceKnownData(
  data: TraceKnownData,
  traceKnownDataValues: Array<TraceKnownDataType>,
  event: Event,
  organization: Organization
): Array<KeyValueListData> {
  const knownData: Array<KeyValueListData> = [];

  const dataKeys = traceKnownDataValues.filter(traceKnownDataValue => {
    if (traceKnownDataValue === TraceKnownDataType.TRANSACTION_NAME) {
      return event?.tags.find(tag => {
        return tag.key === 'transaction';
      });
    }

    return data[traceKnownDataValue];
  });

  for (const key of dataKeys) {
    const knownDataDetails = getUserKnownDataDetails(data, key, event, organization);

    if ((knownDataDetails && !defined(knownDataDetails.value)) || !knownDataDetails) {
      continue;
    }

    knownData.push({
      key,
      ...knownDataDetails,
      meta: getMeta(data, key),
      subjectDataTestId: `trace-context-${key.toLowerCase()}-value`,
    });
  }

  return knownData;
}

export default getTraceKnownData;
