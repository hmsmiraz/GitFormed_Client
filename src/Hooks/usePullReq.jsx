import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePullReq = () => {
    const axiosPublic = useAxiosPublic();
    const {
      data: pullRequestList = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: ["pullRequestList"],
      queryFn: async () => {
        const res = await axiosPublic.get("/pullRequest");
      //   console.log(pullRequestList);
        return res.data;
      },
    });
    return [pullRequestList, loading, refetch];
};

export default usePullReq;