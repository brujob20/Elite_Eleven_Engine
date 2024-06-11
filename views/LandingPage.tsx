import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const LandingPage = ({ navigation }:any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Willkommen bei Elite Eleven Engine</Text>
            <Image
                source={{ uri: 'assets/MainIcon.png' }}
                style={styles.image}
            />
            <Text style={styles.description}>
                Erstellen sie schnell und einfach Tournier-Pläne
            </Text>
            <Button
                title="Los geht's!"
                onPress={() => navigation.navigate('RandomMatch')}
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
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 230,
        height: 230,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    }
});

export default LandingPage;
