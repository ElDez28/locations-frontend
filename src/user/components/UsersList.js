import "./UsersList.css";
import Card from "../../shared/UIElements/UIElements/Card/Card";
import UserItem from "./UserItem";
import { variants } from "../../places/components/PlaceList";
import { motion } from "framer-motion";
import LoadingSpinner from "../../shared/UIElements/UIElements/LoadingSpinner";

const UsersList = (props) => {
  if (props.items.length === 0 && props.isLoading === false) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="center"
      >
        <Card>
          <h2>No users found</h2>
        </Card>
      </motion.div>
    );
  }
  if (props.isLoading)
    return <LoadingSpinner asOverlay={true}></LoadingSpinner>;
  return (
    <motion.ul
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="users-list"
    >
      {props.items.map((item) => {
        return (
          <UserItem
            key={item.id}
            id={item._id}
            image={item.image}
            name={item.username}
            placeCount={item.places.length}
          ></UserItem>
        );
      })}
    </motion.ul>
  );
};

export default UsersList;
