import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
//import { getTeams } from '../services/teamService'; // Angenommene Funktion zur Abfrage der Datenbank

const Frontpage = ({navigation}) => {
    const [teams, setTeams] = useState([]);

    /*useEffect(() => {
        // Simulieren Sie das Laden der Teams
        // getTeams().then(data => setTeams(data)); // Aktivieren Sie diese Zeile, wenn die Funktion verfügbar ist
        setTeams([
            { name: "Team Alpha", spielerAmount: 12, Altersklasse: "U17" },
            { name: "Team Beta", spielerAmount: 15, Altersklasse: "U19" }
        ]);
    }, []);

     */

    return (

            <Button
                title="Add Team"
                onPress={() => navigation.navigate('AddTeam')}
                color="#2a9d8f" // Farbe passend zum Design
            />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    teamContainer: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10
    },
    teamName: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Frontpage;
