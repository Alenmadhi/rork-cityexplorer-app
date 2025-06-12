import { Stack } from 'expo-router';

export default function ChallengesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'City Challenges',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Challenge Details',
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: 'Challenges Map',
        }}
      />
    </Stack>
  );
}