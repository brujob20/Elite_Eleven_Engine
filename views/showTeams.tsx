import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { teams } from '../data/mockData';

const ShowTeams = () => {

    const renderItem = ({ item }: any) => (
        <View style={styles.teamContainer}>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text>Spieleranzahl: {item.spielerAmount}</Text>
            <Text>Altersklasse: {item.Altersklasse}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={teams}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    teamContainer: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    teamName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default ShowTeams;
