import { Form, InputGroup } from 'react-bootstrap';
import { forwardRef } from 'react';

const InputComponent = forwardRef(({
  changeHandler,
  fieldValue,
  isInvalidMessage,
  fieldName,
  inputClasses,
  touchedMarker,
  type,
  blurHandler,
  labelText,
}, ref) => (
  <Form.Group className="mb-4">
    <Form.Label htmlFor={fieldName}>{labelText}</Form.Label>
    <InputGroup hasValidation>
      <Form.Control
        required
        className={inputClasses}
        autoComplete={fieldName}
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
