import { useCallback } from 'react';
import filter from 'leo-profanity';
import ProfanityContext from '../contexts/profanityContext.js';

const ProfanityProvider = ({ children }) => {
  filter.loadDictionary('en');
  filter.add(filter.getDictionary('ru'));

  const wordsFilter = useCallback((word) => filter.clean(word), []);

  return (
    <ProfanityContext.Provider value={wordsFilter}>
      {children}
    </ProfanityContext.Provider>
  );
};

export default ProfanityProvider;
