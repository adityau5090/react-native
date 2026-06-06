import { create } from "zustand";

import {
  DriveEvent,
  DriveSession,
} from "@/types/drive";
import { saveSession } from "@/storage/sessionStorage";
import { calculateScore } from "@/services/scoring/scoreEngine";
import { updateStreak } from "@/services/streak/updateStreak";

type DriveStore = {
  activeSession:
    | DriveSession
    | null;

  lastCompletedSession: 
    | DriveSession
    | null; 
     

  startDrive: () => void;

  endDrive: () => void;

  addEvent: (event: DriveEvent) => void;

  updateDistance: (
    distance: number
  ) => void;
};

export const useDriveStore =
  create<DriveStore>((set) => ({
    activeSession: null,
    lastCompletedSession: null,

    startDrive: () =>
      set({
        activeSession: {
          id: Date.now().toString(),

          startedAt: Date.now(),

          duration: 0,

          score: 100,

          distance: 0,
          events: [],
        },
      }),

    endDrive: async () =>
      set((state) => {
        if(!state.activeSession) 
          return state;

        const endedAt = Date.now()

        const finalScore = calculateScore(state.activeSession.events)
        console.log("Final Score : ", finalScore)
        const completedSession = {
      ...state.activeSession,

      
      endedAt,
      score: finalScore,

      duration:
        endedAt -
        state.activeSession.startedAt,
    };

     saveSession(completedSession);
    updateStreak();
        return {


          lastCompletedSession: completedSession,

          activeSession: null,
        }
      }),

    addEvent: (event) =>
      set((state) => {
        if (!state.activeSession)
          return state;

        console.log("Adding event : ", event.type)

        return {
          activeSession: {
            ...state.activeSession,

            
            events: [
              ...state.activeSession
                .events,
              event,
            ],
          },
        };
      }),

      updateDistance: (distance) =>
  set((state) => {
    if (!state.activeSession)
      return state;

    return {
      activeSession: {
        ...state.activeSession,

        distance,
      },
    };
  }),
  }));

  export type StreakData = {
  currentStreak: number;

  lastDriveDate: string | null;

  completedCycle: boolean;
};

