import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
export function Icon({ name, ...props }) {
  return <FontAwesomeIcon icon={icons[name]} {...props} />;
}
