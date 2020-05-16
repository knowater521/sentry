import React from 'react';

import {SentryAppComponent} from 'sentry/types';
import {IconClickup, IconClubhouse, IconRookout, IconGeneric} from 'sentry/icons';

type Props = {
  slug: SentryAppComponent['sentryApp']['slug'];
};

const SentryAppIcon = ({slug}: Props) => {
  switch (slug) {
    case 'clickup':
      return <IconClickup size="md" />;
    case 'clubhouse':
      return <IconClubhouse size="md" />;
    case 'rookout':
      return <IconRookout size="md" />;
    default:
      return <IconGeneric size="md" />;
  }
};

export {SentryAppIcon};
