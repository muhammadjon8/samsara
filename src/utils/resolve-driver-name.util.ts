import { getVehicleDetails } from "../api/get-driver";

export async function resolveVehicleName(vehicle?: {
  id: string;
  name?: string;
}): Promise<string> {
  if (!vehicle?.id) throw new Error("Missing vehicle data");
  if (vehicle.name) return vehicle.name;

  const { data } = await getVehicleDetails(vehicle.id);
  return data.name;
}
