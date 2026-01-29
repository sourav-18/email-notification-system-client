import React, { useState } from 'react';
import { Pencil, Eye, Layout, ToggleLeft, ToggleRight } from 'lucide-react';
import constantData from '../../utils/constant.util';
import Confirm from './Confirm.component';

const CredentialCard = ({ credential, setStatusUpdate, setEditData }) => {

  function handleEdit() {
    setEditData(credential);
  }

  const toggleStatus = () => {
    setStatusUpdate({
      id: credential._id,
      status: credential.status == constantData.credentials.status.active ?
        constantData.credentials.status.inactive : constantData.credentials.status.active
    });
  };

  return (
    <div className="group relative w-full max-w-md min-h-[220px] rounded-3xl border border-white/5 bg-white/[0.04] backdrop-blur-md overflow-hidden transition-all duration-700 hover:border-blue-500/30">
      {/* 1. Subtle Hover Background Fill */}

      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* 2. Top-Right View Button (Minimalist) */}
      <button className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
        <Eye size={18} />
      </button>

      {/* 3. Main Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">

        <h2 className="text-lg font-semibold truncate">{credential?.emailUserName}</h2>
        <p className="mt-1 text-sm text-gray-400 truncate">Password: *******</p>
        <p className="mt-2 text-sm">
          <span className="font-medium">Rate Limit:</span> {credential?.emailRateLimit}/max
        </p>

        <p className="mt-1 text-sm">
          <span className="font-medium">Notification %:</span>{" "}
          <span className="text-green-400">{credential?.notificationSendPercent?.immediate}%</span> /{" "}
          <span className="text-red-400">{credential?.notificationSendPercent?.failed}%</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Created: {new Date(credential?.createdAt).toLocaleString()}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => toggleStatus(credential?.status)}
            className="flex items-center gap-2 text-sm font-medium focus:outline-none"
          >
            {credential?.status == constantData.credentials.status.active ? (
              <ToggleRight className="text-green-400" />
            ) : (
              <ToggleLeft className="text-gray-500" />
            )}
            <span>{credential?.status == constantData.credentials.status.active ? "Active" : "Inactive"}</span>
          </button>

          {/* 4. Bottom-Right Edit Button (Integrated) */}
          <div className="mt-auto flex justify-end">
            <button 
            onClick={()=>handleEdit()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300">
              <Pencil size={14} />
              Edit Details
            </button>
          </div>
        </div>
      </div>

      {/* 5. Edge Highlight (The "Premium" Touch) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent
       via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default CredentialCard;