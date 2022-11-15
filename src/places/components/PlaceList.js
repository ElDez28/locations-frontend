import "./PlaceList.css";
import Card from "../../shared/UIElements/UIElements/Card/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/Button/Button";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import LoadingSpinner from "../../shared/UIElements/UIElements/LoadingSpinner";
export const variants = {
  hidden: { x: "+100vw" },
  visible: {
    x: "0",
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
};

const PlaceList = (props) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  if (props.items.length === 0 && isLoading === false) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one</h2>
          <Button>Share Place</Button>
        </Card>
      </div>
    );
  }
  if (isLoading) return <LoadingSpinner asOverlay={true}></LoadingSpinner>;
  return (
    <motion.ul
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="place-list"
    >
      {props.items.map((item) => {
        return (
          <PlaceItem
            onDelete={props.onDelete}
            key={item._id}
            id={item._id}
            image={item.image}
            title={item.title}
            description={item.description}
            address={item.address}
            creatorId={item.creator[0]}
            coordinates={item.location}
          ></PlaceItem>
        );
      })}
    </motion.ul>
  );
};

export default PlaceList;
