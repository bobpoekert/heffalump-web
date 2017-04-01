import { connect } from 'react-redux';
import ColumnSettings from '../components/column_settings';
import { changeSetting, saveSettings } from '../../../actions/settings';

const mapStateToProps = state => ({
  settings: state.getIn(['settings', 'notifications'])
});

const mapDispatchToProps = dispatch => ({

  onChange (key, checked) {
    dispatch(changeSetting(['notifications', ...key], checked));
  },

  onSave () {
    dispatch(saveSettings());
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnSettings);
