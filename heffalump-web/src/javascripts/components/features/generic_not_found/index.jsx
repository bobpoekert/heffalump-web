import React from react; import ReactDOM from react-dom;
import Column from '../ui/components/column';
import MissingIndicator from '../../components/missing_indicator';

const GenericNotFound = () => (
  <Column>
    <MissingIndicator />
  </Column>
);

export default GenericNotFound;
