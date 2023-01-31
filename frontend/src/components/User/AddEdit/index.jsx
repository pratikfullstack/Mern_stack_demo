import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import DragDrop from "../../DragDrop";
import { ENDPOINTURLFORIMG } from '../../utils/Helper';
import { userAddData, userEditData, userSingleData } from '../../service/User.Service';
import { Alert } from 'react-bootstrap';
function AddEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;
    const [cid, setcid] = useState(null);
    const [images, setImages] = useState(null);
    const [file, setFile] = useState(null);
    const [apiImg, setApiImg] = useState(null);
    const [msg, setMsg] = useState(null);
    
    useEffect(() => {
        let userId;
        try {
            if (search.split("=").length > 0) {
                userId = search.split("=")[1];
                if (userId !== undefined) {
                    userData(userId)
                }
            } else {
                userId = "";
            }
        } catch (error) {
            alert(error);
        } setcid(userId); // eslint-disable-next-line
    }, [search]);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            setFile(file);
            setValue("userImg", file);
            const reader = new FileReader();
            reader.onload = function (e) {
                setImages(e.target.result);
            };
            reader.readAsDataURL(file);
            return file;
        });// eslint-disable-next-line
    }, []);
    const userData = async (id) => {
        const response = await userSingleData(id);
        setApiImg(response.userImg);
        try {
            if (response) {
                reset({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    phoneNumber: response.phoneNumber,
                    userImg: response.userImg
                });
            }
        } catch (error) {
            alert(error);
        }
    };
    const handleUserData = async (body) => {
        try {
            if (cid !== undefined) {
                let reqBody;
                if (file !== null) {
                    reqBody = new FormData(); //  if passing an image or file with all data use reBody
                    reqBody.append("firstName", body.firstName);
                    reqBody.append("lastName", body.lastName);
                    reqBody.append("email", body.email);
                    reqBody.append("phoneNumber", body.phoneNumber);
                    reqBody.append("userImg", file);
                } else {
                    reqBody = {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        phoneNumber: body.phoneNumber,
                        userImg: apiImg
                    };
                }
                const response = await userEditData(cid, reqBody);
                if (response.success) {
                    navigate(`/`);
                } else {
                    setMsg(response.message)
                }
            } else {
                const reqBody = new FormData();
                reqBody.append("firstName", body.firstName);
                reqBody.append("lastName", body.lastName);
                reqBody.append("email", body.email);
                reqBody.append("phoneNumber", body.phoneNumber);
                reqBody.append("userImg", file);
                const response = await userAddData(reqBody);
                if (response.success) {
                    navigate(`/`);
                } else {
                    setMsg(response.message)
                }
            }
        } catch (error) {
            alert(error);
        }

    };
    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: {
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            userImg: null
        },
    });

    return (
        <>

            <Form>
                <Container>
                    <Row>
                        <h3>{cid ? "Edit" : "Add"} User</h3>
                        {msg ? <Alert key="danger" variant="danger">
                            {msg}
                        </Alert> : null}

                        <Col><Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Controller
                                name="firstName"
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (<>
                                    <Form.Control
                                        margin="normal"
                                        fullWidth
                                        id="firstName"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                    // helperText={error?.message ? error.message : ""}
                                    />
                                    {error?.message ?
                                        <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                            {error.message}
                                        </Form.Control.Feedback>
                                        : null}

                                </>
                                )}
                                control={control}
                                rules={{
                                    required: "Please add firstName",
                                    maxLength: {
                                        value: 50,
                                        message: "Cannot be longer than 50 characters",
                                    },
                                    pattern: {
                                        value: /\S/,
                                        message: "Only words are allowed",
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "Cannot be smaller than 4 characters",
                                    },
                                }}
                            />
                        </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Last Name</Form.Label>
                                <Controller
                                    name="lastName"
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (<>
                                        <Form.Control
                                            margin="normal"
                                            fullWidth
                                            id="lastName"
                                            placeholder="Enter last name"
                                            name="lastName"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error?.message ? error.message : ""}
                                        />
                                        {error?.message ?
                                            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                                {error.message}
                                            </Form.Control.Feedback>
                                            : null}
                                    </>
                                    )}
                                    control={control}
                                    rules={{
                                        required: "Please add Lastname",
                                        maxLength: {
                                            value: 50,
                                            message: "Cannot be longer than 50 characters",
                                        },
                                        pattern: {
                                            value: /\S/,
                                            message: "Only words are allowed",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Cannot be smaller than 4 characters",
                                        },
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Controller
                                    name="email"
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (<>
                                        <Form.Control
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error?.message ? error.message : ""}
                                        />
                                        {error?.message ?
                                            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                                {error.message}
                                            </Form.Control.Feedback>
                                            : null}</>
                                    )}
                                    control={control}
                                    rules={{
                                        required: "Please add Email",
                                        maxLength: {
                                            value: 50,
                                            message: "Cannot be longer than 50 characters",
                                        },
                                        pattern: {// eslint-disable-next-line
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email not valid",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Cannot be smaller than 4 characters",
                                        },
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone Number</Form.Label>
                                <Controller
                                    name="phoneNumber"
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (<>
                                        <Form.Control
                                            margin="normal"
                                            fullWidth
                                            id="phoneNumber"
                                            placeholder="Enter phone number"
                                            name="phoneNumber"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error?.message ? error.message : ""}
                                        />
                                        {error?.message ?
                                            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                                {error.message}
                                            </Form.Control.Feedback>
                                            : null}
                                    </>
                                    )}
                                    control={control}
                                    rules={{
                                        required: "Please add Phonenumber",
                                        pattern: {
                                            value: /^(0|91)?[6-9][0-9]{9}$/,
                                            message: "Phonenumber not valid",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "Cannot be smaller than 4 characters",
                                        },
                                    }}
                                />
                            </Form.Group>

                        </Col>
                        <Col>
                            <Form.Label>User image</Form.Label>
                            <Controller
                                name="userImg"
                                render={({ field: { value }, fieldState: { error } }) => (
                                    <>
                                        {images == null ? (
                                            <div>
                                                {error?.message &&
                                                    <p style={{ color: "red" }}>
                                                        {error.message}
                                                    </p>
                                                }
                                                <div container spacing={2}>
                                                    {value == null ? (
                                                        <div style={{
                                                            border: "1px solid #ced4da",
                                                            borderRadius: "5px",
                                                            padding: '10px',
                                                            cursor: 'pointer'
                                                        }} >
                                                            <DragDrop onDrop={onDrop} accept={"image/*"} />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <div >
                                                        {value !== null ? (
                                                            <>
                                                                <img
                                                                    component="userImg"
                                                                    src={ENDPOINTURLFORIMG + value}
                                                                    alt=""
                                                                    style={{
                                                                        width: "300px",
                                                                        height: "calc(100vh - 250px)"
                                                                    }}
                                                                />
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {value !== null ? (
                                                            <>
                                                                <Button
                                                                    onClick={() => setValue("userImg", null)}
                                                                >x</Button>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div container spacing={2}>
                                                    <div item xs={6}>
                                                        {images == null ? (
                                                            <div style={{
                                                                border: "1px solid #ced4da",
                                                                borderRadius: "5px",
                                                                padding: '10px',
                                                                cursor: 'pointer'
                                                            }} >
                                                                <DragDrop onDrop={onDrop} accept={"image/*"} />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                    <div >
                                                        <img component="img" src={images} alt="uploadedImage" style={{
                                                                        width: "300px",
                                                                        height: "calc(100vh - 250px)"
                                                                    }} />
                                                        {images !== null ? (
                                                            <>
                                                                <Button
                                                                    onClick={() => [
                                                                        setImages(null),
                                                                        setValue("userImg", null),
                                                                    ]}
                                                                >x </Button>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                                control={control}
                                rules={{
                                    required: {
                                        value: " ",
                                        message: "Upload one image",
                                    },
                                }}
                            />
                            <br />
                            <Button variant="primary" type="submit" style={{ marginRight: "5px" }} onClick={() => navigate("/")}>
                                Back
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSubmit(handleUserData)}>
                                {cid ? "Edit" : "Add"} User
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form></>
    );
}

export default AddEdit;