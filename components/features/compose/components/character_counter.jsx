import PureRenderMixin from 'react-addons-pure-render-mixin';

const CharacterCounter = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired,
    max: React.PropTypes.number.isRequired
  },

  mixins: [PureRenderMixin],

  render () {
    const diff = this.props.max - this.props.text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "_").length;

    return (
      <span style={{ fontSize: '16px', cursor: 'default' }}>
        {diff}
      </span>
    );
  }

});

export default CharacterCounter;
