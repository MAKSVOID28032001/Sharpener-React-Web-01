import React, { useContext, useRef } from "react";
import '../Style/Form.css';
import CartContext from "../Context/CartContext";
import List from "./List";
const Form = () => {
    const MedID = useRef();
    const MedName = useRef();
    const MedAbout = useRef();
    const MedDate = useRef();
    const MedPrice = useRef();
    const MedTotal = useRef();

    const menuCtx = useContext(CartContext);

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (!MedID.current.value || !MedName.current.value || !MedAbout.current.value || !MedDate.current.value || !MedPrice.current.value || !MedTotal.current.value) {
            alert("Please fill in all fields.");
            return;
        }
        const MedOBJ = {
            id: MedID.current.value,
            name: MedName.current.value,
            about: MedAbout.current.value,
            date: MedDate.current.value,
            price: MedPrice.current.value,
            availableQuantity: MedTotal.current.value
        }
        menuCtx.AddToMenu(MedOBJ);
        MedID.current.value = "";
        MedName.current.value = "";
        MedAbout.current.value = "";
        MedDate.current.value = "";
        MedPrice.current.value = "";
        MedTotal.current.value = "";
    }
    return (
        <>
            <div className="BOX">
                <div className="Form-Box">
                    <div className="Box1">
                        <div className="InsideBox">
                            <label className="LBL">Medicine Card:</label>
                            <input type="number" className="IP" ref={MedID} />
                        </div>
                        <div className="InsideBox">
                            <label className="LBL">Medicine Name:</label>
                            <input type="text" className="IP" ref={MedName} />
                        </div>
                        <div className="InsideBox">
                            <label className="LBL">Medicine About:</label>
                            <input type="text" className="IP" ref={MedAbout} />
                        </div>
                    </div>
                    <div className="Box1">
                        <div className="InsideBox">
                            <label className="LBL">Medicine Date:</label>
                            <input type="date" className="IP" ref={MedDate} />
                        </div>
                        <div className="InsideBox">
                            <label className="LBL">Medicine Price:</label>
                            <input type="number" className="IP" ref={MedPrice} />
                        </div>
                        <div className="InsideBox">
                            <label className="LBL">Medicine Total:</label>
                            <input type="number" className="IP" ref={MedTotal} />
                        </div>
                    </div>
                </div>
                <div className="ButtonBox">
                    <button className="SBTN" onClick={SubmitHandler}>Submit</button>
                </div>
            </div>
            <List />
        </>
    );
}
export default Form;