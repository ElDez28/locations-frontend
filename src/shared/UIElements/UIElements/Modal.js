import "./Modal.css";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          initial={{ y: "-100vw" }}
          animate={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.5, type: "tween" }}
          className={`modal ${props.className}`}
          style={props.style}
        >
          <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header}</h2>
          </header>
          <form
            onSubmit={
              props.onSubmit ? props.onSubmit : (event) => event.preventDefault
            }
          >
            <div className={`modal__content ${props.contentClass}`}>
              {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
              {props.footer}
            </footer>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};
const Modal = (props) => {
  return (
    <>
      {<Backdrop onClick={props.closeHandler} isOpen={props.isOpen}></Backdrop>}
      {
        <ModalOverlay
          isOpen={props.isOpen}
          header={props.header}
          footer={props.footer}
          footerClass={props.footerClass}
          contentClass={props.contentClass}
        >
          {props.children}
        </ModalOverlay>
      }
    </>
  );
};

export default Modal;
