import { Link } from 'react-router-dom';
import { iconSize } from '../../../tokens/size';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function ServiceShortcutItem({ item }) {
  const handleIconError = (event) => {
    event.currentTarget.hidden = true;
  };

  return (
    <li className="service-shortcut__item">
      <Link className="service-shortcut__link" to={item.to}>
        <span className="service-shortcut__icon" data-placeholder={item.iconPlaceholder} aria-hidden="true">
          <img src={item.icon} alt="" onError={handleIconError} />
        </span>

        <strong className="service-shortcut__label">{item.label}</strong>
        <span className="service-shortcut__description">{item.description}</span>

        <span className="service-shortcut__arrow" aria-hidden="true">
          <ChevronRightIcon size={iconSize.sm} />
        </span>
      </Link>
    </li>
  );
}

export default ServiceShortcutItem;
