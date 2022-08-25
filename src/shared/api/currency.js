import http from "../http";

export const getRateCurrencies = (params) => {
    return http.get("/exchange?json", params)
}