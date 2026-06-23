import { create } from "zustand";
import { Habit } from "@/constants/habit";

interface HabitState {
  habits: Habit[];

  setHabits: (habits: Habit[]) => void;

  addHabit: (habit: Habit) => void;
  removeHabit: (id: string) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void
}

export const useHabitStore = create<HabitState>((set) => ({
    habits: [],
    setHabits: (habits) => set({ habits }),
    addHabit: (habit) =>set((state) => ({
        habits: [...state.habits, habit],
    })),
    removeHabit: (id) => set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id)
    })),
    updateHabit: (id,updates) => set((state) => ({
      habits: state.habits.map((habit) => 
        habit.id === id ? {...habit, ...updates} : habit)
    }))
  })
);