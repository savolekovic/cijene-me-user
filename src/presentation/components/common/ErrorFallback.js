  const ErrorFallback = ({ error }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Something went wrong!</h4>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorFallback; 