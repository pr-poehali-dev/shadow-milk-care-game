import { useGameLogic } from '@/components/game/useGameLogic';
import { GameStats } from '@/components/game/GameStats';
import { Character } from '@/components/game/Character';
import { ActionButtons } from '@/components/game/ActionButtons';
import { DraggableItems } from '@/components/game/DraggableItems';

const Index = () => {
  const {
    action,
    selectedFood,
    isDragging,
    dragPosition,
    showSoap,
    showShower,
    showBubbles,
    showHand,
    draggingSoap,
    draggingHand,
    soapPosition,
    handPosition,
    hunger,
    cleanliness,
    happiness,
    showWhining,
    isEating,
    setIsDragging,
    setDragPosition,
    setDraggingSoap,
    setSoapPosition,
    setDraggingHand,
    setHandPosition,
    handleFoodClick,
    handleBathClick,
    handlePetClick,
    handleSleepClick,
    checkSoapOnCharacter,
    checkFoodOnCharacter,
    checkHandOnCharacter
  } = useGameLogic();

  const foodEmojis = {
    egg: '🍳',
    chicken: '🍗',
    noodles: '🍜'
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragPosition({ x: e.clientX, y: e.clientY });
    }
    if (draggingSoap) {
      setSoapPosition({ x: e.clientX, y: e.clientY });
    }
    if (draggingHand) {
      setHandPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (isDragging) {
      setDragPosition({ x: touch.clientX, y: touch.clientY });
    }
    if (draggingSoap) {
      setSoapPosition({ x: touch.clientX, y: touch.clientY });
    }
    if (draggingHand) {
      setHandPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      checkFoodOnCharacter(e.clientX, e.clientY);
      setIsDragging(false);
    }
    if (draggingSoap) {
      checkSoapOnCharacter(e.clientX, e.clientY);
      setDraggingSoap(false);
    }
    if (draggingHand) {
      checkHandOnCharacter(e.clientX, e.clientY);
      setDraggingHand(false);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (isDragging) {
      checkFoodOnCharacter(touch.clientX, touch.clientY);
      setIsDragging(false);
    }
    if (draggingSoap) {
      checkSoapOnCharacter(touch.clientX, touch.clientY);
      setDraggingSoap(false);
    }
    if (draggingHand) {
      checkHandOnCharacter(touch.clientX, touch.clientY);
      setDraggingHand(false);
    }
  };

  const handleFoodMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if ('clientX' in e) {
      setDragPosition({ x: e.clientX, y: e.clientY });
    } else {
      const touch = e.touches[0];
      setDragPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleSoapMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDraggingSoap(true);
    if ('clientX' in e) {
      setSoapPosition({ x: e.clientX, y: e.clientY });
    } else {
      const touch = e.touches[0];
      setSoapPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleHandMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDraggingHand(true);
    if ('clientX' in e) {
      setHandPosition({ x: e.clientX, y: e.clientY });
    } else {
      const touch = e.touches[0];
      setHandPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ${action === 'sleeping' ? 'bg-gradient-to-b from-indigo-900 to-purple-900' : 'bg-gradient-to-b from-pink-200 via-purple-200 to-yellow-100'}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        <h1 className="game-title text-3xl md:text-5xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
          Ухаживай за Shadow Milk! 🍪
        </h1>
        
        <GameStats hunger={hunger} cleanliness={cleanliness} happiness={happiness} />
        
        <div className="flex-1 flex items-center justify-center relative">
          <Character action={action} showWhining={showWhining} isEating={isEating} />
        </div>

        <ActionButtons 
          action={action}
          onFoodClick={handleFoodClick}
          onBathClick={handleBathClick}
          onPetClick={handlePetClick}
          onSleepClick={handleSleepClick}
        />
      </div>

      <DraggableItems
        selectedFood={selectedFood}
        isDragging={isDragging}
        dragPosition={dragPosition}
        showSoap={showSoap}
        draggingSoap={draggingSoap}
        soapPosition={soapPosition}
        showHand={showHand}
        draggingHand={draggingHand}
        handPosition={handPosition}
        showBubbles={showBubbles}
        showShower={showShower}
        foodEmojis={foodEmojis}
        onFoodMouseDown={handleFoodMouseDown}
        onSoapMouseDown={handleSoapMouseDown}
        onHandMouseDown={handleHandMouseDown}
      />
    </div>
  );
};

export default Index;
