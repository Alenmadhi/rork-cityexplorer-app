import { SuccessStory } from '@/types';

export const successStories: SuccessStory[] = [
  {
    id: '1',
    title: 'Castle Wall Restoration',
    description: 'A section of the historic Elbasan Castle wall was damaged by graffiti. Thanks to citizen reports, the Cultural Heritage Department quickly restored the wall using specialized cleaning techniques that preserved the historic stone.',
    beforeImage: 'https://images.unsplash.com/photo-1572969095242-fa6a7da5b6d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    afterImage: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    date: '2023-06-20',
    location: 'Elbasan Castle, Historic District',
    issueId: '5',
    featured: true,
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    title: 'Qemal Stafa Street Repair',
    description: 'A large pothole on Qemal Stafa Street was causing traffic problems and vehicle damage. After multiple citizen reports, the Road Maintenance Department repaired the road with new asphalt and improved drainage to prevent future damage.',
    beforeImage: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    afterImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    date: '2023-06-25',
    location: 'Rruga Qemal Stafa, City Center',
    issueId: '1',
    featured: true,
    likes: 32,
    comments: 12
  },
  {
    id: '3',
    title: 'Park Cleanup Initiative',
    description: 'Overflowing trash bins in the park near Elbasan Castle were creating an unsightly and unhygienic situation. The Waste Management Department not only cleaned up the area but also installed new, larger capacity bins and increased collection frequency.',
    beforeImage: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    afterImage: 'https://images.unsplash.com/photo-1587613864521-9ef8dfe617cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    date: '2023-06-15',
    location: 'Park near Elbasan Castle',
    issueId: '3',
    featured: false,
    likes: 18,
    comments: 5
  },
  {
    id: '4',
    title: 'Water Leak Repair',
    description: 'A water leak on Bulevardi Qemal Stafa was creating hazardous conditions for pedestrians. The Water Supply Company quickly identified the source of the leak, repaired the damaged pipe, and restored the sidewalk.',
    beforeImage: 'https://images.unsplash.com/photo-1584677626646-7c8f83690304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600359738432-965e50c4d89e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    date: '2023-06-18',
    location: 'Bulevardi Qemal Stafa, near the bank',
    issueId: '4',
    featured: false,
    likes: 15,
    comments: 3
  }
];