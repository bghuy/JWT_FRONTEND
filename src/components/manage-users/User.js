import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAllUsers, deleteUser } from '../services/userService';
import ReactPaginate from 'react-paginate';
import { toast, useToast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

function User(props) {
    const history = useHistory();
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowUserModal, setIsShowUserModal] = useState(false)
    const [deletedUser, setDeletedUser] = useState({})
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModalUser, setDataModalUser] = useState({})
    const fetchUsers = async () => {
        const response = await fetchAllUsers(currentPage, currentLimit);
        console.log("check respone>> ", response);
        if (response && +response.EC === 0) {
            // setListUsers(response.DT);
            const listUsersByPage = response.DT;
            if (listUsersByPage.totalPages && listUsersByPage.totalRows && listUsersByPage.users) {
                setTotalPages(listUsersByPage.totalPages);
                setListUsers(listUsersByPage.users);
            }
        }
    }
    const handleDeleteUser = async (userData) => {
        setIsShowDeleteModal(true);
        setDeletedUser(userData);

    }
    const handleEditUser = async (userData) => {
        setIsShowUserModal(true);
        setDataModalUser(userData);
        setActionModalUser("UPDATE")
    }
    const handleOnClickCreateNewUser = () => {
        setIsShowUserModal(true);
        setActionModalUser("CREATE")
    }
    const handleClose = () => {
        setIsShowDeleteModal(false);
        setDeletedUser({});
    };
    const onHideModalUser = async () => {
        setIsShowUserModal(false);
        setDataModalUser({});
        await fetchUsers();
    };
    const confirmDeleteUser = async (userData) => {
        let response = await deleteUser(userData);

        if (response && response && +response.EC === 0 && response.EM) {
            toast.success(response.EM);
            setIsShowDeleteModal(false);
            await fetchUsers();
        }
        else {
            toast.error("delete user unsuccessfully");
        }
    }
    const confirmCreateUser = async () => {
        await fetchUsers();
    }
    useEffect(() => {
        fetchUsers();

        let c = document.cookie.split(";").reduce((ac, cv, i) => Object.assign(ac, { [cv.split('=')[0]]: cv.split('=')[1] }), {});

        console.log(c);
    }, [currentPage])
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };
    const handleRefresh = async () => {
        await fetchUsers();
    }
    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table users</h3>
                        </div>
                        <div className='actions'>
                            <button className='btn btn-success' onClick={() => { handleRefresh() }}>Refresh</button>
                            <button className='btn btn-primary' onClick={() => { handleOnClickCreateNewUser() }}>Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`user-${item.id}`}>
                                                    <td>{(+currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ""}</td>
                                                    <td className='text-center'>
                                                        <button className='btn btn-warning me-2' onClick={() => { handleEditUser(item) }}>Edit</button>
                                                        <button className='btn btn-danger' onClick={() => { handleDeleteUser(item) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td>Not found users</td></tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDelete isShowDeleteModal={isShowDeleteModal} handleClose={handleClose} confirmDeleteUser={confirmDeleteUser} userData={deletedUser} />
            <ModalUser
                show={isShowUserModal}
                onHide={onHideModalUser}
                confirmCreate={confirmCreateUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default User;