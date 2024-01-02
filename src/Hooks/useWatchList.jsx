import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWatchList = () => {
    const axiosPublic = useAxiosPublic();
    const {
      data: watchList = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: ["watchList"],
      queryFn: async () => {
        const res = await axiosPublic.get("/watchList");
      //   console.log(watchList);
        return res.data;
      },
    });
    return [watchList, loading, refetch];
};

export default useWatchList;