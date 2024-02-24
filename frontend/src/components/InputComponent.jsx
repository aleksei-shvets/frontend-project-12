import { Form, InputGroup } from 'react-bootstrap';
import { forwardRef } from 'react';

const InputComponent = forwardRef(({
  placeholderText,
  changeHandler,
  fieldValue,
  isInvalidMessage,
  fieldName,
  inputClasses,
  touchedMarker,
  type,
  blurHandler,
}, ref) => (
  <Form.Group className="mb-4">
    <Form.Label htmlFor={fieldName} />
    <InputGroup hasValidation>
      <Form.Control
        required
        className={inputClasses}
        autoComplete={fieldName}
        placeholder={placeholderText}
        id={fieldName}
        name={fieldName}
        type={type}
        onChange={changeHandler}
        value={fieldValue}
        isInvalid={isInvalidMessage}
        ref={ref}
        onBlur={blurHandler}
      />
      <Form.Control.Feedback tooltip type="invalid">
        {touchedMarker && isInvalidMessage}
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group>
));

export default InputComponent;
