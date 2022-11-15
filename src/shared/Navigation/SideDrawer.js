import { motion, AnimatePresence } from "framer-motion";
import "./SideDrawer.css";
import ReactDOM from "react-dom";
const SideDrawer = (props) => {
  const content = (
    <AnimatePresence exitBeforeEnter>
      {props.open && (
        <motion.aside
          initial={{ x: "-100vh" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vh", opacity: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
          className="side-drawer"
        >
          {props.children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("sidebar-root")
  );
};

export default SideDrawer;
