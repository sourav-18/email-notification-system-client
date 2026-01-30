import React, { useEffect, useRef, useState } from 'react'
import NotificationTable from '../common/NotificationTable.component';
import notificationApi from '../../services/notification.service';
import Pagination from '../History/Pagination';
import Search from '../common/Search.component';
import Filter from '../common/Filter.component';
import organizationApi from '../../services/organization.service';
import MailView from '../common/MailView.component';
import PrimaryButton from '../common/PrimaryButton.component';
import { Send } from 'lucide-react';
import SendMail from '../common/SendMail.component';
import SwitchButton from '../common/SwitchButton.component';
import DateTimePicker from '../common/DateTimePicker.component';


function Notification() {
  const [sort, setSort] = useState({ field: "_id", order: 'desc' });
  const [page, setPage] = useState(1);
  const [view, setView] = useState(null);
  const [totalDocumentCount, setTotalDocumentCount] = useState(0);
  const [credentialData, setCredentialData] = useState([]);
  const [credential, setCredential] = useState({ _id: "All", value: "All Credential" });
  const [search, setSearch] = useState("");
  const [sendEmailPopup, setSendEmailPopup] = useState(false)
  const [switchButton, setSwitchButton] = useState("history");

  const limit = 10;

  function onSort(field) {
    if (sort.field == field) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      sort.field = field;
      sort.order = -1;
    }
    setSort({ ...sort });
  }

  const [histories, setHistories] = useState([]);


  async function loadDate() {
    let data = [], totalCount = 0;
    let apiRes = null;
    if (switchButton === "history") {
      apiRes = await notificationApi.getHistory(sort, page, limit, search, credential._id);
    } else {
      apiRes = await notificationApi.getQueueData(sort, page, limit, search, credential._id);
    }
    if (apiRes.status === "success") {
      data = apiRes.data.items
      totalCount = apiRes.data.totalCount;
    }
    setHistories(data);
    setTotalDocumentCount(totalCount);
  }

  async function loadCredential() {
    const apiRes = await organizationApi.getCredentialForFilter();
    if (apiRes.status === "success") {
      setCredentialData(apiRes.data)
    }
  }

  useEffect(() => {
    loadCredential();
  }, [])

  useEffect(() => {
    loadDate();
  }, [sort, page, search, credential, switchButton])

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8 text-white">
      <SendMail open={sendEmailPopup} credentialData={credentialData} onClose={() => setSendEmailPopup(false)} />
      <MailView id={view} onClose={() => setView(null)} switchButton={switchButton} />
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <h1 className="text-xl font-semibold">Notification History</h1>
        <div className='m-auto'><SwitchButton value={switchButton} onChange={setSwitchButton} /></div>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Search placeholder={"Search id, receiver, subject ..."} search={search} setSearch={setSearch} />
        <Filter filterData={credentialData} selected={credential}
          setSelected={setCredential} defaultFilter={{ _id: "All", value: "All Credential" }} />
        <div className='ml-auto'><PrimaryButton text={""} icon={Send} onClick={() => setSendEmailPopup(true)} /></div>
      </div>
      <NotificationTable data={histories} sort={sort} onSort={onSort} setView={setView} />
      <Pagination page={page} totalPages={Math.ceil(totalDocumentCount / limit)} setPage={setPage} />
    </div>
  );
}

export default Notification