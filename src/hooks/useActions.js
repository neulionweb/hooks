import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

/**
 * @param actions array|object|action
 * @param deps
 * @returns action creators
 */
const useActions = (actions, deps) => {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    // FIXME: Do we need to depends on actions here? Official version doesn't
    //  Ref: https://react-redux.js.org/next/api/hooks#recipe-useactions
    deps ? [dispatch, actions, ...deps] : [deps, actions, dispatch]
  );
};

export default useActions;
