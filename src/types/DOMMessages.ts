export type DOMMessage = {
  type: "GET_DOM";
};

export type DOMMessageResponse = {
  linkedin: string;
  name: string;
  image: string;
  position: string;
  address: string;
};
