import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddTeam = () => {
    const [name, setName] = useState('');
    const [spielerAmount, setSpielerAmount] = useState('');
    const [Altersklasse, setAltersklasse] = useState('');

    const handleSubmit = () => {
        const team = { name, spielerAmount: parseInt(spielerAmount, 10), Altersklasse };
        console.log(team);
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
                selectedValue={Altersklasse}
                style={styles.picker}
                onValueChange={(itemValue) => setAltersklasse(itemValue)}
            >
                <Picker.Item label="- Select -" value="" />
                <Picker.Item label="U11" value="U11" />
                <Picker.Item label="U12" value="U12" />
                <Picker.Item label="U13" value="U13" />
                <Picker.Item label="U14" value="U14" />
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
