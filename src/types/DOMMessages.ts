export type DOMMessage = {
  type: "GET_DOM";
};

export type DOMMessageResponse = {
  linkedin: string;
  name: string;
  position: string;
  address: string;
};
