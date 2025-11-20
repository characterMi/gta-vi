import { GetMainVideosContext } from "../constants";
import { useLoadImageBundle } from "../hooks/useLoadImageBundle";

const GetMainVideosContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { videos, status } = useLoadImageBundle([
    "/videos/jason-first.bin",
    "/videos/lucia-first.bin",
  ]);

  return (
    <GetMainVideosContext.Provider value={{ videos, status }}>
      {children}
    </GetMainVideosContext.Provider>
  );
};

export default GetMainVideosContextProvider;
