import React, { useEffect, useState } from 'react';
import OrganizationTable from './OrganizationTable.component';
import adminApi from '../../services/admin.service';
import { AllState } from '../../context/Context';
import constantData from '../../utils/constant.util';
import Confirm from '../common/Confirm.component';
import Search from '../common/Search.component';
import Pagination from '../History/Pagination';

function Organizations() {
  const [sort, setSort] = useState({ field: "_id", order: 'desc' });
  const [organizations, setOrganizations] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(null);
  const [confirmPopupOpen, setConfirmPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalDocumentCount, setTotalDocumentCount] = useState(0);
  const limit = 1;

  const { dispatch } = AllState();


  useEffect(() => {
    loadData(search);
  }, [search,page])

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
    const apiRes = await adminApi.organization.list(page, limit, search);
    if (apiRes.status === "success") {
      setOrganizations(apiRes.data.items);
      setTotalDocumentCount(apiRes.data.totalCount)
    }
  }

  async function handleStatusUpdate() {
    if (statusUpdate) {
      const apiRes = await adminApi.organization.statusUpdate(statusUpdate.id, statusUpdate.status);
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

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8 text-white">
      <Confirm isOpen={confirmPopupOpen} onClose={() => handleClosePopup()} onConfirm={() => handleStatusUpdate()} />
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <h1 className="text-xl font-semibold">Notification History</h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Search placeholder={"Search Id, Name, Email ..."} search={search} setSearch={setSearch} />
      </div>
      <OrganizationTable sort={sort} onSort={setSort} data={organizations} setStatusUpdate={setStatusUpdate} />
      <Pagination page={page} totalPages={Math.ceil(totalDocumentCount / limit)} setPage={setPage} />
    </div>
  )
}

export default Organizations