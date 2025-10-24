import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type Action = 'idle' | 'eating' | 'bathing' | 'petting' | 'sleeping' | 'angry' | 'talking';
type Food = 'egg' | 'chicken' | 'noodles' | null;

const Index = () => {
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
  const [angryMessage, setAngryMessage] = useState('');
  const [talkMessage, setTalkMessage] = useState('');
  const [pettingMessage, setPettingMessage] = useState('');
  const [lastPettingTime, setLastPettingTime] = useState(0);
  const [isCrying, setIsCrying] = useState(false);
  const [isAt50Percent, setIsAt50Percent] = useState(false);
  const [message50Percent, setMessage50Percent] = useState('');
  
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
  }, [Math.floor(hunger / 20), Math.floor(cleanliness / 20)]);
  
  useEffect(() => {
    if (hunger <= 50 && hunger > 0) {
      setShowWhining(true);
      const whineInterval = setInterval(() => {
        toast({
          title: "😢 Голод!",
          description: "Shadow Milk Cookie очень голоден! Покорми его!",
          variant: "destructive"
        });
      }, 5000);
      
      return () => clearInterval(whineInterval);
    } else {
      setShowWhining(false);
    }
  }, [hunger, toast]);
  
  useEffect(() => {
    if (hunger === 0 || cleanliness === 0 || happiness === 0) {
      setIsCrying(true);
    } else {
      setIsCrying(false);
    }
  }, [hunger, cleanliness, happiness]);
  
  useEffect(() => {
    if (hunger <= 50 && hunger > 0 && cleanliness > 51 && happiness > 51) {
      setIsAt50Percent(true);
      setMessage50Percent('а где еда? Меня обманули?');
      setTimeout(() => setMessage50Percent(''), 3000);
    } else if (cleanliness <= 50 && cleanliness > 0 && hunger > 51 && happiness > 51) {
      setIsAt50Percent(true);
      setMessage50Percent('я пахну как кусок дерьма.');
      setTimeout(() => setMessage50Percent(''), 3000);
    } else if (happiness <= 50 && happiness > 0 && hunger > 51 && cleanliness > 51) {
      setIsAt50Percent(true);
      setMessage50Percent('ээ?');
      setTimeout(() => setMessage50Percent(''), 3000);
    } else if (hunger > 51 && cleanliness > 51 && happiness > 51) {
      setIsAt50Percent(false);
      setMessage50Percent('');
    }
  }, [hunger, cleanliness, happiness]);
  
  useEffect(() => {
    const talkMessages = [
      'Ох-хо-хо! Неужели за мной будет ухаживать как с малышом?~ Не хочу чтобы это повторилось.',
      'Хах? А где веселье? Будет скучно?',
      'Хочешь узнать, почему на моем плаще глаза смотрят на мою задницу?~ Потому что моя задница прекраснее природы!'
    ];
    
    const talkInterval = setInterval(() => {
      if (action !== 'angry' && action !== 'talking') {
        const randomMessage = talkMessages[Math.floor(Math.random() * talkMessages.length)];
        setTalkMessage(randomMessage);
        setAction('talking');
        
        setTimeout(() => {
          setTalkMessage('');
          setAction('idle');
        }, 5000);
      }
    }, 12000);
    
    return () => clearInterval(talkInterval);
  }, [action]);
  
  const playGrowlSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 1.2;
      const sampleRate = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-t * 3) * (1 - Math.exp(-t * 20));
        const baseFreq = 80 + Math.sin(t * 5) * 40;
        const growl = Math.sin(2 * Math.PI * baseFreq * t) * 0.4;
        const noise = (Math.random() * 2 - 1) * 0.3 * envelope;
        const rumble = Math.sin(2 * Math.PI * 30 * t) * 0.3 * envelope;
        data[i] = (growl + noise + rumble) * envelope;
      }
      
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.6;
      
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      filter.Q.value = 3;
      
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      source.start(0);
    } catch (e) {
      console.log('Audio not supported');
    }
  };
  
  const playSound = (type: string) => {
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
      case 'growl':
        playGrowlSound();
        return;
    }
    
    audio.play().catch(() => {});
  };

  const handleFoodClick = () => {
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
  };

  const handleBathClick = () => {
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
  };

  const handlePetClick = () => {
    playSound('click');
    if (action === 'petting') {
      setAction('idle');
      setShowHand(false);
      setDraggingHand(false);
    } else {
      setAction('petting');
      setShowHand(true);
    }
  };

  const handleSleepClick = () => {
    playSound('sleep');
    if (action === 'sleeping') {
      setAction('idle');
    } else {
      setAction('sleeping');
    }
  };

  const checkSoapOnCharacter = (x: number, y: number) => {
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
  };

  const checkFoodOnCharacter = (x: number, y: number) => {
    const characterRect = document.querySelector('.character-img')?.getBoundingClientRect();
    if (characterRect && selectedFood) {
      if (x >= characterRect.left && x <= characterRect.right &&
          y >= characterRect.top && y <= characterRect.bottom) {
        playSound('eat');
        setIsEating(true);
        setHunger(Math.min(100, hunger + 30));
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
  };
  
  const checkHandOnCharacter = (x: number, y: number) => {
    const characterRect = document.querySelector('.character-img')?.getBoundingClientRect();
    if (characterRect) {
      if (x >= characterRect.left && x <= characterRect.right &&
          y >= characterRect.top && y <= characterRect.bottom) {
        
        const currentTime = Date.now();
        const timeSinceLastPetting = currentTime - lastPettingTime;
        
        if (timeSinceLastPetting >= 2000 || lastPettingTime === 0) {
          const newHappiness = Math.min(100, happiness + 15);
          setHappiness(newHappiness);
          setLastPettingTime(currentTime);
          
          if (newHappiness > 50) {
            setShowWhining(false);
          }
          
          toast({
            title: "🎵 Мурр-мурр!",
            description: "Shadow Milk Cookie доволен! +15 счастье",
          });
        }
        
        if (!pettingMessage) {
          setPettingMessage('мур мур мур мур мур~~');
          setAction('petting');
          
          setTimeout(() => {
            setPettingMessage('');
            if (action === 'petting') {
              setAction('idle');
            }
          }, 3000);
        }
      }
    }
  };

  const foodEmojis = {
    egg: '🍳',
    chicken: '🍗',
    noodles: '🍜'
  };
  
  const angryMessages = [
    'ПРЕКРАТИ!',
    'ХВАТИТ!',
    '*Рычание* ДА ТЫ ЗАЕБАЛ!',
    'Я тебе сейчас глотку порву!!'
  ];
  
  const handleCharacterClick = () => {
    if (action === 'angry') return;
    
    playSound('growl');
    const randomMessage = angryMessages[Math.floor(Math.random() * angryMessages.length)];
    setAngryMessage(randomMessage);
    setAction('angry');
    
    setTimeout(() => {
      setAction('idle');
      setAngryMessage('');
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${action === 'sleeping' ? 'bg-gradient-to-b from-indigo-900 to-purple-900' : 'bg-gradient-to-b from-pink-200 via-purple-200 to-yellow-100'}`}>
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        <h1 className="game-title text-3xl md:text-5xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
          Ухаживай за Shadow Milk! 🍪
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-4xl mx-auto w-full">
          <Card className="p-4 border-4 border-yellow-300 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🍽️</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">Голод</span>
                  <span className="text-sm font-semibold">{Math.round(hunger)}%</span>
                </div>
                <Progress value={hunger} className="h-3" style={{
                  background: 'linear-gradient(to right, #fbbf24, #f59e0b)'
                }} />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-4 border-blue-300 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">✨</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">Чистота</span>
                  <span className="text-sm font-semibold">{Math.round(cleanliness)}%</span>
                </div>
                <Progress value={cleanliness} className="h-3" style={{
                  background: 'linear-gradient(to right, #60a5fa, #3b82f6)'
                }} />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-4 border-pink-300 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">💖</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">Счастье</span>
                  <span className="text-sm font-semibold">{Math.round(happiness)}%</span>
                </div>
                <Progress value={happiness} className="h-3" style={{
                  background: 'linear-gradient(to right, #f472b6, #ec4899)'
                }} />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative">
            <div className={`transition-all duration-500 ${action === 'sleeping' ? 'opacity-70' : ''} relative`}>
              <img 
                src={
                  isCrying ? "https://cdn.poehali.dev/files/b89b2f3a-4621-4754-9138-1ad5c5f5d426.png" :
                  isAt50Percent ? "https://cdn.poehali.dev/files/44743569-30d3-4a84-9b22-278bc6eda970.png" :
                  action === 'petting' ? "https://cdn.poehali.dev/files/e181ca10-ace5-4d69-a935-784413fab1e9.png" :
                  action === 'talking' ? "https://cdn.poehali.dev/files/f873f887-1595-443f-8cca-41b9757fc23b.png" :
                  action === 'angry' ? "https://cdn.poehali.dev/files/4cb7713a-ef0b-416d-a4fa-bb4fc252d836.png" :
                  isEating ? "https://cdn.poehali.dev/files/1f7564f4-9858-4ca3-9234-44c89e27ade9.png" :
                  showWhining ? "https://cdn.poehali.dev/files/dcffaa07-9edb-4f82-acab-a1f835b610bb.png" : 
                  "https://cdn.poehali.dev/files/eec1f7bb-a516-476a-befa-eedf06e4dfb7.png"
                }
                alt="Shadow Milk Cookie"
                className={`character-img object-contain drop-shadow-2xl transition-all duration-500 cursor-pointer ${
                  action === 'angry' ? 'w-56 h-56 md:w-80 md:h-80' : 'w-64 h-64 md:w-96 md:h-96'
                } ${
                  isCrying ? 'animate-shake' :
                  isAt50Percent ? 'animate-shake' :
                  action === 'talking' ? 'animate-bounce-in' :
                  action === 'angry' ? '' :
                  action === 'eating' || isEating ? 'animate-shake' : 
                  action === 'petting' ? 'animate-bounce-in' :
                  showWhining ? 'animate-shake' :
                  'animate-float'
                }` }
                onClick={handleCharacterClick}
              />
              {isCrying && (
                <div className="absolute -top-24 md:-top-32 left-0 md:left-1/2 transform md:-translate-x-1/2 bg-gray-700 border-4 border-gray-900 rounded-2xl px-4 py-2 shadow-2xl animate-bounce whitespace-nowrap z-10">
                  <p className="text-white font-bold text-sm md:text-base">
                    *Рыдание*
                  </p>
                </div>
              )}
              {message50Percent && !isCrying && (
                <div className="absolute -top-24 md:-top-32 left-0 md:left-1/2 transform md:-translate-x-1/2 bg-orange-500 border-4 border-orange-700 rounded-2xl px-4 py-2 shadow-2xl whitespace-nowrap z-10">
                  <p className="text-white font-bold text-sm md:text-base">
                    {message50Percent}
                  </p>
                </div>
              )}
              {pettingMessage && (
                <div className="absolute -top-24 md:-top-32 left-0 md:left-1/2 transform md:-translate-x-1/2 bg-pink-400 border-4 border-pink-600 rounded-2xl px-4 py-2 shadow-2xl whitespace-nowrap z-10">
                  <p className="text-white font-bold text-sm md:text-base">
                    {pettingMessage}
                  </p>
                </div>
              )}
              {talkMessage && (
                <div className="absolute -top-24 md:-top-32 left-0 md:left-1/2 transform md:-translate-x-1/2 bg-purple-500 border-4 border-purple-700 rounded-2xl px-4 py-2 shadow-2xl max-w-xs md:max-w-md z-10">
                  <p className="text-white font-bold text-xs md:text-sm whitespace-normal">
                    {talkMessage}
                  </p>
                </div>
              )}
              {angryMessage && (
                <div className="absolute -top-24 md:-top-32 left-0 md:left-1/2 transform md:-translate-x-1/2 bg-red-600 border-4 border-red-900 rounded-2xl px-4 py-2 shadow-2xl animate-pulse whitespace-nowrap z-10">
                  <p className="text-white font-bold text-sm md:text-base">
                    {angryMessage}
                  </p>
                </div>
              )}
              {showWhining && !angryMessage && !isCrying && !pettingMessage && !talkMessage && (
                <div className="absolute -top-24 md:-top-32 left-0 md:left-1/2 transform md:-translate-x-1/2 bg-white border-4 border-red-500 rounded-2xl px-4 py-2 shadow-2xl animate-bounce whitespace-nowrap z-10">
                  <p className="text-red-600 font-bold text-sm md:text-base">
                    Нет нет, ПОГОДИ! Я ХОЧУ КУШАТЬ!
                  </p>
                </div>
              )}
            </div>

            {showBubbles && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-70 animate-bubble"
                    style={{
                      width: Math.random() * 30 + 10 + 'px',
                      height: Math.random() * 30 + 10 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      animationDelay: Math.random() * 2 + 's'
                    }}
                  />
                ))}
              </div>
            )}

            {showShower && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-6xl">
                🚿
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-blue-400 text-4xl opacity-70">
                  💧💧💧💧💧
                </div>
              </div>
            )}



            {action === 'sleeping' && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl animate-float">
                💤 💤 💤
              </div>
            )}
          </div>

          {selectedFood && (
            <div
              className="fixed z-50 text-6xl cursor-move hover:scale-110 transition-transform animate-bounce-in select-none"
              style={{
                left: dragPosition.x - 30,
                top: dragPosition.y - 30,
                pointerEvents: 'auto',
                touchAction: 'none'
              }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseMove={(e) => {
                if (isDragging) {
                  setDragPosition({ x: e.clientX, y: e.clientY });
                }
              }}
              onTouchMove={(e) => {
                if (isDragging) {
                  const touch = e.touches[0];
                  setDragPosition({ x: touch.clientX, y: touch.clientY });
                }
              }}
              onMouseUp={(e) => {
                if (isDragging) {
                  checkFoodOnCharacter(e.clientX, e.clientY);
                  setIsDragging(false);
                }
              }}
              onTouchEnd={(e) => {
                if (isDragging) {
                  const touch = e.changedTouches[0];
                  checkFoodOnCharacter(touch.clientX, touch.clientY);
                  setIsDragging(false);
                }
              }}
            >
              {foodEmojis[selectedFood]}
            </div>
          )}
          
          {showSoap && (
            <div
              className="fixed z-50 text-6xl cursor-move hover:scale-110 transition-transform select-none"
              style={{
                left: draggingSoap ? soapPosition.x - 30 : 'auto',
                top: draggingSoap ? soapPosition.y - 30 : 'auto',
                right: !draggingSoap ? '20%' : 'auto',
                bottom: !draggingSoap ? '40%' : 'auto',
                pointerEvents: 'auto',
                touchAction: 'none'
              }}
              onMouseDown={() => setDraggingSoap(true)}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                setSoapPosition({ x: touch.clientX, y: touch.clientY });
                setDraggingSoap(true);
              }}
              onMouseMove={(e) => {
                if (draggingSoap) {
                  setSoapPosition({ x: e.clientX, y: e.clientY });
                }
              }}
              onTouchMove={(e) => {
                if (draggingSoap) {
                  const touch = e.touches[0];
                  setSoapPosition({ x: touch.clientX, y: touch.clientY });
                }
              }}
              onMouseUp={(e) => {
                if (draggingSoap) {
                  checkSoapOnCharacter(e.clientX, e.clientY);
                }
              }}
              onTouchEnd={(e) => {
                if (draggingSoap) {
                  const touch = e.changedTouches[0];
                  checkSoapOnCharacter(touch.clientX, touch.clientY);
                }
              }}
            >
              🧼
            </div>
          )}
          
          {showHand && (
            <div
              className="fixed z-50 text-6xl cursor-move hover:scale-110 transition-transform select-none"
              style={{
                left: draggingHand ? handPosition.x - 30 : 'auto',
                top: draggingHand ? handPosition.y - 30 : 'auto',
                right: !draggingHand ? '20%' : 'auto',
                bottom: !draggingHand ? '40%' : 'auto',
                pointerEvents: 'auto',
                touchAction: 'none'
              }}
              onMouseDown={() => setDraggingHand(true)}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                setHandPosition({ x: touch.clientX, y: touch.clientY });
                setDraggingHand(true);
              }}
              onMouseMove={(e) => {
                if (draggingHand) {
                  setHandPosition({ x: e.clientX, y: e.clientY });
                  checkHandOnCharacter(e.clientX, e.clientY);
                }
              }}
              onTouchMove={(e) => {
                if (draggingHand) {
                  const touch = e.touches[0];
                  setHandPosition({ x: touch.clientX, y: touch.clientY });
                  checkHandOnCharacter(touch.clientX, touch.clientY);
                }
              }}
              onMouseUp={() => setDraggingHand(false)}
              onTouchEnd={() => setDraggingHand(false)}
            >
              👋
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 pb-8">
          <Card 
            className={`p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 border-4 ${
              action === 'eating' ? 'border-yellow-400 bg-yellow-50' : 'border-purple-300 bg-white'
            }`}
            onClick={handleFoodClick}
          >
            <div className="text-5xl">🍪</div>
            <span className="font-bold text-sm md:text-base text-center">Еда</span>
          </Card>

          <Card 
            className={`p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 border-4 ${
              action === 'bathing' ? 'border-blue-400 bg-blue-50' : 'border-purple-300 bg-white'
            }`}
            onClick={handleBathClick}
          >
            <div className="text-5xl">🛁</div>
            <span className="font-bold text-sm md:text-base text-center">Ванна</span>
          </Card>

          <Card 
            className={`p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 border-4 ${
              action === 'petting' ? 'border-pink-400 bg-pink-50' : 'border-purple-300 bg-white'
            }`}
            onClick={handlePetClick}
          >
            <div className="text-5xl">✋</div>
            <span className="font-bold text-sm md:text-base text-center">Гладить</span>
          </Card>

          <Card 
            className={`p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 border-4 ${
              action === 'sleeping' ? 'border-indigo-400 bg-indigo-50' : 'border-purple-300 bg-white'
            }`}
            onClick={handleSleepClick}
          >
            <div className="text-5xl">🌙</div>
            <span className="font-bold text-sm md:text-base text-center">Спать</span>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;