import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Animated, TextInput, TouchableOpacity, Pressable} from 'react-native';
import { teams } from '../data/mockData';
import {deleteTeam, getTeams} from "../srvice/api";
import {ITeam} from "../model/ITeam";
import ScrollView = Animated.ScrollView;
import {FaEdit, FaSearch} from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import {Picker} from "@react-native-picker/picker";
import {LinearGradient} from "expo-linear-gradient";
import {useFocusEffect} from "@react-navigation/native";
import {MdOutlineDeleteForever} from "react-icons/md";

const ShowTeams = ({navigation}) => {
    const [teams, setTeams] = React.useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('All');

    const filteredTeamsName = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteTeams = (id) => {
        deleteTeam(id);
        fetchTeams();
    }


    const fetchTeams = async () => {
        try {
            const response = await getTeams();
            setTeams(response);
        } catch (error) {
            console.error("Failed to fetch training plans:", error);
        }
    };

    useFocusEffect(
    React.useCallback(() => {
        fetchTeams();
    }, []));


    return (
        <LinearGradient
            colors={['#e0f7fa', '#c8e6c9']}
            style={styles.container}>
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
                        selectedValue={selectedAgeGroup}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedAgeGroup(itemValue)}
                    >
                        <Picker.Item label="All" value="All" style={styles.pickerItem}/>
                        <Picker.Item label="U13" value="U13" style={styles.pickerItem}/>
                        <Picker.Item label="U15" value="U15" style={styles.pickerItem}/>
                        <Picker.Item label="U17" value="U17" style={styles.pickerItem}/>
                        <Picker.Item label="U19" value="U19" style={styles.pickerItem}/>
                        <Picker.Item label="Herren" value="Herren" />
                    </Picker>
                )}
            </View>
            <ScrollView style={styles.scrollView}>
                {filteredTeamsName
                    .filter(team => selectedAgeGroup === 'All' || team.ageGroup === selectedAgeGroup)
                    .map((team, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.title}>{team.name}</Text>
                            <Text>Spieleranzahl: {team.playerAmount}</Text>
                            <Text>Altersklasse: {team.ageGroup}</Text>
                            <Pressable style={styles.editIcon} onPress={() => navigation.navigate('EditTeam', { id: team._id })}>
                                <FaEdit />
                            </Pressable>
                            <Pressable style={styles.deleteIcon} onPress={() => deleteTeams(team._id)}>
                                <MdOutlineDeleteForever/>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
        </View>
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        fontSize: 24,
        marginHorizontal: 8,
        color: '#2a9d8f',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        textAlign: 'left',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    scrollView: {
        marginTop: 70,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2a9d8f',
    },
    picker: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        fontSize: 16,
        color: '#333',
        padding: 10,
        marginVertical: 5,
    },
    pickerItem: {
        height: 44,
        color: '#333',
    },
    editIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        fontSize: 24,
        color: '#2a9d8f',
    },
    deleteIcon: {
        position: 'absolute',
        right: 55,
        top: '50%',
        transform: [{ translateY: -12 }],
        fontSize: 28,
        color: "#e74c3c"
    }
});

export default ShowTeams;
