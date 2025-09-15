export interface IDriver {
  approved: boolean;
  online: boolean;
  vehicle?: {
    make?: string;
    model?: string;
    plate?: string;
  };
  currentRideId: string | null;
  earning: number;
}
