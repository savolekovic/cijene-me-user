export const LoadingState = ({ message = 'Loading...' }) => (
  <div className="d-flex justify-content-center align-items-center p-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">{message}</span>
    </div>
  </div>
); 