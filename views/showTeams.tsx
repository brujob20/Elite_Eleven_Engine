import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Animated, TextInput, TouchableOpacity} from 'react-native';
import { teams } from '../data/mockData';
import {getTeams} from "../srvice/api";
import {ITeam} from "../model/ITeam";
import ScrollView = Animated.ScrollView;
import {FaSearch} from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import {Picker} from "@react-native-picker/picker";

const ShowTeams = () => {
    const [teams, setTeams] = React.useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');


    const filteredTeamsName = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams();
                setTeams(response);
            } catch (error) {
                console.error("Failed to fetch training plans:", error);
            }
        };

        fetchTeams();
    }, []);


    return (

        <View style={styles.container}>
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
                        <Picker.Item label="U13" value="U13" style={styles.pickerItem}/>
                        <Picker.Item label="U15" value="U15" style={styles.pickerItem}/>
                        <Picker.Item label="U17" value="U17" style={styles.pickerItem}/>
                        <Picker.Item label="U19" value="U19" style={styles.pickerItem}/>
                        <Picker.Item label="Herren" value="Herren" />
                    </Picker>
                )}
            </View>
            <ScrollView style={styles.scrollView}>
                {filteredTeamsName.map((team, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.title}>{team.name}</Text>
                        <Text>Spieleranzahl: {team.playerAmount}</Text>
                        <Text>Altersklasse: {team.ageGroup}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
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
    }
});

export default ShowTeams;
