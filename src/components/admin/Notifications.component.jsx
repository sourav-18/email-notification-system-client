import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../common/Pagination.component';
import Search from '../common/Search.component';
import Filter from '../common/Filter.component';
import adminApi from '../../services/admin.service';
import SwitchButton from '../common/SwitchButton.component';
import NotificationTable from './NotificationTable.component';
import MailViewModal from './MailView.component';


function Notification() {
  const defaultFilterStatus={ _id: "All", value: "All Status" }
  const [sort, setSort] = useState({ field: "_id", order: 'desc' });
  const [page, setPage] = useState(1);
  const [view, setView] = useState(null);
  const [totalDocumentCount, setTotalDocumentCount] = useState(0);
  const [filterStatus,setFilterStatus]=useState(defaultFilterStatus)
  const [search, setSearch] = useState("");
  const [switchButton, setSwitchButton] = useState("history");
  const status = [
    {_id: 1,value:"Ideal"},
    {_id: 2,value:"Processing"},
    {_id: 3,value:"Error"},
    {_id: 4,value:"Success"},
    {_id: 5,value:"Failed"},
    {_id: 6,value:"Cancel"},
  ]

  const limit = 10;

  function onSort(field) {
    if (sort.field == field) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      sort.field = field;
      sort.order = 'desc';
    }
    setSort({ ...sort });
  }

  const [histories, setHistories] = useState([]);


  async function loadDate() {
    let data = [], totalCount = 0;
    let apiRes = null;
    if (switchButton === "history") {
      apiRes = await adminApi.notification.getHistoryList(sort, page, limit, search,filterStatus._id);
    } else {
      apiRes = await adminApi.notification.getQueueList(sort, page, limit, search,filterStatus._id);
    }
    if (apiRes.status === "success") {
      data = apiRes.data.items
      totalCount = apiRes.data.totalCount;
    }
    setHistories(data);
    setTotalDocumentCount(totalCount);
  }

  useEffect(() => {
    loadDate();
  }, [sort, page, search, switchButton,filterStatus])

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8 text-white">
      <MailViewModal id={view} onClose={() => setView(null)} switchButton={switchButton} />
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <h1 className="text-xl font-semibold">Notification History</h1>
        <div className='m-auto'><SwitchButton value={switchButton} onChange={setSwitchButton} /></div>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Search placeholder={"Search id, receiver, subject ..."} search={search} setSearch={setSearch} />
        <Filter filterData={status} selected={filterStatus}
          setSelected={setFilterStatus} defaultFilter={defaultFilterStatus} width='w-32'/>
        </div>
      <NotificationTable switchButton={switchButton} data={histories} sort={sort} onSort={onSort} setView={setView} />
      <Pagination page={page} totalPages={Math.ceil(totalDocumentCount / limit)} setPage={setPage} />
    </div>
  );
}

export default Notification