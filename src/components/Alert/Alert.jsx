import './Alert.scss';

export const Alert = ({children, onClose}) => {
  return (
    <div data-testid="alert" className="alert d-flex justify-between align-center">
      {children}
      <div className="cursor-pointer close-btn d-flex justify-center align-center" onClick={onClose}>x</div>
    </div>
  )
}