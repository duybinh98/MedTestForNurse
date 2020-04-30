import Promise from 'es6-promise';

const LOAD_PENDING = 'LOAD_PENDING';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_ERROR = 'LOAD_ERROR';

function setLoadPending(isLoadPending) {
    return {
        type: LOAD_PENDING,
        isLoadPending
    };
}
function setLoadSuccess(isLoadSuccess, nurseInfor) {
    return {
        type: LOAD_SUCCESS,
        isLoadSuccess,
        nurseInfor : nurseInfor
    };
}
function setLoadError(LoadError) {
    return {
        type: LOAD_ERROR,
        LoadError
    };
}

function loadNurseFromState(nurseInfor) {
    return new Promise((resolve, reject) => {
        if (nurseInfor !== null) {
            return resolve(true);
        } else {
            return reject(new Error('Load customer information failed'));
        }
    }); 
}

// function loadCustomerFromState(nurseInfor) {
//     setTimeout(() => {
//         try {
//             return new Promise.resolve(true);
//         } catch (error) {
//             return new  Promise.reject(new Error('Load customer information failed'));
//         }
//     },3000)   
// }
export function loadNurseInfor(nurseInfor){
    return dispatch => {
        dispatch(setLoadPending(true));
        // dispatch(setLoadSuccess(false,null));
        dispatch(setLoadError(null));
        // dispatch(setnurseInfor(null));
        loadNurseFromState(nurseInfor)
        .then(success => {
            dispatch(setLoadPending(false));
            dispatch(setLoadSuccess(true,nurseInfor))
        })
        .catch(err => {
            dispatch(setLoadPending(false));
            dispatch(setLoadError(err));
        })
    }
}

export default function reducer(state = {
    isLoadPending: false,
    isLoadSuccess: false,
    LoadError: null,
    nurseInfor : null
}, action) {
    switch (action.type) {
        case LOAD_SUCCESS:
            return {
                ...state,
                isLoadSuccess: action.isLoadSuccess,
                nurseInfor : action.nurseInfor
            };
        case LOAD_PENDING:
            return {
                ...state,
                isLoadPending: action.isLoadPending
            };
        case LOAD_ERROR:
            return {
                ...state,
                LoadError: action.LoadError
            };
        default:
            return state;
    }
}

