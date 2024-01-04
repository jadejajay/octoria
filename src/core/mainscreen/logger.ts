import { create } from 'zustand';

type LogStore = {
  text: string; // Replace 'any' with your data structure
  setLog: (data: string) => void; // Replace 'any' with your data structure
};

export const useLogStore = create<LogStore>((set) => ({
  text: '============OCTORIA============',
  setLog: (data) => {
    set((_) => ({ text: data }));
  },
}));

export const setLog = (data: string) => useLogStore.getState().setLog(data);
export const getLog = () => useLogStore.getState().text;
