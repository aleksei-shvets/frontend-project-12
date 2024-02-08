import {
  useState, useCallback, useMemo,
} from 'react';
import ModalContext from '../contexts/modalContext.js';

const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  const showModal = useCallback(() => setIsModal(true));
  const hideModal = useCallback(() => setIsModal(false));

  const prop = useMemo(() => ({ isModal, showModal, hideModal }), [isModal, showModal, hideModal]);

  return (
    <ModalContext.Provider value={prop}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
