import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Frontpage = ({ navigation }:any) => {
    return (
        <View style={styles.container}>
            <Button
                title="Add Team"
                onPress={() => navigation.navigate('AddTeam')}
                color="#2a9d8f"
            />
            <Button
                title="Show Teams"
                onPress={() => navigation.navigate('ShowTeams')}
                color="#2a9d8f"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Frontpage;
