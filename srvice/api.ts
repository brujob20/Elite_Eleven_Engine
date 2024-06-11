import axios from "axios";
import {ITeam} from "../model/ITeam";

const BASE_URL = "http://localhost:3000/teams/";

export const getTeams = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export const postTeams = async (data:any) => {
    const response = await axios.post(BASE_URL, data);
}