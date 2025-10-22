import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Action, Food } from './types';

export const useGameLogic = () => {
  const [action, setAction] = useState<Action>('idle');
  const [selectedFood, setSelectedFood] = useState<Food>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showSoap, setShowSoap] = useState(false);
  const [showShower, setShowShower] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const [draggingSoap, setDraggingSoap] = useState(false);
  const [draggingHand, setDraggingHand] = useState(false);
  const [soapPosition, setSoapPosition] = useState({ x: 0, y: 0 });
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [hunger, setHunger] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [showWhining, setShowWhining] = useState(false);
  const [isEating, setIsEating] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      if (action !== 'sleeping') {
        setHunger(prev => Math.max(0, prev - 2));
        setCleanliness(prev => Math.max(0, prev - 1));
        setHappiness(prev => Math.max(0, prev - 1));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [action]);

  useEffect(() => {
    if (hunger <= 20 && hunger > 0) {
      toast({
        title: "⚠️ Голод!",
        description: "Shadow Milk Cookie очень голоден! Покорми его!",
        variant: "destructive"
      });
    }
    if (cleanliness <= 20 && cleanliness > 0) {
      toast({
        title: "⚠️ Грязь!",
        description: "Shadow Milk Cookie грязный! Искупай его!",
        variant: "destructive"
      });
    }
  }, [Math.floor(hunger / 20), Math.floor(cleanliness / 20), toast]);

  useEffect(() => {
    if (happiness <= 20 && happiness > 0) {
      setShowWhining(true);
      const whineInterval = setInterval(() => {
        toast({
          title: "😢 Скучно...",
          description: "Shadow Milk Cookie грустит! Погладь меня!",
          variant: "destructive"
        });
      }, 5000);
      
      return () => clearInterval(whineInterval);
    } else {
      setShowWhining(false);
    }
  }, [happiness, toast]);

  const playSound = useCallback((type: string) => {
    const audio = new Audio();
    audio.volume = 0.3;
    
    switch(type) {
      case 'click':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKfj8LVjHQU5k9jyzHomBSh+y/HajD4IFmS56+miUhELTKXh8bllHgU2jNXxz3woBSR5xu/bkj4IFme7...';
        break;
      case 'eat':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKfj8LVjHQU5k9jyzHomBSh+y/HajD4IFmS56+miUhELTKXh8bllHgU2jNXxz3woBSR5xu/bkj4IFme7...';
        break;
      case 'water':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKfj8LVjHQU5k9jyzHomBSh+y/HajD4IFmS56+miUhELTKXh8bllHgU2jNXxz3woBSR5xu/bkj4IFme7...';
        break;
      case 'sleep':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKfj8LVjHQU5k9jyzHomBSh+y/HajD4IFmS56+miUhELTKXh8bllHgU2jNXxz3woBSR5xu/bkj4IFme7...';
        break;
    }
    
    audio.play().catch(() => {});
  }, []);

  const handleFoodClick = useCallback(() => {
    if (action === 'eating' && selectedFood) {
      setSelectedFood(null);
      setAction('idle');
    } else {
      playSound('click');
      const foods: Food[] = ['egg', 'chicken', 'noodles'];
      const randomFood = foods[Math.floor(Math.random() * foods.length)];
      setSelectedFood(randomFood);
      setAction('eating');
    }
  }, [action, selectedFood, playSound]);

  const handleBathClick = useCallback(() => {
    playSound('click');
    if (action === 'bathing') {
      setAction('idle');
      setShowSoap(false);
      setShowShower(false);
      setShowBubbles(false);
      setDraggingSoap(false);
    } else {
      setAction('bathing');
      setShowSoap(true);
    }
  }, [action, playSound]);

  const handlePetClick = useCallback(() => {
    playSound('click');
    if (action === 'petting') {
      setAction('idle');
      setShowHand(false);
      setDraggingHand(false);
    } else {
      setAction('petting');
      setShowHand(true);
    }
  }, [action, playSound]);

  const handleSleepClick = useCallback(() => {
    playSound('sleep');
    if (action === 'sleeping') {
      setAction('idle');
    } else {
      setAction('sleeping');
    }
  }, [action, playSound]);

  const checkSoapOnCharacter = useCallback((x: number, y: number) => {
    const characterRect = document.querySelector('.character-img')?.getBoundingClientRect();
    if (characterRect) {
      if (x >= characterRect.left && x <= characterRect.right &&
          y >= characterRect.top && y <= characterRect.bottom) {
        setShowBubbles(true);
        setShowSoap(false);
        setDraggingSoap(false);
        
        setTimeout(() => {
          playSound('water');
          setShowShower(true);
          setCleanliness(100);
          setTimeout(() => {
            setShowShower(false);
            setShowBubbles(false);
            setAction('idle');
            toast({
              title: "✨ Чисто!",
              description: "Shadow Milk Cookie чистый! +100 чистота",
            });
          }, 5000);
        }, 1000);
      }
    }
  }, [playSound, toast]);

  const checkFoodOnCharacter = useCallback((x: number, y: number) => {
    const characterRect = document.querySelector('.character-img')?.getBoundingClientRect();
    if (characterRect && selectedFood) {
      if (x >= characterRect.left && x <= characterRect.right &&
          y >= characterRect.top && y <= characterRect.bottom) {
        playSound('eat');
        setIsEating(true);
        setHunger(prev => Math.min(100, prev + 30));
        toast({
          title: "😋 Вкусно!",
          description: "Shadow Milk Cookie съел еду! +30 голод",
        });
        setSelectedFood(null);
        setIsDragging(false);
        setTimeout(() => {
          setAction('idle');
          setIsEating(false);
        }, 2000);
      }
    }
  }, [selectedFood, playSound, toast]);

  const checkHandOnCharacter = useCallback((x: number, y: number) => {
    const characterRect = document.querySelector('.character-img')?.getBoundingClientRect();
    if (characterRect) {
      if (x >= characterRect.left && x <= characterRect.right &&
          y >= characterRect.top && y <= characterRect.bottom) {
        const newHappiness = Math.min(100, happiness + 25);
        setHappiness(newHappiness);
        if (newHappiness > 20) {
          setShowWhining(false);
        }
        toast({
          title: "🎵 Мурр-мурр!",
          description: "Shadow Milk Cookie доволен! +25 счастье",
        });
      }
    }
  }, [happiness, toast]);

  return {
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
  };
};
