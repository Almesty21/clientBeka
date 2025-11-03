import { ReactNode, createContext, useContext, useState } from "react";

interface IDataLoading {
  reloadAccount: number;
  reloadFleetModel: number;
  reloadCountry: number;
  reloadCity: number;
  reloadDriver: number;
  reloadFleet: number;
  reloadWallet: number;
}

interface IDataLoadingProps {
  loadAccounts: () => void;
  reloadAccount: number;
  loadFleetModels: () => void;
  reloadFleetModel: number;
  loadCountries: () => void;
  reloadCountry: number;
  loadCities: () => void;
  reloadCity: number;
  loadDrivers: () => void;
  reloadDriver: number;
  loadFleets: () => void;
  reloadFleet: number;
  loadWallets: () => void;
  reloadWallet: number;
}

export const DataLoadingContext = createContext<IDataLoadingProps>(
  {} as IDataLoadingProps
);

export const useDataLoadingContext = () =>
  useContext<IDataLoadingProps>(DataLoadingContext);

export function DataLoadingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [reload, setReload] = useState<IDataLoading>({
    reloadAccount: 0,
    reloadFleetModel: 0,
    reloadCountry: 0,
    reloadCity: 0,
    reloadDriver: 0,
    reloadFleet: 0,
    reloadWallet: 0,
  });

  const loadAccounts = () =>
    setReload((prev) => ({ ...prev, reloadAccount: prev.reloadAccount + 1 }));
  const loadFleetModels = () =>
    setReload((prev) => ({
      ...prev,
      reloadFleetModel: prev.reloadFleetModel + 1,
    }));
  const loadCountries = () =>
    setReload((prev) => ({
      ...prev,
      reloadCountry: prev.reloadCountry + 1,
    }));
  const loadCities = () =>
    setReload((prev) => ({
      ...prev,
      reloadCity: prev.reloadCity + 1,
    }));
  const loadDrivers = () =>
    setReload((prev) => ({
      ...prev,
      reloadDriver: prev.reloadDriver + 1,
    }));
  const loadFleets = () =>
    setReload((prev) => ({
      ...prev,
      reloadFleet: prev.reloadFleet + 1,
    }));
  const loadWallets = () =>
    setReload((prev) => ({
      ...prev,
      reloadWallet: prev.reloadWallet + 1,
    }));

  return (
    <DataLoadingContext.Provider
      value={{
        ...reload,
        loadAccounts,
        loadFleetModels,
        loadCountries,
        loadCities,
        loadDrivers,
        loadFleets,
        loadWallets,
      }}
    >
      {children}
    </DataLoadingContext.Provider>
  );
}
