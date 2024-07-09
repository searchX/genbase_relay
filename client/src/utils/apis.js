import axios from 'axios';

export const baseUrl = import.meta.env.VITE_API_URL

export const postDriver = (data) => axios.post(`${baseUrl}/add_new_driver`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})
export const postOwner = (data) => axios.post(`${baseUrl}/insert_owner_data`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// Truck 
export const postTruck = (data) => axios.post(`${baseUrl}/add_truck`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// Trailer
export const postTrailer = (data) => axios.post(`${baseUrl}/add_trailer`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// TODO
export const getDrivers = (companyId) => axios.get(`${baseUrl}/get_all_drivers?company_id=${companyId}`, {
    headers: {
        'Content-Type': 'application/json',
    }
});
// owner data 
export const getOwners = (company_id) => axios.get(`${baseUrl}/get_all_owners?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
});
// Truck 
export const getTruck = (company_id) => axios.get(`${baseUrl}/get_all_truck?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
});
// Trailer
export const getTrailer = (company_id) => axios.get(`${baseUrl}/get_all_trailer?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const setAddLoad = (data) => axios.post(`${baseUrl}/add_load`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const setToProgressLoads = (data) => axios.post(`${baseUrl}/update_to_progress_loads`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})


export const setToCompletedLoads = (load_id, detention_time, detention_pay) => axios.post(`${baseUrl}/update_to_completed_loads?load_id=${load_id}&&detention_wait_time=${detention_time}&detention_pay=${detention_pay}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})


export const getAssignedLoadsData = (company_id) => axios.get(`${baseUrl}/get_all_in_progress_loads?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
export const getCompletedLoadsData = (company_id) => axios.get(`${baseUrl}/get_all_completed_loads?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
export const getCompletedLoadDataCount = (company_id) => axios.get(`${baseUrl}/get_all_completed_loads_count?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getAssignedDriverData = (company_id) => axios.get(`${baseUrl}/get_all_assigned_drivers?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// For the fuel 
export const getFuelExpenseData = (company_id) => axios.get(`${baseUrl}/expenses/fuel?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
export const getFuelExpenseByIdData = (company_id, load_id) => axios.get(`${baseUrl}/expenses/fuel/id?company_id=${company_id}&load_id=${load_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// For the reefer Fuel 


export const getReeferFuelExpenseData = (company_id) => axios.get(`${baseUrl}/expenses/reefer-fuel?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getReeferFuelExpenseByIdData = (company_id, load_id) => axios.get(`${baseUrl}/expenses/reefer-fuel/id?company_id=${company_id}&load_id=${load_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// For the Toll Expense 

export const getTollsExpenseData = (company_id) => axios.get(`${baseUrl}/expenses/toll?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getTollsExpenseByIdData = (company_id, load_id) => axios.get(`${baseUrl}/expenses/toll/id?company_id=${company_id}&load_id=${load_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// For the repairs 
export const getRepairsExpenseData = (company_id) => axios.get(`${baseUrl}/expenses/repairs?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
export const getRepairsExpenseByIdData = (company_id, load_id) => axios.get(`${baseUrl}/expenses/repairs/id?company_id=${company_id}&load_id=${load_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// For the Service
export const getServicesExpenseData = (company_id) => axios.get(`${baseUrl}/expenses/services?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
export const getServicesExpenseByIdData = (company_id, load_id) => axios.get(`${baseUrl}/expenses/services/id?company_id=${company_id}&load_id=${load_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// For the custom 
export const getCustomExpenseData = (company_id) => axios.get(`${baseUrl}/expenses/custom?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getCustomExpenseByIdData = (company_id, load_id) => axios.get(`${baseUrl}/expenses/custom/id?company_id=${company_id}&load_id=${load_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})


export const postFuelExpense = (data) => axios.post(`${baseUrl}/add_expenses/fuel`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const postReeferFuelExpense = (data) => axios.post(`${baseUrl}/add_expenses/reefer-fuel`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const postTollExpense = (data) => axios.post(`${baseUrl}/add_expenses/toll`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})


// for the repair expense 
export const postRepairsExpense = (data) => axios.post(`${baseUrl}/add_expenses/repairs`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// for the service expense
export const postServicesExpense = (data) => axios.post(`${baseUrl}/add_expenses/services`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})
// for the custom expense
export const postCustomExpense = (data) => axios.post(`${baseUrl}/add_expenses/custom`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})


// for the graphs
// for all the expenses graph 
export const getAllExpensesAmountAnalysis = (company_id) => axios.get(`${baseUrl}/expense/get_total_expense?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// for the income vs expense graph 
export const getAllIncomeVsExpense = (company_id) => axios.get(`${baseUrl}/get_load_expense_analysis?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// for the analytics page 
export const getLoadAnalytics = (company_id) => axios.get(`${baseUrl}/get_completed_loads_profit_analysis?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

// scheduler api get
export const get_all_assigned_drivers_with_loads = (company_id) => axios.get(`${baseUrl}/get_all_assigned_driver_with_their_loads?company_id=${company_id}`, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const login = (requestOptions) => fetch(`${baseUrl}/login`, requestOptions)
export const signup = (requestOptions) => fetch(`${baseUrl}/signup`, requestOptions)
export const resendVerification = (email, requestOptions) => fetch(`${baseUrl}/resend-verification?email=${email}`, requestOptions)
export const confirmEmail = (_token, requestOptions) => fetch(`${baseUrl}/confirm-email?_token=${_token}`, requestOptions)
export const fetchCurrentUser = (requestOptions) => fetch(`${baseUrl}/me`, requestOptions)
export const forgotPassword = (requestOptions) => fetch(`${baseUrl}/forgot-password`, requestOptions)
export const resetPassword = (requestOptions) => fetch(`${baseUrl}/reset_password`, requestOptions)

export const uploadFiles = (files, pathname, unique_id) => axios.post(`${baseUrl}/upload-files?pathname=${pathname}&unique_id=${unique_id}`, files, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

export const setAddKey = (data) => axios.post(`${baseUrl}/keystore/add-key`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const setAddProject = (data) => axios.post(`${baseUrl}/projects/add-project`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getprojectsLoadedData = () => axios.get(`${baseUrl}/projects/get-projects`, {
    headers: {
        'Content-Type': 'application/json',
    }
})
