import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";

const contactsAdapter = createEntityAdapter({});

const initialState = contactsAdapter.getInitialState();

export const contactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => '/contacts',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedContacts = responseData.map(contact => {
                    contact.id = contact._id;
                    return contact;
                });
                return contactsAdapter.setAll(initialState, loadedContacts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'contact', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'contact', id}))
                    ];
                } else return [{type: 'contact', id: 'LIST'}];
            }
        }),
    }),
});

export const {
    useGetContactsQuery,
} = contactsApiSlice;

// returns the query result object
export const selectContactsResult = contactsApiSlice.endpoints.getContacts.select();

// creates memoized selector
const selectContactsData = createSelector(
    selectContactsResult,
    contactsResult => contactsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors, and we rename them with aliases using destructuring
export const {
    selectAll: selectAllContacts,
    selectById: selectContactById,
    selectIds: selectContactIds
    // Pass in a selector that returns the contacts slice of state
} = contactsAdapter.getSelectors(state => selectContactsData(state) ?? initialState);