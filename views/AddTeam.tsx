import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ITeam } from "../model/ITeam";
import { postTeams } from "../srvice/api";

const AddTeam = () => {
    const [name, setName] = useState('');
    const [spielerAmount, setSpielerAmount] = useState('');
    const [ageGroup, setAgeGroup] = useState<string>('');

    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!name || !spielerAmount || !ageGroup) {
            Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus");
            return;
        }
        const team: ITeam = { name: name, playerAmount: parseInt(spielerAmount, 10), ageGroup: ageGroup };
        try {
            await postTeams(team);
            Alert.alert("Erfolg", "Team erfolgreich hinzugefügt");
            setName('');
            setSpielerAmount('');
            setAgeGroup('');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert("Fehler", "Team konnte nicht hinzugefügt werden");
        }
    };

    return (
        <LinearGradient
            colors={['#e0f7fa', '#c8e6c9']}
            style={styles.container}
        >
            <Text style={styles.label}>Add Team:</Text>
            <TextInput
                style={styles.input}
                placeholder="Team Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Spieleranzahl"
                value={spielerAmount}
                onChangeText={setSpielerAmount}
                keyboardType="numeric"
            />
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
            <Button title="Team hinzufügen" onPress={handleSubmit} color="#2a9d8f" />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    picker: {
        height: 50,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2a9d8f',
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

export default AddTeam;
