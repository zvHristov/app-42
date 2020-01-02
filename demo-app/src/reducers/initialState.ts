import IStoreState from "../store/IStoreState";
const defaultState: IStoreState = {
    companies: {
        isFetching: false,
        items: []},
    companyAddresses: {
        isFetching: false,
        items: []},
    projects: {
        isFetching: false,
        items: []},
    employees: {
        isFetching: false,
        items: []},
    pendingActions: 0,
};
export default defaultState;
