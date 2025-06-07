import { EmergencyAlert } from '@/types';

export const emergencyAlerts: EmergencyAlert[] = [
  {
    id: '1',
    title: 'Water Service Interruption',
    message: 'Scheduled maintenance will interrupt water service in the eastern district from 10 PM to 4 AM tonight. Please store water for evening use.',
    type: 'info',
    active: true,
    startDate: '2023-06-28T10:00:00Z',
    endDate: '2023-06-29T04:00:00Z'
  },
  {
    id: '2',
    title: 'Severe Weather Warning',
    message: 'Heavy rainfall expected in Elbasan region. Potential for flash flooding in low-lying areas. Stay indoors if possible.',
    type: 'warning',
    active: true,
    startDate: '2023-06-27T00:00:00Z',
    endDate: '2023-06-29T23:59:59Z'
  },
  {
    id: '3',
    title: 'Road Closure Alert',
    message: 'Rruga 11 Nëntori will be closed for emergency repairs from the museum to the city center. Please use alternate routes.',
    type: 'info',
    active: true,
    startDate: '2023-06-28T08:00:00Z',
    endDate: '2023-06-30T18:00:00Z',
    link: 'https://elbasan.gov.al/roadclosures'
  },
  {
    id: '4',
    title: 'COVID-19 Testing Site',
    message: 'Free COVID-19 testing available at the main hospital. No appointment necessary. Bring ID.',
    type: 'info',
    active: false,
    startDate: '2023-06-15T08:00:00Z',
    endDate: '2023-06-25T18:00:00Z'
  },
  {
    id: '5',
    title: 'Emergency: Gas Leak',
    message: 'Gas leak reported near the industrial zone. Affected streets are being evacuated. Follow instructions from emergency personnel.',
    type: 'danger',
    active: false,
    startDate: '2023-06-10T14:30:00Z',
    endDate: '2023-06-10T18:45:00Z'
  }
];