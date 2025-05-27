
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, PlayCircle, BookOpen, MapPin, Video, GraduationCap } from "lucide-react";
import TrainingVideoPlayer from "@/components/training/TrainingVideoPlayer";
import TrainingRegistrationForm from "@/components/training/TrainingRegistrationForm";
import { useToast } from "@/hooks/use-toast";

interface OnlineTraining {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  videoUrl: string;
  thumbnail: string;
  progress: number;
  completed: boolean;
  instructor: string;
  rating: number;
}

interface LiveTraining {
  id: string;
  title: string;
  description: string;
  type: 'live' | 'physical';
  date: string;
  time: string;
  duration: string;
  location?: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  instructor: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  registered: boolean;
}

const mockOnlineTrainings: OnlineTraining[] = [
  {
    id: '1',
    title: 'Techniques de photographie de mariage moderne',
    description: 'Apprenez les dernières techniques pour capturer des moments magiques',
    duration: '2h 30min',
    level: 'Intermédiaire',
    category: 'Photographie',
    videoUrl: 'https://example.com/video1',
    thumbnail: '/placeholder.svg',
    progress: 75,
    completed: false,
    instructor: 'Marie Dubois',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Gestion de la relation client dans l\'événementiel',
    description: 'Stratégies pour fidéliser et satisfaire vos clients',
    duration: '1h 45min',
    level: 'Débutant',
    category: 'Business',
    videoUrl: 'https://example.com/video2',
    thumbnail: '/placeholder.svg',
    progress: 100,
    completed: true,
    instructor: 'Jean Martin',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Tendances florales 2024',
    description: 'Découvrez les nouvelles tendances en décoration florale',
    duration: '3h 15min',
    level: 'Avancé',
    category: 'Décoration',
    videoUrl: 'https://example.com/video3',
    thumbnail: '/placeholder.svg',
    progress: 0,
    completed: false,
    instructor: 'Sophie Laurent',
    rating: 4.9
  }
];

const mockLiveTrainings: LiveTraining[] = [
  {
    id: '1',
    title: 'Masterclass: Organisation d\'événements d\'exception',
    description: 'Session intensive avec des experts reconnus du secteur',
    type: 'live',
    date: '2024-06-15',
    time: '14:00',
    duration: '3h',
    maxParticipants: 50,
    currentParticipants: 32,
    price: 150,
    instructor: 'Pierre Dufour',
    category: 'Organisation',
    level: 'Avancé',
    registered: false
  },
  {
    id: '2',
    title: 'Atelier pratique: Techniques de DJ',
    description: 'Formation pratique dans nos studios professionnels',
    type: 'physical',
    date: '2024-06-20',
    time: '10:00',
    duration: '6h',
    location: 'Paris - Studio WeEvent',
    maxParticipants: 12,
    currentParticipants: 8,
    price: 300,
    instructor: 'Alex Moreau',
    category: 'Musique',
    level: 'Intermédiaire',
    registered: true
  },
  {
    id: '3',
    title: 'Webinaire: Marketing digital pour prestataires',
    description: 'Boostez votre visibilité en ligne',
    type: 'live',
    date: '2024-06-10',
    time: '19:00',
    duration: '2h',
    maxParticipants: 100,
    currentParticipants: 67,
    price: 75,
    instructor: 'Laura Chen',
    category: 'Marketing',
    level: 'Débutant',
    registered: false
  }
];

const PartnerTraining = () => {
  const [selectedVideo, setSelectedVideo] = useState<OnlineTraining | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState<LiveTraining | null>(null);
  const [onlineTrainings] = useState(mockOnlineTrainings);
  const [liveTrainings, setLiveTrainings] = useState(mockLiveTrainings);
  const { toast } = useToast();

  const handleVideoPlay = (training: OnlineTraining) => {
    setSelectedVideo(training);
  };

  const handleRegistration = (training: LiveTraining) => {
    setShowRegistrationForm(training);
  };

  const handleRegistrationSubmit = (trainingId: string) => {
    setLiveTrainings(prev => 
      prev.map(training => 
        training.id === trainingId 
          ? { ...training, registered: true, currentParticipants: training.currentParticipants + 1 }
          : training
      )
    );
    setShowRegistrationForm(null);
    toast({
      title: "Inscription confirmée",
      description: "Vous êtes maintenant inscrit à cette formation"
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Formation</h1>
            <p className="text-gray-600 mt-2">
              Développez vos compétences avec nos formations en ligne et nos sessions live
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Formations complétées</p>
              <p className="text-lg font-semibold">3/12</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="online" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="online" className="flex items-center space-x-2">
              <PlayCircle className="h-4 w-4" />
              <span>Formations en ligne</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Formations live</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineTrainings.map((training) => (
                <Card key={training.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="relative mb-3">
                      <img 
                        src={training.thumbnail} 
                        alt={training.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getLevelColor(training.level)}>
                          {training.level}
                        </Badge>
                      </div>
                      {training.completed && (
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-green-600 text-white">
                            ✓ Terminé
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{training.title}</CardTitle>
                    <p className="text-sm text-gray-600">{training.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{training.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{training.category}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>{training.progress}%</span>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="font-medium">{training.instructor}</p>
                        <p className="text-gray-600">⭐ {training.rating}</p>
                      </div>
                      <Button 
                        onClick={() => handleVideoPlay(training)}
                        variant={training.completed ? "outline" : "default"}
                        size="sm"
                      >
                        <PlayCircle className="h-4 w-4 mr-1" />
                        {training.completed ? "Revoir" : "Continuer"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveTrainings.map((training) => (
                <Card key={training.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getLevelColor(training.level)}>
                            {training.level}
                          </Badge>
                          <Badge variant="outline">
                            {training.type === 'live' ? (
                              <><Video className="h-3 w-3 mr-1" /> En ligne</>
                            ) : (
                              <><MapPin className="h-3 w-3 mr-1" /> Présentiel</>
                            )}
                          </Badge>
                          {training.registered && (
                            <Badge className="bg-blue-600 text-white">
                              Inscrit
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">{training.title}</CardTitle>
                        <p className="text-gray-600">{training.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{training.price}€</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{new Date(training.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{training.time} ({training.duration})</span>
                      </div>
                      {training.location && (
                        <div className="flex items-center space-x-2 col-span-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{training.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Places disponibles</span>
                        <span>{training.maxParticipants - training.currentParticipants} / {training.maxParticipants}</span>
                      </div>
                      <Progress 
                        value={(training.currentParticipants / training.maxParticipants) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="font-medium">{training.instructor}</p>
                        <p className="text-sm text-gray-600">{training.category}</p>
                      </div>
                      <Button 
                        onClick={() => handleRegistration(training)}
                        disabled={training.registered || training.currentParticipants >= training.maxParticipants}
                        className={training.registered ? "bg-green-600" : ""}
                      >
                        {training.registered ? (
                          <>✓ Inscrit</>
                        ) : training.currentParticipants >= training.maxParticipants ? (
                          "Complet"
                        ) : (
                          <>
                            <Users className="h-4 w-4 mr-1" />
                            S'inscrire
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedVideo && (
          <TrainingVideoPlayer
            training={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}

        {showRegistrationForm && (
          <TrainingRegistrationForm
            training={showRegistrationForm}
            onClose={() => setShowRegistrationForm(null)}
            onSubmit={handleRegistrationSubmit}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default PartnerTraining;
