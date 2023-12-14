import { createSlice } from '@reduxjs/toolkit';

// TODO: limit stack size
const initialState = {
  past: [],
  future: []
};

const undoRedoSlice = createSlice({
  name: 'undoRedo',
  initialState,
  reducers: {
    addActionToPast: (state, action) => {
      state.past.push(action.payload);
      state.future = [];
    },
    clearHistory: state => {
      state.past = [];
      state.future = [];
    },
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
  }
});

export const undo = () => (dispatch, getState) => {
  const state = getState().undoRedo;
  if (state.past.length > 0) {
    const lastActionGroup = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);
    const newFuture = [...state.future, lastActionGroup];

    dispatch(setState({ past: newPast, future: newFuture }));
    lastActionGroup.undoActions.forEach(action => {
      if (action.func) {
        action.func();
      } else if (action.actionCreator) {
        dispatch(action.actionCreator(...action.args));
      }
    });
  }
};

export const redo = () => (dispatch, getState) => {
  const state = getState().undoRedo;
  if (state.future.length > 0) {
    const nextActionGroup = state.future[state.future.length - 1];
    const newFuture = state.future.slice(0, -1);
    const newPast = [...state.past, nextActionGroup];

    dispatch(setState({ past: newPast, future: newFuture }));
    nextActionGroup.redoActions.forEach(action => {
      if (action.func) {
        action.func();
      } else if (action.actionCreator) {
        dispatch(action.actionCreator(...action.args));
      }
    });
  }
};


export const { addActionToPast, clearHistory, setState } = undoRedoSlice.actions;
export default undoRedoSlice.reducer;
