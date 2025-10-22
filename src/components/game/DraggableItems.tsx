import { Food } from './types';

interface DraggableItemsProps {
  selectedFood: Food;
  isDragging: boolean;
  dragPosition: { x: number; y: number };
  showSoap: boolean;
  draggingSoap: boolean;
  soapPosition: { x: number; y: number };
  showHand: boolean;
  draggingHand: boolean;
  handPosition: { x: number; y: number };
  showBubbles: boolean;
  showShower: boolean;
  foodEmojis: Record<string, string>;
  onFoodMouseDown: (e: React.MouseEvent) => void;
  onSoapMouseDown: (e: React.MouseEvent) => void;
  onHandMouseDown: (e: React.MouseEvent) => void;
}

export const DraggableItems = ({
  selectedFood,
  isDragging,
  dragPosition,
  showSoap,
  draggingSoap,
  soapPosition,
  showHand,
  draggingHand,
  handPosition,
  showBubbles,
  showShower,
  foodEmojis,
  onFoodMouseDown,
  onSoapMouseDown,
  onHandMouseDown
}: DraggableItemsProps) => {
  return (
    <>
      {selectedFood && (
        <div 
          className={`fixed pointer-events-none z-50 text-6xl transition-transform ${isDragging ? 'scale-125' : ''}`}
          style={{ 
            left: dragPosition.x, 
            top: dragPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {isDragging ? (
            <span className="animate-bounce-in">{foodEmojis[selectedFood]}</span>
          ) : (
            <button 
              onMouseDown={onFoodMouseDown}
              onTouchStart={onFoodMouseDown}
              className="cursor-grab active:cursor-grabbing pointer-events-auto animate-bounce-in hover:scale-110 transition-transform"
            >
              {foodEmojis[selectedFood]}
            </button>
          )}
        </div>
      )}

      {showSoap && (
        <div 
          className={`fixed pointer-events-none z-50 text-6xl transition-transform ${draggingSoap ? 'scale-125' : ''}`}
          style={{ 
            left: soapPosition.x, 
            top: soapPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {draggingSoap ? (
            <span className="animate-pulse">🧼</span>
          ) : (
            <button 
              onMouseDown={onSoapMouseDown}
              onTouchStart={onSoapMouseDown}
              className="cursor-grab active:cursor-grabbing pointer-events-auto animate-bounce-in hover:scale-110 transition-transform"
            >
              🧼
            </button>
          )}
        </div>
      )}

      {showHand && (
        <div 
          className={`fixed pointer-events-none z-50 text-6xl transition-transform ${draggingHand ? 'scale-125' : ''}`}
          style={{ 
            left: handPosition.x, 
            top: handPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {draggingHand ? (
            <span className="animate-pulse">✋</span>
          ) : (
            <button 
              onMouseDown={onHandMouseDown}
              onTouchStart={onHandMouseDown}
              className="cursor-grab active:cursor-grabbing pointer-events-auto animate-bounce-in hover:scale-110 transition-transform"
            >
              ✋
            </button>
          )}
        </div>
      )}

      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-blue-200 rounded-full animate-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {showShower && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-blue-400 opacity-60 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};
