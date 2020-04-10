import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const MyComponent = () => (
  <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
  />
);
