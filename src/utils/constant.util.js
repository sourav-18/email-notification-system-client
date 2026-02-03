const constantData = {
    organization: {
        status: {
            active: 1,
            inactive: 2
        }
    },
    reducerActionType: {
        alertMessageSet: 'alert-message-set',
        adminProfileSet: 'admin-profile-set',
        organizationProfileSet: 'organization-profile-set',
        loadProfileData:'load-profile-data',
        removeAllProfileData:'remove-all-profile-data'
    },
    credentials: {
        status: {
            active: 1,
            inactive: 2
        }
    },
    sendMail: {
        priority: {
            immediate: 1,
            schedule: 2
        }
    },
    userType: {
        admin: "admin",
        organization: "organization"
    }
}

export default constantData;