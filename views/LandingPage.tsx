import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LandingPage = ({ navigation }: any) => {
    return (
        <LinearGradient
            colors={['#e0f7fa', '#c8e6c9']}
            style={styles.container}
        >
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
        color: '#333',
    },
});

export default LandingPage;
