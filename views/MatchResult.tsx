import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const MatchResult = ({ route, navigation }: any) => {
    const { team1, team2 } = route.params;
    const [scoreTeam1, setScoreTeam1] = useState('');
    const [scoreTeam2, setScoreTeam2] = useState('');

    const handleSaveResult = () => {
        console.log(`Result: ${team1.name} ${scoreTeam1} - ${team2.name} ${scoreTeam2}`);
        navigation.navigate('RandomMatch');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Match Result</Text>
            <Text style={styles.teamName}>{team1.name}</Text>
            <TextInput
                style={styles.input}
                placeholder="Score"
                keyboardType="numeric"
                value={scoreTeam1}
                onChangeText={setScoreTeam1}
            />
            {team2 && (
                <>
                    <Text style={styles.teamName}>{team2.name}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Score"
                        keyboardType="numeric"
                        value={scoreTeam2}
                        onChangeText={setScoreTeam2}
                    />
                </>
            )}
            <Button title="Save Result" onPress={handleSaveResult} color="#2a9d8f" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2a9d8f',
        marginBottom: 20,
    },
    teamName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '80%',
        borderRadius: 5,
    },
});

export default MatchResult;
