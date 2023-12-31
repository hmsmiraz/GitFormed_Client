import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRepositories = () => {
    const axiosPublic = useAxiosPublic();
    const {
      data: repositories = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: ["repositories"],
      queryFn: async () => {
        const res = await axiosPublic.get("/repositories");
      //   console.log(repositories);
        return res.data;
      },
    });
    return [repositories, loading, refetch];
};

export default useRepositories;