import { combineReducers } from 'redux';
import companies from './companiesReducer';
import companyAddresses from './companiesAddressesReducer';
import employees from './employeesReducer';
import projects from './projectsAction';
import pendingActions from './pendingActionsReducer';
import IStoreState from '../store/IStoreState';

// @ts-ignore
const rootReducer = combineReducers<IStoreState>({
    companies,
    companyAddresses,
    employees,
    projects,
    pendingActions
});
export default rootReducer;
