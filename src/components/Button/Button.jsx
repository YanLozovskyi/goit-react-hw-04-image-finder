import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => (
  <div className={css.wrapper}>
    <button className={css.Button} onClick={onClick} type="button">
      Load more
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
