export type Action = 'idle' | 'eating' | 'bathing' | 'petting' | 'sleeping';
export type Food = 'egg' | 'chicken' | 'noodles' | null;

export interface GameState {
  action: Action;
  selectedFood: Food;
  isDragging: boolean;
  dragPosition: { x: number; y: number };
  showSoap: boolean;
  showShower: boolean;
  showBubbles: boolean;
  showHand: boolean;
  draggingSoap: boolean;
  draggingHand: boolean;
  soapPosition: { x: number; y: number };
  handPosition: { x: number; y: number };
  hunger: number;
  cleanliness: number;
  happiness: number;
  showWhining: boolean;
  isEating: boolean;
}
