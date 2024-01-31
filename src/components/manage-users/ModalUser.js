import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getGroup, registerNewUser, updateUser } from "./../services/userService.js"
import { toast } from 'react-toastify';
import _ from "lodash"
import "./ModalUser.scss"
const ModalUser = (props) => {
    const [groups, setGroups] = useState([])
    const { action, dataModalUser } = props;
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const getListGroups = async () => {
        let response = await getGroup();
        if (response && response.EM && +response.EC === 0) {
            setGroups(response.DT);

        }
        else {
            toast.error(response.EM);
        }
    }
    const handleOnChangeInput = (value, name) => {
        try {
            let _userData = _.cloneDeep(userData);
            _userData[name] = value;
            setUserData(_userData);
        } catch (error) {
            console.log(error)
        }
    }

    const checkValidateInputs = () => {
        if (action === "UPDATE") {
            return true;
        }
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        arr.every((item) => {
            if (!userData[item]) {
                toast.error(`missing ${item}`);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[item] = false
                setValidInputs(_validInputs)
                check = false;
                return false; //break loop
            }
            return true; // continue
        });
        return check;
    }
    const handleConfirmUser = async () => {
        setValidInputs(validInputsDefault);
        const check = checkValidateInputs();
        if (check) {
            let response = action === "CREATE" ? await registerNewUser(userData) : await updateUser(userData);
            if (response && +response.EC === 0 && response.EM) {
                toast.success(response.EM)
                setUserData(defaultUserData);
                props.confirmCreate();
                props.onHide();
            }
            else {
                toast.error(response.EM)
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[response.DT] = false
                setValidInputs(_validInputs)
            }
        }
    }

    useEffect(() => {
        getListGroups();
        setUserData(defaultUserData);
        if (action === "UPDATE") {
            console.log(dataModalUser);
            const data = { ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : " " };
            setUserData(data)
        }
    }, [props])
    const handleCloseModalUser = () => {
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
        props.onHide();
    }
    return (
        <>
            <Modal
                {...props}
                size="lg"
                centered
                show={props.show}
                onHide={() => { handleCloseModalUser() }}
                className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {action === "CREATE" ? "create new user " : "edit user"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='content-body row needs-validation' noValidate>
                        <div className='col-12 col-sm-6 form-group'>
                            <label className="form-label">Email: (<span className='red'>*</span>)</label>
                            <input
                                placeholder='enter email'
                                className={validInputs.email ? 'form-control' : "form-control is-invalid "}
                                type='text'
                                value={userData.email}
                                onChange={(e) => { handleOnChangeInput(e.target.value, "email") }}
                                disabled={action === "CREATE" ? false : true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label className="form-label">Phone number: (<span className='red'>*</span>)</label>
                            <input
                                placeholder='enter phone number'
                                className={validInputs.phone ? 'form-control' : "form-control is-invalid "}
                                type='text'
                                value={userData.phone}
                                onChange={(e) => { handleOnChangeInput(e.target.value, "phone") }}
                                disabled={action === "CREATE" ? false : true}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label className="form-label">Username:</label>
                            <input
                                placeholder='enter username'
                                className='form-control'
                                type='text'
                                value={userData.username}
                                onChange={(e) => { handleOnChangeInput(e.target.value, "username") }} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === "CREATE" && <>
                                <label className="form-label">Password: (<span className='red'>*</span>)</label>
                                <input
                                    placeholder='enter password'
                                    className={validInputs.password ? 'form-control' : "form-control is-invalid "}
                                    type='password'
                                    value={userData.password}
                                    onChange={(e) => { handleOnChangeInput(e.target.value, "password") }} />
                            </>}
                        </div>
                        <div className='col-12  form-group'>
                            <label className="form-label">Address:</label>
                            <input placeholder='enter address'
                                className='form-control'
                                type='text'
                                value={userData.address}
                                onChange={(e) => { handleOnChangeInput(e.target.value, "address") }} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label className="form-label">Sex: </label>
                            <select
                                className='form-select'
                                onChange={(e) => { handleOnChangeInput(e.target.value, "sex") }}
                                value={userData.sex ? userData.sex : ""}
                            >
                                <option defaultValue value={""}>Choose gender </option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Other"}>Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label className="form-label">Group: (<span className='red'>*</span>)</label>
                            <select
                                className={validInputs.group ? 'form-select' : "form-select is-invalid "}
                                onChange={(e) => { handleOnChangeInput(e.target.value, "group") }}
                                value={userData.group ? userData.group : ""}
                            >
                                <option defaultValue value={""}>Choose group </option>
                                {groups.map((item, index) => {
                                    return (<option key={`group-${index}`} value={item.id}>{item.name} </option>)
                                })}

                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleCloseModalUser() }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleConfirmUser() }} >
                        {action === "CREATE" ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;