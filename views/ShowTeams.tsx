import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTeams } from "../srvice/api";
import { ITeam } from "../model/ITeam";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from 'expo-linear-gradient';

const ShowTeams = () => {
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const fetchTeams = async () => {
        try {
            const response = await getTeams();
            setTeams(response);
        } catch (error) {
            console.error("Fehler beim Laden der Teams:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchTeams();
        }, [])
    );

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedValue === '' || team.ageGroup === selectedValue)
    );

    return (
        <LinearGradient
            colors={['#e0f7fa', '#c8e6c9']}
            style={styles.container}
        >
            <View style={styles.fixedHeader}>
                <FaSearch style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Suche"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setFilterVisible(!filterVisible)}>
                    <IoFilter size={24} />
                </TouchableOpacity>
                {filterVisible && (
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="- Select -" value="" />
                        <Picker.Item label="U13" value="U13" style={styles.pickerItem} />
                        <Picker.Item label="U15" value="U15" style={styles.pickerItem} />
                        <Picker.Item label="U17" value="U17" style={styles.pickerItem} />
                        <Picker.Item label="U19" value="U19" style={styles.pickerItem} />
                        <Picker.Item label="Herren" value="Herren" style={styles.pickerItem} />
                    </Picker>
                )}
            </View>
            {filteredTeams.length === 0 ? (
                <Text style={styles.noResults}>Keine Ergebnisse gefunden</Text>
            ) : (
                <FlatList
                    data={filteredTeams}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text>Spieleranzahl: {item.playerAmount}</Text>
                            <Text>Altersklasse: {item.ageGroup}</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingTop: 100 }} // Abstand für den Header
                />
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 10,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    icon: {
        fontSize: 24,
        marginHorizontal: 8, // Stellt gleichen Abstand zwischen den Icons und der Search-Bar sicher
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1, // Nur der untere Rand wird angezeigt
        padding: 10,
        textAlign: 'left', // Text links ausrichten
    },
    scrollView: {
        marginTop: 70,
    },
    card: {
        backgroundColor: '#c7c5c5',
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        width: '100%', // Nimmt die volle Breite des Containers ein
        backgroundColor: '#fff', // weißer Hintergrund
        borderRadius: 5, // leicht abgerundete Ecken für ein modernes Aussehen
        borderWidth: 1, // feine Grenze
        borderColor: '#dcdcdc', // leichte Grenzfarbe
        fontSize: 16, // angemessene Textgröße für gute Lesbarkeit
        color: '#333', // dunkelgraue Textfarbe für hohen Kontrast
        padding: 10, // Innenabstand für bessere Berührbarkeit
        marginVertical: 5, // vertikaler Abstand zwischen den Pickerelementen
    },
    pickerItem: {
        height: 44, // Höhe jedes Picker-Elements
        color: '#333', // Textfarbe der Picker-Elemente
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#777',
    },
});

export default ShowTeams;
