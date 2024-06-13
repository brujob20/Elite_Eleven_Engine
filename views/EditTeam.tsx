import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useRoute} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";
import {LinearGradient} from "expo-linear-gradient";

const EditTeam = ({ navigation }) => {
    const route = useRoute()
    const { id } = route.params;
    const [name, setName] = useState('');
    const [playerAmount, setPlayerAmount] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [loading, setLoading] = useState(true);

    console.log(id)

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/teams/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, playerAmount: parseInt(playerAmount), ageGroup }),
            });
//
            if (response.ok) {
                //alert('Teamdaten erfolgreich gespeichert');
                navigation.goBack(); // Zurück zur vorherigen Seite
                navigation.reload;
            } else {
                alert('Fehler beim Speichern der Teamdaten');
            }
        } catch (error) {
            console.error("Fehler beim Speichern der Teamdaten:", error);
        }
    };


    return (
        <LinearGradient
            colors={['#e0f7fa', '#c8e6c9']}
            style={styles.container}
        >
        <View style={styles.container}>
            <Text style={styles.label}>Team Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Spieleranzahl:</Text>
            <TextInput
                style={styles.input}
                value={playerAmount}
                onChangeText={setPlayerAmount}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Altersklasse:</Text>
            <Picker
                selectedValue={ageGroup}
                style={styles.picker}
                onValueChange={(itemValue) => setAgeGroup(itemValue)}
            >
                <Picker.Item label="- Select -" value="" />
                <Picker.Item label="U13" value="U13" />
                <Picker.Item label="U15" value="U15" />
                <Picker.Item label="U17" value="U17" />
                <Picker.Item label="U19" value="U19" />
                <Picker.Item label="Herren" value="Herren" />
            </Picker>
            <Button title="Speichern" onPress={handleSave} color="#2a9d8f" />
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        width: '100%',
    }

});

export default EditTeam;
