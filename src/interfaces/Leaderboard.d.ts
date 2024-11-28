import {Driver} from "@services/drivers/types";
import {Lap} from "@services/laps/types";
import {Flag} from "@services/raceControl/types";
import {Stint} from "@services/stints/types";

export interface LeaderboardData extends CurrentRace {
  drivers: LeaderboardDriver[];
}

interface LeaderboardDriver extends Driver, Lap {
  logo: string;
  currentLap: number;
  stints: Stint[];
}

export interface CurrentRace {
  meetingName: string;
  sessionName: string;
  sessionDateStart: Date;
  totalLaps?: number;
  currentLap?: number;
  currentFlag?: Flag;
}