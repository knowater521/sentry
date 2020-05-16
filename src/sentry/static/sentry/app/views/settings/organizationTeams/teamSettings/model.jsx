import {updateTeam} from 'sentry/actionCreators/teams';
import FormModel from 'sentry/views/settings/components/forms/model';

class TeamFormModel extends FormModel {
  doApiRequest({data}) {
    return new Promise((resolve, reject) =>
      updateTeam(
        this.api,
        {
          orgId: this.orgId,
          teamId: this.teamId,
          data,
        },
        {
          success: resolve,
          error: reject,
        }
      )
    );
  }
}

export default TeamFormModel;
