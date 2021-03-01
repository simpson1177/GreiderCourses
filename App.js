import { StatusBar } from "expo-status-bar";
import Expo from "expo";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import Ball from "./src/Ball";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri:
      "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
  },
];

export default function App() {
  const renderCard = (item) => {
    console.log(item.text);

    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: item.uri }} />

        <Text style={{ marginBottom: 10, marginTop: 15 }}>
          I can customize the card further
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now"
        />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card title="All Done">
        <Text style={{ marginBottom: 10 }}>Theres no more content here</Text>
        <Button title="Get More!" backgroundColor="#03A9F4" />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        onSwipeRight={() => {}}
        onSwipeLeft={() => {}}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
});
