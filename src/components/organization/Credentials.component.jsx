import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, ToggleLeft, ToggleRight, AlertCircle } from "lucide-react";
import PrimaryButton from "../common/PrimaryButton.component";
import { ArrowRight } from "lucide-react";
import CredentialCard from "../common/CredentialCard.component";
import AddCredential from "../common/AddCredential.component";
import organizationApi from '../../services/organization.service';
import Confirm from "../common/Confirm.component";
import { AllState } from "../../context/Context";
import constantData from "../../utils/constant.util";
import EditCredentialModal from "../common/EditCredential.component";

export default function CredentialsPage() {

  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopup] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loadDate, setLoadDate] = useState(true);

  const [credentials, setCredentials] = useState([]);

  const { dispatch } = AllState();

  function sendAlert(message, status = "error") {
    dispatch({
      type: constantData.reducerActionType.alertMessageSet,
      payload: { message: message, status: status }
    });
  }

  async function loadCredential() {
    const apiRes = await organizationApi.getCredential();
    if (apiRes.status == "success") {
      setCredentials(apiRes.data);
      console.log(apiRes.data)
    }
  }

  useEffect(() => {
    loadCredential()
  }, [loadDate])

  useEffect(() => {
    if (statusUpdate) {
      setConfirmPopup(true);
    }
    if(editData){
      setEditPopupOpen(true)
    }
  }, [statusUpdate,editData])

  function handleClosePopup() {
    setConfirmPopup(false);
    setStatusUpdate(null);
  }

  async function handleStatusUpdate() {
    if (statusUpdate) {
      const apiRes = await organizationApi.credentialStatusUpdate(statusUpdate.id, statusUpdate.status);
      sendAlert(apiRes.message, apiRes.status);
      setLoadDate(!loadDate);
      setStatusUpdate(null);
      handleClosePopup();
    }

  }

  function handleCloseEditPopup(){
    setEditPopupOpen(false);
    setEditData(null);
  }

  return (
    <div className=" text-white px-6 py-10 relative">
      <Confirm isOpen={confirmPopupOpen} onClose={() => handleClosePopup()} onConfirm={() => handleStatusUpdate()} />
      <AddCredential isOpen={addPopupOpen} onClose={() => setAddPopupOpen(false)} loadDate={loadDate} setLoadDate={setLoadDate} />
      <EditCredentialModal isOpen={editPopupOpen} credential={editData} onClose={()=>handleCloseEditPopup()} loadDate={loadDate} setLoadDate={setLoadDate}/>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Credentials</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your email credentials and notification rules
          </p>
        </div>

        {/* <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow-lg">
          <Plus size={20} />
          Add Credential
        </button> */}
        <PrimaryButton icon={Plus} onClick={() => setAddPopupOpen(true)} text="Add Credential" />
      </div>

      {/* Credentials list */}
      {credentials.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400 space-y-3">
          <AlertCircle size={48} />
          <p className="text-lg">No credentials present. Please add one.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential) => (
            <CredentialCard key={credential._id} credential={credential} setStatusUpdate={setStatusUpdate} setEditData={setEditData} />
          ))}
        </div>
      )}
    </div>
  );
}
