import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { getTeams } from "../srvice/api";
import { ITeam } from "../model/ITeam";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";

const RandomMatch = ({ navigation }: any) => {
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [matches, setMatches] = useState<{ team1: ITeam, team2?: ITeam }[]>([]);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('Herren');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams();
                setTeams(response);
                if (response.length > 0) {
                    const randomMatches = createRandomMatches(response, selectedAgeGroup);
                    setMatches(randomMatches);
                }
            } catch (error) {
                console.error("Fehler beim Laden der Teams:", error);
            }
        };

        fetchTeams();
    }, [selectedAgeGroup]);

    const createRandomMatches = (teams: ITeam[], ageGroup: string): { team1: ITeam, team2?: ITeam }[] => {
        const filteredTeams = ageGroup === 'All' ? teams : teams.filter(team => team.ageGroup === ageGroup);
        const shuffledTeams = filteredTeams.sort(() => 0.5 - Math.random());
        const matches = [];

        for (let i = 0; i < shuffledTeams.length; i += 2) {
            const team1 = shuffledTeams[i];
            const team2 = shuffledTeams[i + 1];
            matches.push({ team1, team2 });
        }

        return matches;
    };

    const renderItem = ({ item }: { item: { team1: ITeam, team2?: ITeam } }) => (
        <Pressable
            style={styles.matchContainer}
            onPress={() => navigation.navigate('MatchResult', { team1: item.team1, team2: item.team2 })}
        >
            <Text style={styles.team}>{item.team1.name}</Text>
            <Text style={styles.vs}>VS</Text>
            {item.team2 ? (
                <Text style={styles.team}>{item.team2.name}</Text>
            ) : (
                <Text style={styles.qualifiziert}>Bereits qualifiziert</Text>
            )}
        </Pressable>
    );

    return (
        <LinearGradient
            colors={['#e0f7fa', '#c8e6c9']}
            style={styles.container}
        >
            <Text style={styles.title}>Random Matches</Text>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedAgeGroup}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedAgeGroup(itemValue)}
                >
                    <Picker.Item label="Herren" value="Herren" />
                    <Picker.Item label="U13" value="U13" />
                    <Picker.Item label="U15" value="U15" />
                    <Picker.Item label="U17" value="U17" />
                    <Picker.Item label="U19" value="U19" />
                </Picker>
            </View>

            <FlatList
                data={matches}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <View style={styles.buttonContainer}>
                <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#2a9d8f" />
            </View>
        </LinearGradient>
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
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        elevation: 3,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 15,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    team: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: '#333',
    },
    vs: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d9534f',
        flex: 1,
        textAlign: 'center',
    },
    qualifiziert: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: '#2a9d8f',
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RandomMatch;
