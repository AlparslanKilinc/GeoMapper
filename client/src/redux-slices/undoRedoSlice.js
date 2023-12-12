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
    const lastAction = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);
    const newFuture = [...state.future, lastAction];
    dispatch(setState({ past: newPast, future: newFuture }));
    dispatch(lastAction.undoAction.actionCreator(...lastAction.undoAction.args));
  }
};

export const redo = () => (dispatch, getState) => {
  const state = getState().undoRedo;
  if (state.future.length > 0) {
    const nextAction = state.future[state.future.length - 1];
    const newFuture = state.future.slice(0, -1);
    const newPast = [...state.past, nextAction];
    dispatch(setState({ past: newPast, future: newFuture }));
    dispatch(nextAction.redoAction.actionCreator(...nextAction.redoAction.args));
  }
};

export const { addActionToPast, clearHistory, setState } = undoRedoSlice.actions;
export default undoRedoSlice.reducer;
