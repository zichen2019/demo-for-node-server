import React, { useCallback } from 'react';
import { isPrimitive } from './index';

export function useState (initialState) {
  const [state, set] = React.useState(initialState);
  let setState = null;
  if (isPrimitive(initialState)) {
    setState = useCallback(
      (nextState) => {
        set(nextState)
      },
      [set]
    )
    return [state, setState];
  }

  if (Array.isArray(initialState)) {
    setState = useCallback(
      (nextState) => {
        set([...state, ...nextState])
      }, 
      [set]
    )
    return [state,setState]
  }

  setState = useCallback(
    (nextState) => {
      set({...state, ...nextState})
    }, 
    [set]
  )
  return [state,setState]
}