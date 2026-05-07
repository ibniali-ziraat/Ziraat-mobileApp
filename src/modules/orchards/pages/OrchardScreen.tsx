import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import AddOrchardFAB from "../components/AddOrchardFab";
import NoOrchardsEmpty from "../components/NoOrchardsEmpty";
import OrchardList from "../components/OrchardList";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

export default function MyOrchardsScreen() {
  const {
    data: orchardData,
    isPending,
    isError,
    refetch,
  } = useOrchardsByUserQuery();
  const { setOrchardProfileId } = useAuth();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!orchardData?.length) setOrchardProfileId(null);
  }, [orchardData]);

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  const filteredOrchards = useMemo(() => {
    if (!search) return orchardData;
    const text = search.toLowerCase();
    return orchardData.filter(
      (o: any) =>
        o?.orchardName?.toLowerCase().includes(text) ||
        o?.ownershipType?.toLowerCase().includes(text) ||
        o?.plantationPattern?.toLowerCase().includes(text) ||
        String(o?.kanals || "").includes(text) ||
        String(o?.marlas || "").includes(text),
    );
  }, [orchardData, search]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }} className="bg-light">
      {hasNoOrchards ? (
        <ScreenLayout>
          <NoOrchardsEmpty />
        </ScreenLayout>
      ) : (
        <OrchardList
          orchards={filteredOrchards}
          search={search}
          setSearch={setSearch}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      )}

      {!hasNoOrchards && <AddOrchardFAB />}
    </View>
  );
}
