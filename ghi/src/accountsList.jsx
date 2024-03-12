// import {
//     useGetAccountsQuery,
//     useCreateAccountMutation,
//     useGetTokenQuery,
//     useLogoutMutation,
//     useSignupMutation,
//     useLoginMutation,
// } from './app/accountsApi'

// function Account() {
//     const { data: accounts = [] } = useGetAccountsQuery()
//     const [createAccount, result] = useCreateAccountMutation()
//     // const [getToken] = useGetTokenQuery()
//     // const [logout] = useLogoutMutation()
//     // const [signup] = useSignupMutation()
//     // const [login] = useLoginMutation()

//     async function handleSubmit(e) {
//         e.preventDefault();
//         createAccount({email, password, full_name});
//     }

//     if (result.isSuccess) {
//         navigate("/api/itinerary");
//     } else if (result.isError) {
//         setError(result.error);
//     }

//     return (
//         <div>
//             <h1>My Account</h1>
//             <ul>
//                 {accounts.map((accounts) => (
//                     <div key={accounts.id}>
//                         <p>
//                             Email: {accounts.email}
//                             <div></div>
//                             Password: {accounts.password}
//                             <div></div>
//                             Full Name: {accounts.full_name}
//                         </p>
//                     </div>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default Account;
