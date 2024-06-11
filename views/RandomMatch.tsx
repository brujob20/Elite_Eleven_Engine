import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getTeams } from "../srvice/api";
import { ITeam } from "../model/ITeam";

const RandomMatch = ({ navigation }:any) => {
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [matches, setMatches] = useState<{ team1: ITeam, team2?: ITeam }[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams();
                setTeams(response);
                if (response.length > 0) {
                    const randomMatches = createRandomMatches(response);
                    setMatches(randomMatches);
                }
            } catch (error) {
                console.error("Fehler beim Laden der Teams:", error);
            }
        };

        fetchTeams();
    }, []);

    const createRandomMatches = (teams: ITeam[]): { team1: ITeam, team2?: ITeam }[] => {
        const shuffledTeams = teams.sort(() => 0.5 - Math.random());
        const matches = [];

        for (let i = 0; i < shuffledTeams.length; i += 2) {
            const team1 = shuffledTeams[i];
            const team2 = shuffledTeams[i + 1];
            matches.push({ team1, team2 });
        }

        return matches;
    };

    const renderItem = ({ item }: { item: { team1: ITeam, team2?: ITeam } }) => (
        <View style={styles.matchContainer}>
            <Text style={styles.team}>{item.team1.name}</Text>
            <Text style={styles.vs}>VS</Text>
            {item.team2 ? (
                <Text style={styles.team}>{item.team2.name}</Text>
            ) : (
                <Text style={styles.qualifiziert}>Bereits qualifiziert</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Random Matches</Text>
            <FlatList
                data={matches}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#2a9d8f" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    team: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    vs: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d9534f',
        flex: 1,
        textAlign: 'center',
    },
    qualifiziert: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: '#2a9d8f',
    },
});

export default RandomMatch;
