import React from 'react';

import {fetchPlugins, enablePlugin, disablePlugin} from 'sentry/actionCreators/plugins';
import {t} from 'sentry/locale';
import SentryDocumentTitle from 'sentry/components/sentryDocumentTitle';
import PermissionAlert from 'sentry/views/settings/project/permissionAlert';
import SentryTypes from 'sentry/sentryTypes';
import SettingsPageHeader from 'sentry/views/settings/components/settingsPageHeader';
import withPlugins from 'sentry/utils/withPlugins';
import withOrganization from 'sentry/utils/withOrganization';
import withProject from 'sentry/utils/withProject';
import {trackIntegrationEvent} from 'sentry/utils/integrationUtil';

import ProjectPlugins from './projectPlugins';

class ProjectPluginsContainer extends React.Component {
  static propTypes = {
    plugins: SentryTypes.PluginsStore,
    organization: SentryTypes.Organization,
    project: SentryTypes.Project,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const plugins = await fetchPlugins(this.props.params);
    const installCount = plugins.filter(
      plugin => plugin.hasConfiguration && plugin.enabled
    ).length;
    trackIntegrationEvent(
      {
        eventKey: 'integrations.index_viewed',
        eventName: 'Integrations: Index Page Viewed',
        integrations_installed: installCount,
        view: 'legacy_integrations',
        project_id: this.props.project.id,
      },
      this.props.organization,
      {startSession: true}
    );
  };

  handleChange = (pluginId, shouldEnable) => {
    const {projectId, orgId} = this.props.params;
    const actionCreator = shouldEnable ? enablePlugin : disablePlugin;
    actionCreator({projectId, orgId, pluginId});
  };

  render() {
    const {loading, error, plugins} = this.props.plugins || {};
    const {orgId} = this.props.params;

    const title = t('Legacy Integrations');

    return (
      <React.Fragment>
        <SentryDocumentTitle title={title} objSlug={orgId} />
        <SettingsPageHeader title={title} />
        <PermissionAlert />

        <ProjectPlugins
          {...this.props}
          onError={this.fetchData}
          onChange={this.handleChange}
          loading={loading}
          error={error}
          plugins={plugins}
        />
      </React.Fragment>
    );
  }
}

export default withProject(withOrganization(withPlugins(ProjectPluginsContainer)));
