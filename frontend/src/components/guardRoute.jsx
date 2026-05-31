import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GuardRoute({ element }) {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
}

GuardRoute.propTypes = {
  element: PropTypes.object.isRequired,
};
