export interface StudentProfile {
  id: number;
  firstname?: string;
  lastname?: string;
  fullName?: string;
  email: string;
  phone: string;
  age?: number;
  status?: string;
  userType?: string;
  registrationDate?: string;

  // Nuevos campos agregados para perfil extendido
  educationLevel?: string;
  interests?: string[];
  academicHistory?: string;
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacySettings?: {
    profileVisible: boolean;
    dataSharing: boolean;
  };
  language?: string;
  timeZone?: string;
  profilePicture?: string;
  bio?: string;

  progress?: {
    overallPercentage: number;
    tests: {
      name: string;
      status: string;
      completionDate?: string;
      estimatedTime?: string;
    }[];
  };

  recommendedCareers?: {
    name: string;
    description: string;
    compatibilityPercentage: number;
  }[];
}
