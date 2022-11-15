import "./PlaceItem.css";
import Card from "../../shared/UIElements/UIElements/Card/Card";
import { useState } from "react";
import Button from "../../shared/components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/store";
import { useHttp } from "../../user/pages/httpFn";
import Modal from "../../shared/UIElements/UIElements/Modal";
import Map from "../../shared/UIElements/UIElements/Map";
import LoadingSpinner from "../../shared/UIElements/UIElements/LoadingSpinner";
const PlaceItem = (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.login.id);

  const isOpen = useSelector((state) => state.modal.isOpen);
  const { isLogin } = useSelector((state) => state.login);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const openModal = () => {
    dispatch(modalActions.setIsOpenToTrue());
  };
  const closeModal = () => {
    dispatch(modalActions.setIsOpenToFalse());
  };
  const showConfirmModalFn = () => {
    setShowConfirmModal(true);
  };
  const closeConfirmModalFn = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://127.0.0.1:5000/api/v1/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
      setShowConfirmModal(false);
    } catch (err) {}
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        closeHandler={closeModal}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Button type="button" onClick={closeModal}>
            CLOSE
          </Button>
        }
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>

      <Modal
        closeHandler={closeConfirmModalFn}
        isOpen={showConfirmModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            {isLoading && <LoadingSpinner></LoadingSpinner>}
            <Button type="button" onClick={confirmDeleteHandler}>
              YES
            </Button>
            <Button type="button" onClick={closeConfirmModalFn}>
              NO
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this place</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img
              src={`http://127.0.0.1:5000/${props.image}`}
              alt={props.title}
            ></img>
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openModal} inverse>
              VIEW ON MAP
            </Button>
            {isLogin && props.creatorId === id && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button onClick={showConfirmModalFn} danger>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
