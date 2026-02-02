import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import OrganizationTable from './OrganizationTable.component';
import adminApi from '../../services/admin.service';
import { AllState } from '../../context/Context';
import constantData from '../../utils/constant.util';
import Confirm from '../common/Confirm.component';
import Search from '../common/Search.component';
import Pagination from '../common/Pagination.component';
import Filter from '../common/Filter.component';
import CredentialsTable from './CredentialsTable.component';

export default function Credentials() {
  const defaultFilterStatus = { _id: "All", value: "All Status" };
  const [filterStatus, setFilterStatus] = useState(defaultFilterStatus);
  const [sort, setSort] = useState({ field: "_id", order: 'desc' });
  const [credentials, setCredentials] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(null);
  const [confirmPopupOpen, setConfirmPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalDocumentCount, setTotalDocumentCount] = useState(0);
  const [addPopupOpen,setAddPopupOpen]=useState(false);
  const [refresh,setRefresh]=useState(false);

  const limit = 10;

  const { dispatch } = AllState();


  useEffect(() => {
    loadData();
  }, [search, page, filterStatus, sort,refresh])

  useEffect(() => {
    if (statusUpdate) {
      setConfirmPopup(true);
    }
  }, [statusUpdate])

  function sendAlert(message, status = "error") {
    dispatch({
      type: constantData.reducerActionType.alertMessageSet,
      payload: { message: message, status: status }
    });
  }

  async function loadData() {
    const apiRes = await adminApi.credential.list(page, limit, sort, search, filterStatus._id);
    if (apiRes.status === "success") {
      setCredentials(apiRes.data.items);
      setTotalDocumentCount(apiRes.data.totalCount)
    } else {
      setCredentials([]);
      setTotalDocumentCount(0);
    }
  }

  async function handleStatusUpdate() {
    if (statusUpdate) {
      const apiRes = await adminApi.credential.statusUpdate(statusUpdate.id, statusUpdate.status);
      if (apiRes.status === "success") {
        loadData();
      }
      sendAlert(apiRes.message, apiRes.status);
      handleClosePopup()
    }
  }

  function handleClosePopup() {
    setConfirmPopup(false);
    setStatusUpdate(null);
  }

  const status = [
    { _id: 1, value: "Active" },
    { _id: 2, value: "Inactive" }
  ]

  function onSort(field) {
    if (sort.field == field) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      sort.field = field;
      sort.order = 'desc';
    }
    setSort({ ...sort });
  }

  function closeAddPopup(){
    setAddPopupOpen(false);
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8 text-white">
      <Confirm isOpen={confirmPopupOpen} onClose={() => handleClosePopup()} onConfirm={() => handleStatusUpdate()} />
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <h1 className="text-xl font-semibold">Credentials History</h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Search placeholder={"Search Id , Email ..."} search={search} setSearch={setSearch} />
        <Filter filterData={status} selected={filterStatus}
          setSelected={setFilterStatus} defaultFilter={defaultFilterStatus} width='w-32' /> 
      </div>
      <CredentialsTable sort={sort} onSort={onSort} data={credentials} setStatusUpdate={setStatusUpdate} />
      <Pagination page={page} totalPages={Math.ceil(totalDocumentCount / limit)} setPage={setPage} />
    </div>
  )
}
