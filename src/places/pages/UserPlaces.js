import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputActions } from "../store/store";
import { loadingActions } from "../store/store";
const UserPlaces = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const [items, setItems] = useState([]);
  const items = useSelector((state) => state.input.items);
  const deleteHandler = (id) => {
    const itemsCopy = [...items];
    const newItems = itemsCopy.filter((item) => item.id !== id);
    dispatch(inputActions.setItems(newItems));
  };
  useEffect(() => {
    const getPlaces = async () => {
      dispatch(loadingActions.setLoadingToTrue());
      const res = await fetch(
        `http://127.0.0.1:5000/api/v1/users/${userId}/places`
      );

      dispatch(loadingActions.setLoadingToFalse());
      const data = await res.json();

      dispatch(inputActions.setItems(data.data));
    };
    getPlaces();
  }, [dispatch, userId]);

  return <PlaceList onDelete={deleteHandler} items={items}></PlaceList>;
};

export default UserPlaces;
