export interface SectionConfig {
  id: string;
  numberStr: string;
  title: string;
  eyebrow?: string;
  headline: string;
  supportingCopy?: string;
}

export type CreatorStage =
  | 'Planning to Start'
  | 'New Creator'
  | 'Active Creator'
  | 'Established Creator'
  | 'Creator Agency';

export type MainGoal =
  | 'Create More Content'
  | 'Automate Conversations'
  | 'Increase Direct Sales'
  | 'Get Professional Support'
  | 'Access International Opportunities';

export interface ApplicationFormData {
  firstName: string;
  email: string;
  socialHandle: string;
  creatorStage: CreatorStage | '';
  mainGoal: MainGoal | '';
  confirmedAge: boolean;
}

export interface FormErrors {
  firstName?: string;
  email?: string;
  socialHandle?: string;
  creatorStage?: string;
  mainGoal?: string;
  confirmedAge?: string;
  general?: string;
}

export interface ModalContent {
  title: string;
  subtitle?: string;
  content: string[];
}
