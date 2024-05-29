import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const AddTeam = () => {
    const [name, setName] = useState('');
    const [spielerAmount, setSpielerAmount] = useState('');
    const [Altersklasse, setAltersklasse] = useState('');

    const handleSubmit = () => {
        const team = { name, spielerAmount: parseInt(spielerAmount, 10), Altersklasse };
        console.log(team);
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
                selectedValue={Altersklasse}
                style={styles.picker}
                onValueChange={(itemValue) => setAltersklasse(itemValue)}
            >
                <Picker.Item label="- Select -" value="" />
                <Picker.Item label="U11" value="U11" />
                <Picker.Item label="U12" value="U12" />
                <Picker.Item label="U13" value="U13" />
                <Picker.Item label="U14" value="U14" />
                <Picker.Item label="U15" value="U15" />
                <Picker.Item label="U18" value="U18" />
                <Picker.Item label="U21" value="U21" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Team hinzufügen</Text>
            </TouchableOpacity>
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
