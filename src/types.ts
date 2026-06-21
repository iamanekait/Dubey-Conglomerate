export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  icon: string;
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatarUrl?: string;
}

export interface MetricCard {
  id: string;
  value: string;
  label: string;
  description: string;
  prefix?: string;
  suffix?: string;
}

export interface ConsultationInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
  status: 'pending' | 'confirmed';
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  type: 'select' | 'input-number';
  options?: { value: string; label: string; impact: string }[];
  placeholder?: string;
}
