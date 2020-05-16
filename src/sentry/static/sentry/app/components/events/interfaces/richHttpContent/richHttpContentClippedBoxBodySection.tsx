import React from 'react';
import PropTypes from 'prop-types';

import AnnotatedText from 'sentry/components/events/meta/annotatedText';
import KeyValueList from 'sentry/components/events/interfaces/keyValueList/keyValueListV2';
import {Meta} from 'sentry/types';
import ContextData from 'sentry/components/contextData';
import {defined} from 'sentry/utils';
import ErrorBoundary from 'sentry/components/errorBoundary';
import ClippedBox from 'sentry/components/clippedBox';
import {t} from 'sentry/locale';

import getTransformedData from './getTransformedData';
import {SubData, InferredContentType} from './types';

type Props = {
  data: SubData;
  inferredContentType: InferredContentType;
  meta?: Meta;
};

const RichHttpContentClippedBoxBodySection = ({
  data: value,
  meta,
  inferredContentType,
}: Props) => {
  const getContent = () => {
    if (!defined(value)) {
      return null;
    }

    switch (inferredContentType) {
      case 'application/json':
        return (
          <ContextData
            data-test-id="rich-http-content-body-context-data"
            data={value}
            preserveQuotes
          />
        );
      case 'application/x-www-form-urlencoded':
      case 'multipart/form-data':
        return (
          <KeyValueList
            data-test-id="rich-http-content-body-key-value-list"
            data={getTransformedData(value).map(([key, v]) => ({
              key,
              subject: key,
              value: v,
              meta,
            }))}
            isContextData
          />
        );
      default:
        return (
          <pre data-test-id="rich-http-content-body-section-pre">
            <AnnotatedText
              value={value && JSON.stringify(value, null, 2)}
              meta={meta}
              data-test-id="rich-http-content-body-context-data"
            />
          </pre>
        );
    }
  };

  const content = getContent();

  return content ? (
    <ClippedBox title={t('Body')} defaultClipped>
      <ErrorBoundary mini>{content}</ErrorBoundary>
    </ClippedBox>
  ) : null;
};

RichHttpContentClippedBoxBodySection.propTypes = {
  meta: PropTypes.object,
};

export default RichHttpContentClippedBoxBodySection;
