import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Position, PositionDTO} from "./types";

/**
 * Returns a list of positions
 * @param {number | "latest"} sessionKey ID of the session
 * @param {number} driverNumber the number of the driver
 * @returns {Position[]} array of positions
 */
export const getPosition = async (
  sessionKey?: number | "latest",
  driverNumber?: number
): Promise<Position[]> => {
  const {data} = await f1Client.get<PositionDTO[]>("/position", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
    },
  });

  return toCamel(data) as Position[];
};