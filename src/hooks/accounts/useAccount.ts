import { TablePaginationConfig } from "antd";
import { accountsApi } from "sevices/account";
import { useDataLoadingContext } from "contexts/DataLoadingContext";
import { useNotificationContext } from "contexts/NotificationContext";
import { ITableData, defaultTableData } from "models";
import { IAccount } from "../../../../models/";
import { ChangeEvent, useEffect, useState } from "react";

export default function useAccount() {
  const { showError } = useNotificationContext();
  const { reloadAccount } = useDataLoadingContext();
  const [data, setData] = useState<ITableData<IAccount>>(defaultTableData);
  console.log('Accounts data is here');
  console.log(data);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [data.page, data.search, reloadAccount]);

  const fetchData = async () => {
    setData((prev) => ({ ...prev, loading: true }));
    const { data: response, error } = await accountsApi(
      data.page,
      data.per_page,
      data.search
    );
    if (response) {
      response.data = response.data.map((value) => ({
        ...value,
        key: value.id,
      }));
      setData((prev) => ({ ...prev, ...response }));
    } else showError(error!.message);
    setData((prev) => ({ ...prev, loading: false }));
  };

  const handlePageChange = ({ current }: TablePaginationConfig) => {
    if (current) setData((prev) => ({ ...prev, page: current }));
  };

  const handleSearch = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, search: value ?? "" }));
  };

  return { data, handlePageChange, handleSearch };
}
