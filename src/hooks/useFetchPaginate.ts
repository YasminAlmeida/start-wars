import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

interface PaginatedResponse<T> {
    count: number;
    results: T[];
}

export const useFetchPaginate = (url: string) => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedData, setSelectedData] = useState<any>(null);

    const fetchPaginate = async () => {
        const fullUrl = url ? `${url}?page=${page}&search=${searchQuery}` : url;

        try {
            const response = await api.get<PaginatedResponse<any>>(fullUrl || '/');
            return {
                results: response.data.results,
                count: response.data.count,
            };
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    };

    const {
        data,
        isLoading: isFetching,
        error,
    } = useQuery({
        queryKey: ['fetchPaginate', url, searchQuery, page],
        queryFn: fetchPaginate
    });


    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleRowClick = (record: any) => {
        setSelectedData(record);
    };

    const handleModalClose = () => {
        setSelectedData(null);
    };

    return {
        page,
        setPage,
        data: data?.results || [],
        loading: isFetching,
        totalData: data?.count || 0,
        searchQuery,
        selectedData,
        error,
        handleSearch,
        fetchPaginate,
        handleRowClick,
        handleModalClose,
    };
};