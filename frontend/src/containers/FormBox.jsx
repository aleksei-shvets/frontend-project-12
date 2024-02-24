const FormBox = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default FormBox;
