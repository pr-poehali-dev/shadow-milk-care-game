import { Action } from './types';

interface CharacterProps {
  action: Action;
  showWhining: boolean;
  isEating: boolean;
}

export const Character = ({ action, showWhining, isEating }: CharacterProps) => {
  return (
    <div className={`transition-all duration-500 ${action === 'sleeping' ? 'opacity-70' : ''} relative`}>
      <img 
        src={
          isEating ? "https://cdn.poehali.dev/files/1f7564f4-9858-4ca3-9234-44c89e27ade9.png" :
          showWhining ? "https://cdn.poehali.dev/files/dcffaa07-9edb-4f82-acab-a1f835b610bb.png" : 
          "https://cdn.poehali.dev/files/eec1f7bb-a516-476a-befa-eedf06e4dfb7.png"
        }
        alt="Shadow Milk Cookie"
        className={`character-img w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl transition-all duration-500 ${
          action === 'eating' || isEating ? 'animate-shake' : 
          action === 'petting' ? 'animate-bounce-in' :
          showWhining ? 'animate-shake' :
          'animate-float'
        }`}
      />
      {action === 'sleeping' && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl animate-float">
          💤
        </div>
      )}
    </div>
  );
};
