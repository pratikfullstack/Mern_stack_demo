import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { userDelete, userHandlerData } from '../service/User.Service';
import { listBody, ENDPOINTURLFORIMG } from '../utils/Helper';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function User() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [delId, setDelId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getuserData();
    }, []);

    const getuserData = async () => {
        const response = await userHandlerData(
            listBody({ where: { isActive: true }, perPage: 100 })
        )
        if (response) {
            setUserData(response.list);
            setLoading(false)
        }
    };

    const deleteData = async () => {
        const response = await userDelete(delId);
        if (response) {
            getuserData()
            setShow(false)
        } else {
            setShow(false)
        }

    };
    return (<>
        
        <div className='container'>
        <div className='sub-header'>
            <p>User List</p>
            <Button variant="primary" onClick={() => navigate("/add")}>+ Add User</Button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Userimg</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phonenumber</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {userData.length > 0 &&
                    userData.map((data, index) => {
                        return (<>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td> <img src={ENDPOINTURLFORIMG + data.userImg} alt="userimg" width={32} /></td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.email}</td>
                                <td>{data.phoneNumber}</td>
                                <td><Button variant="success" onClick={() => navigate(`/edit?cid=${data._id}`)}>Edit</Button></td>
                                <td><Button variant="danger" onClick={() => [handleShow(), setDelId(data._id)]}>Delete</Button></td>
                            </tr>
                        </>
                        );
                    })}

                {userData.length === 0 && loading === false ? "Use not found!" : null}
            </tbody>
        </Table>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Delete User ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => deleteData()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal></>
    );
}

export default User;