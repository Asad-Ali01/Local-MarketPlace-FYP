

// IdentityCard interface
interface IidentityCard {
  front: {
    url: string;
    public_id: string;
  };
  back: {
    url: string;
    public_id: string;
  };
}

// Avatar interface
interface IAvatar {
  url: string;
  public_id: string;
}

// location interface
interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

// User interface
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role:"client" | "provider" | "admin";
  identityCard?: IidentityCard;
  avatar?: IAvatar;
  location?: ILocation;
}