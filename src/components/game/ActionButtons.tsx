import { Action } from './types';

interface ActionButtonsProps {
  action: Action;
  onFoodClick: () => void;
  onBathClick: () => void;
  onPetClick: () => void;
  onSleepClick: () => void;
}

export const ActionButtons = ({ 
  action, 
  onFoodClick, 
  onBathClick, 
  onPetClick, 
  onSleepClick 
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-4 justify-center flex-wrap max-w-2xl mx-auto">
      <button 
        onClick={onFoodClick}
        className={`action-button w-20 h-20 md:w-24 md:h-24 rounded-full text-4xl md:text-5xl transition-all transform hover:scale-110 active:scale-95 shadow-xl ${
          action === 'eating' ? 'ring-4 ring-yellow-400 scale-110' : ''
        }`}
      >
        🍖
      </button>
      <button 
        onClick={onBathClick}
        className={`action-button w-20 h-20 md:w-24 md:h-24 rounded-full text-4xl md:text-5xl transition-all transform hover:scale-110 active:scale-95 shadow-xl ${
          action === 'bathing' ? 'ring-4 ring-blue-400 scale-110' : ''
        }`}
      >
        🛁
      </button>
      <button 
        onClick={onPetClick}
        className={`action-button w-20 h-20 md:w-24 md:h-24 rounded-full text-4xl md:text-5xl transition-all transform hover:scale-110 active:scale-95 shadow-xl ${
          action === 'petting' ? 'ring-4 ring-pink-400 scale-110' : ''
        }`}
      >
        ✋
      </button>
      <button 
        onClick={onSleepClick}
        className={`action-button w-20 h-20 md:w-24 md:h-24 rounded-full text-4xl md:text-5xl transition-all transform hover:scale-110 active:scale-95 shadow-xl ${
          action === 'sleeping' ? 'ring-4 ring-purple-400 scale-110' : ''
        }`}
      >
        😴
      </button>
    </div>
  );
};
