import { useMemo, DependencyList } from 'react';
import { bindActionCreators, ActionCreator } from 'redux';
import { useDispatch } from 'react-redux';

/**
 * @param actions array|object|action
 * @param deps
 * @returns action creators
 *
 * Examples:
 *  const getPageNavAction = useActions(getPageNav);
 *  const [getVideoDetailAction, getRelatedVideoAction] = useActions([getVideoDetail, getRelatedVideo]);
 */
const useActions = <A, C extends ActionCreator<A>>(
  actions: C | Array<C>,
  deps?: DependencyList
): C | Array<C> => {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    // FIXME: Do we need to depends on `actions` here? Official version doesn't
    //  Ref: https://react-redux.js.org/next/api/hooks#recipe-useactions
    deps ? [dispatch, actions, ...deps] : [deps, actions, dispatch]
  );
};

export default useActions;
