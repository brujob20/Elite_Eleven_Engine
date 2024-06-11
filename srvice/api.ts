import axios from "axios";
import {ITeam} from "../model/ITeam";

const API_URL = "http://localhost:3000/teams/";

export const getTeams = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const postTeams = async (team:ITeam) => {

    try {
        const response = await axios.post(API_URL, team);
        return response.data;
    } catch (error) {
        console.error("Error posting team:", error);
        throw error;
    }
};