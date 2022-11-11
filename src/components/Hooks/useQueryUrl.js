import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const useQueryUrl = (queryDefault = {}) => {
    const { search } = useLocation();
    const [_, setQueryUrl] = useSearchParams();

    const value = search.slice(1);
    let query = {};
    Object.keys(queryDefault).forEach((key) => {
        query[key] = queryDefault[key].toString();
    });
    if (value) {
        query = JSON.parse(
            '{"' + value.replace(/=/g, '":"').replace(/&/g, '","') + '"}'
        );
    }
    return [query, setQueryUrl];
};
