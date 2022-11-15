import Avatar from "../../shared/UIElements/Avatar/Avatar";
import { Link } from "react-router-dom";
import Card from "../../shared/UIElements/UIElements/Card/Card";
import classes from "./UserItem.module.css";
const UserItem = (props) => {
  return (
    <li className={classes["user-item"]}>
      <Card className={classes["user-item__content"]}>
        <Link to={`${props.id}/places`}>
          <div className={classes["user-item__image"]}>
            <Avatar
              image={`http://127.0.0.1:5000/${props.image}`}
              alt={props.name}
            ></Avatar>
          </div>
          <div className={classes["user-item__info"]}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount}
              {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
