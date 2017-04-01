import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const DropdownMenu = React.createClass({

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    size: React.PropTypes.number.isRequired,
    direction: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      direction: 'left'
    };
  },

  mixins: [PureRenderMixin],

  setRef (c) {
    this.dropdown = c;
  },

  handleClick (i, e) {
    const { action } = this.props.items[i];

    if (typeof action === 'function') {
      e.preventDefault();
      action();
      this.dropdown.hide();
    }
  },

  renderItem (item, i) {
    if (item === null) {
      return <li key={i} className='dropdown__sep' />;
    }

    const { text, action, href = '#' } = item;

    return (
      <li key={i}>
        <a href={href} target='_blank' rel='noopener' onClick={this.handleClick.bind(this, i)}>
          {text}
        </a>
      </li>
    );
  },

  render () {
    const { icon, items, size, direction } = this.props;
    const directionClass = (direction === "left") ? "dropdown__left" : "dropdown__right";

    return (
      <Dropdown ref={this.setRef}>
        <DropdownTrigger className='icon-button' style={{ fontSize: `${size}px`, width: `${size}px`, lineHeight: `${size}px` }}>
          <i className={`fa fa-fw fa-${icon}`} style={{ verticalAlign: 'middle' }} />
        </DropdownTrigger>

        <DropdownContent className={directionClass} style={{ lineHeight: '18px', textAlign: 'left' }}>
          <ul>
            {items.map(this.renderItem)}
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }

});

export default DropdownMenu;
