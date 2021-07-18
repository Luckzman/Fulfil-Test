import './Alert.scss';
import PropTypes from 'prop-types';

export const Alert = ({children, onClose}) => {
  return (
    <div data-testid="alert" className="alert d-flex justify-between align-center">
      {children}
      <div className="cursor-pointer close-btn d-flex justify-center align-center" onClick={onClose}>x</div>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}