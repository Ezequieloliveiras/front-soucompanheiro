import * as React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{ width: '100%' }}>
      <List.Accordion
        title="Pedreiro"
        left={props => <List.Icon />}>
        <List.Item title="First item" />
        <List.Item title="Second item" style={{ padding: 50 }} />
      </List.Accordion>

      <List.Accordion
        title="Maquinista"
        left={props => <List.Icon />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </View>
  );
};

export default MyComponent;