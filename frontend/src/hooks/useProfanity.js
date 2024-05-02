import { useContext } from 'react';

import ProfanityContext from '../contexts/profanityContext.js';

const useProfanity = () => useContext(ProfanityContext);

export default useProfanity;
