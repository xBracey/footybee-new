import { League } from "../../../shared/types/database";

export const leagues: League[] = [
  {
    id: "1",
    name: "League 1",
    admin: false,
    user_points: 0,
    ranking: [
      { username: "User 1", points: 0 },
      { username: "User 2", points: 0 },
    ],
    user_position: 0,
  },
];
