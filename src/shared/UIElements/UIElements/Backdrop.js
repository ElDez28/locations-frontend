import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="backdrop"
          onClick={props.onClick}
        ></motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
