import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { ITeam } from "../model/ITeam";
import { postTeams } from "../srvice/api";

const AddTeam = () => {
    const [name, setName] = useState('');
    const [spielerAmount, setSpielerAmount] = useState('');
    const [ageGroup, setAgeGroup] = useState<string>('');

    const navigation = useNavigation();

    const handleSubmit = async () => {
        const team: ITeam = { name: name, playerAmount: parseInt(spielerAmount, 10), ageGroup: ageGroup };
        try {
            await postTeams(team);
            Alert.alert("Erfolg", "Team erfolgreich hinzugefügt");
            setName('');
            setSpielerAmount('');
            setAgeGroup('');
            // @ts-ignore
            navigation.navigate('Home');  // Navigiere zur Home-Seite
        } catch (error) {
            Alert.alert("Fehler", "Team konnte nicht hinzugefügt werden");
        }
    };

    return (
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        width: '100%',
    },
    picker: {
        height: 50,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        width: '100%',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default AddTeam;
