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
  }, [orchardData, setOrchardProfileId]);

  const filteredOrchards = useMemo(() => {
    const orchards = orchardData ?? [];
    if (!search) return orchards;
    const text = search.toLowerCase();
    return orchards.filter(
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

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F7F2" }}>
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
