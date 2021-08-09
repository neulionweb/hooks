import 'url-search-params-polyfill';
import { useLocation } from 'react-router-dom';

/**
 * @param key
 * @returns {string|URLSearchParams}
 *   null if key doesn't exist
 *   "" (empty string) if key exist but no value
 *   {value} (empty string) if key exist and has value
 */
const useSearch = (key) => {
  const search = new URLSearchParams(useLocation().search);

  if (key) {
    return search.get(key);
  }

  return search;
};

export default useSearch;
