import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://valorant-api.com/v1",
  params: {
    language: 'pt-BR',
    isPlayableCharacter: true
  }
});

export const getListAgents = async (code: string): Promise<AxiosResponse> => await api.get("/agents", {
  params: {
    language: code
  }
});
