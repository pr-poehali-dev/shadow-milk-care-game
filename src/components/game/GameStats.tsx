import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GameStatsProps {
  hunger: number;
  cleanliness: number;
  happiness: number;
}

export const GameStats = ({ hunger, cleanliness, happiness }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-4xl mx-auto w-full">
      <Card className="p-4 border-4 border-yellow-300 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🍖</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold text-yellow-700">Голод</span>
              <span className="text-sm font-bold text-yellow-700">{Math.round(hunger)}%</span>
            </div>
            <Progress 
              value={hunger} 
              className="h-3 bg-yellow-100"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-4 border-blue-300 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">✨</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold text-blue-700">Чистота</span>
              <span className="text-sm font-bold text-blue-700">{Math.round(cleanliness)}%</span>
            </div>
            <Progress 
              value={cleanliness} 
              className="h-3 bg-blue-100"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-4 border-pink-300 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">💖</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold text-pink-700">Счастье</span>
              <span className="text-sm font-bold text-pink-700">{Math.round(happiness)}%</span>
            </div>
            <Progress 
              value={happiness} 
              className="h-3 bg-pink-100"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
