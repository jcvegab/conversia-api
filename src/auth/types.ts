export type JwtBase = {
  email: string;
  sub: string;
};

export type JwtDates = {
  iat: number;
  exp: number;
};

export type JwtPayload = JwtBase & JwtDates;
